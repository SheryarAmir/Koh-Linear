"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTickets } from "@/Services/ticketServices"
import { Ticket, TicketStatus, KanbanColumn } from "@/Types/TicketTypes"

import BoardHeader from "./BoardHeader"
import KanbanColumnComponent from "./KanbanColumn"
import BoardStats from "./BoardStats"
import LoadingState from "./LoadingState"
import ErrorState from "./ErrorState"

const KanbanBoard = () => {
  const [localTickets, setLocalTickets] = useState<Ticket[]>([])
  const [draggedTicket, setDraggedTicket] = useState<string | null>(null)

  const { data: tickets = [], isPending, refetch, isFetching, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  })

  useEffect(() => {
    if (tickets && Array.isArray(tickets)) {
      const formatted = tickets.map((t: any) => ({
        _id: t._id,
        title: t.title,
        description: t.description,
        status: t.status || "todo",
        priority: t.priority,
        assignee: t.assignee,
        createdAt: t.createdAt || new Date(),
      }))
      setLocalTickets(formatted)
    }
  }, [tickets])

  const handleCreateTicket = () => {
    const newTicket: Ticket = {
      _id: Date.now().toString(),
      title: `New Task ${localTickets.length + 1}`,
      description: "Click to edit this task description",
      status: "todo",
      createdAt: new Date(),
    }
    setLocalTickets([...localTickets, newTicket])
  }

  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    setDraggedTicket(ticketId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDrop = (newStatus: TicketStatus) => {
    if (draggedTicket) {
      setLocalTickets((prev) =>
        prev.map((t) =>
          t._id === draggedTicket ? { ...t, status: newStatus } : t
        )
      )
      setDraggedTicket(null)
    }
  }

  const getTicketsByStatus = (status: TicketStatus) =>
    localTickets.filter((t) => t.status === status)

  const columns: KanbanColumn[] = [
    { id: "todo", title: "To Do", color: "bg-gray-100" },
    { id: "progress", title: "In Progress", color: "bg-blue-100" },
    { id: "review", title: "Review", color: "bg-yellow-100" },
    { id: "done", title: "Done", color: "bg-green-100" },
    { id: "cancel", title: "Cancelled", color: "bg-red-100" },
  ]

  if (error) return <ErrorState onRetry={refetch} />
  if (isPending) return <LoadingState />

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <BoardHeader onRefresh={refetch} onCreate={handleCreateTicket} isFetching={isFetching} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {columns.map((col) => (
            <KanbanColumnComponent
              key={col.id}
              column={col}
              tickets={getTicketsByStatus(col.id)}
              onDragStart={handleDragStart}
              onDrop={() => handleDrop(col.id)}
            />
          ))}
        </div>
        <BoardStats
          columns={columns.map(({ id, title }) => ({ id, title }))}
          getTicketsByStatus={getTicketsByStatus}
        />
      </div>
    </div>
  )
}

export default KanbanBoard
