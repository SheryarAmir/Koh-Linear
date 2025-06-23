"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTickets, updateTicketStatus } from "@/Services/ticketServices"
import type { Ticket, Status } from "@/Types/ticket"
import { Calendar, User, AlertCircle, CheckCircle2, Clock, XCircle, Archive, GripVertical } from "lucide-react"
import { useToast } from "@/Hooks/use-toast"
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DroppableArea } from "./droppable-area"

interface TicketListProps {
  refreshTrigger?: number
}

interface DraggableTicketProps {
  ticket: Ticket
}

function DraggableTicket({ ticket }: DraggableTicketProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ticket.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Urgent":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1">{ticket.title}</h3>
          <div className="flex items-center gap-1">
            <GripVertical className="h-4 w-4 text-gray-400" />
            <Badge className={`${getPriorityColor(ticket.priority)} text-xs`}>{ticket.priority}</Badge>
          </div>
        </div>

        {ticket.description && <p className="text-gray-600 text-xs mb-3 line-clamp-2">{ticket.description}</p>}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="truncate max-w-20">{ticket.assignee}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(ticket.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DroppableColumnProps {
  status: Status
  tickets: Ticket[]
  children: React.ReactNode
}

function DroppableColumn({ status, tickets, children }: DroppableColumnProps) {
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "Backlog":
        return <Archive className="h-4 w-4" />
      case "Todo":
        return <Clock className="h-4 w-4" />
      case "In Progress":
        return <AlertCircle className="h-4 w-4" />
      case "Done":
        return <CheckCircle2 className="h-4 w-4" />
      case "Canceled":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Backlog":
        return "text-gray-600 border-gray-200"
      case "Todo":
        return "text-blue-600 border-blue-200"
      case "In Progress":
        return "text-purple-600 border-purple-200"
      case "Done":
        return "text-green-600 border-green-200"
      case "Canceled":
        return "text-red-600 border-red-200"
    }
  }

  return (
    <div className="flex-1 min-w-80">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className={`text-sm flex items-center justify-between ${getStatusColor(status)}`}>
            <div className="flex items-center gap-2">
              {getStatusIcon(status)}
              {status}
            </div>
            <Badge variant="secondary" className="text-xs">
              {tickets.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <DroppableArea id={status}>
            <div className="space-y-3 min-h-80">
              <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                {children}
              </SortableContext>
              {tickets.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Drop tickets here</div>
              )}
            </div>
          </DroppableArea>
        </CardContent>
      </Card>
    </div>
  )
}

export function TicketList({ refreshTrigger }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const fetchTickets = async () => {
    try {
      const data = await getTickets()
      setTickets(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tickets",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [refreshTrigger])

  const handleDragStart = (event: DragStartEvent) => {
    const ticket = tickets.find((t) => t.id === event.active.id)
    setActiveTicket(ticket || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTicket(null)

    console.log("Drag ended:", { activeId: active.id, overId: over?.id }) // Debug log

    if (!over) {
      console.log("No drop target") // Debug log
      return
    }

    const ticketId = active.id as string
    const newStatus = over.id as Status

    const ticket = tickets.find((t) => t.id === ticketId)
    if (!ticket) {
      console.log("Ticket not found:", ticketId) // Debug log
      return
    }

    if (ticket.status === newStatus) {
      console.log("Status unchanged:", newStatus) // Debug log
      return
    }

    console.log("Moving ticket:", ticketId, "from", ticket.status, "to", newStatus) // Debug log

    // Optimistic update
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t)),
    )

    try {
      await updateTicketStatus(ticketId, newStatus)
      toast({
        title: "Success",
        description: `Ticket moved to ${newStatus}`,
      })
    } catch (error) {
      console.error("Failed to update ticket:", error) // Debug log
      // Revert on error
      setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status: ticket.status } : t)))
      toast({
        title: "Error",
        description: "Failed to update ticket status",
        variant: "destructive",
      })
    }
  }

  const statuses: Status[] = ["Backlog", "Todo", "In Progress", "Done", "Canceled"]

  const getTicketsByStatus = (status: Status) => {
    return tickets.filter((ticket) => ticket.status === status)
  }

  if (loading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <div key={status} className="flex-1 min-w-80">
            <Card className="h-full">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <Badge variant="secondary" className="text-sm">
          {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {statuses.map((status) => {
            const statusTickets = getTicketsByStatus(status)
            return (
              <DroppableColumn key={status} status={status} tickets={statusTickets}>
                {statusTickets.map((ticket) => (
                  <DraggableTicket key={ticket.id} ticket={ticket} />
                ))}
              </DroppableColumn>
            )
          })}
        </div>

        <DragOverlay>{activeTicket ? <DraggableTicket ticket={activeTicket} /> : null}</DragOverlay>
      </DndContext>

      {tickets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Archive className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-500">Create your first ticket to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
