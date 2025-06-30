"use client"

import React, { useState } from "react"
import { Ticket } from "@/Types/TicketTypes"
import { useGetAllTickets, useDeleteTicket, useUpdateTicketStatus } from "@/Hooks/useCreateTicket"
import { useRouter } from "next/navigation"
import { Header } from "@/app/(main)/Header"

// Define the possible ticket statuses - match your backend exactly
const TICKET_STATUSES = ['To Do', 'In Progress', 'Review', 'Done'] as const
type TicketStatus = typeof TICKET_STATUSES[number]

// If your backend uses different status names, update this mapping
const STATUS_MAPPING: Record<string, TicketStatus> = {
  'To Do': 'To Do',
  'In Progress': 'In Progress', 
  'Review': 'Review',
  'Done': 'Done',
  // Add your backend status values here if they're different
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'inprogress': 'In Progress',
  'pending': 'To Do',
  'completed': 'Done',
  'finished': 'Done'
}

interface KanbanColumnProps {
  title: TicketStatus
  tickets: Ticket[]
  onDrop: (ticketId: string, newStatus: TicketStatus) => void
  onDelete: (id: string) => void
  isDeleting: boolean
  isUpdating: boolean
  draggedTicket: string | null
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  tickets, 
  onDrop, 
  onDelete, 
  isDeleting, 
  isUpdating,
  draggedTicket 
}) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const ticketId = e.dataTransfer.getData('text/plain')
    console.log('Dropping ticket:', ticketId, 'into column:', title)
    
    if (ticketId) {
      onDrop(ticketId, title)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'To Do': return 'bg-gray-50'
      case 'In Progress': return 'bg-blue-50'
      case 'Review': return 'bg-yellow-50'
      case 'Done': return 'bg-green-50'
      default: return 'bg-gray-50'
    }
  }

  return (
    <div 
    
      className={`flex-1 min-w-[280px] p-4 rounded-lg border-2 transition-all duration-200 ${
        isDragOver 
          ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-105' 
          : 'border-gray-200 hover:border-gray-300'
      } ${getStatusColor(title)}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ minHeight: '600px' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {title}
        </h2>
        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
          {tickets.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onDelete={onDelete}
            isDeleting={isDeleting}
            isDragging={draggedTicket === ticket._id}
            getPriorityColor={getPriorityColor}
          />
        ))}
        
        {tickets.length === 0 && (
          <div className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm">No tickets</p>
            <p className="text-xs mt-1">Drop tickets here</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface TicketCardProps {
  ticket: Ticket
  onDelete: (id: string) => void
  isDeleting: boolean
  isDragging: boolean
  getPriorityColor: (priority: string) => string
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onDelete,
  isDeleting,
  isDragging,
  getPriorityColor
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    console.log('=== TICKET DRAG START ===')
    console.log('Ticket being dragged:', ticket._id, ticket.title)
    console.log('Current status:', ticket.status)
    
    e.dataTransfer.setData('text/plain', ticket._id)
    e.dataTransfer.effectAllowed = 'move'
    
    // Add visual feedback
    const target = e.target as HTMLElement
    target.style.opacity = '0.5'
  }

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('=== TICKET DRAG END ===')
    // Reset visual feedback
    const target = e.target as HTMLElement
    target.style.opacity = '1'
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 cursor-move hover:shadow-md transition-all duration-200 select-none ${
        getPriorityColor(ticket.priority)
      } ${isDragging ? 'opacity-50 rotate-2 scale-105' : 'hover:scale-102'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {ticket.title}
        </h3>
        <button
          onClick={() => onDelete(ticket._id)}
          className="text-red-400 hover:text-red-600 text-lg leading-none ml-2 p-1 rounded hover:bg-red-50 transition-colors"
          disabled={isDeleting}
          title="Delete ticket"
        >
          ×
        </button>
      </div>
      
      {ticket.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-3">
          {ticket.description}
        </p>
      )}
      
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {ticket.priority}
        </span>
        
        <div className="text-right">
          <div className="text-xs font-medium text-gray-700">{ticket.assignee}</div>
          <div className="text-xs text-gray-500">
            {new Date(ticket.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

const KanbanBoard: React.FC = () => {
  const [draggedTicket, setDraggedTicket] = useState<string | null>(null)
  const [optimisticTickets, setOptimisticTickets] = useState<Ticket[]>([])
  
  const {
    data: tickets = [],
    isPending,
    isError,
    refetch,
    error
  } = useGetAllTickets()

  const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicket()
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicketStatus()

    const router = useRouter();

  // Use optimistic tickets if available, otherwise use fetched tickets
  const currentTickets = optimisticTickets.length > 0 ? optimisticTickets : tickets

  // Update optimistic state when real data changes
  React.useEffect(() => {
    if (tickets.length > 0) {
      setOptimisticTickets(tickets)
    }
  }, [tickets])


  function handlerCreateTicket(){
    router.push ("/newTicket")
  }

  function handlerHome(){
    router.push("/")
  }
  // Debug: Log the fetched tickets
  console.log('Fetched tickets:', tickets)
  console.log('Current tickets (optimistic):', currentTickets)
  console.log('Is pending:', isPending)
  console.log('Is error:', isError)
  if (error) console.log('Error:', error)

  // Group tickets by status with better mapping
  const groupedTickets = TICKET_STATUSES.reduce((acc, status) => {
    acc[status] = currentTickets.filter((ticket: Ticket) => {
      // Try exact match first
      if (ticket.status === status) return true
      
      // Try mapped status
      const mappedStatus = STATUS_MAPPING[ticket.status?.toLowerCase() || '']
      return mappedStatus === status
    })
    return acc
  }, {} as Record<TicketStatus, Ticket[]>)

  // Debug: Log grouped tickets
  console.log('Grouped tickets:', groupedTickets)

  const handleDrop = (ticketId: string, newStatus: TicketStatus) => {
    console.log('=== DROP EVENT ===')
    console.log('Ticket ID:', ticketId)
    console.log('New Status:', newStatus)
    console.log('All tickets:', currentTickets)
    
    const ticket = currentTickets.find((t: Ticket) => t._id === ticketId)
    console.log('Found ticket:', ticket)
    
    if (!ticket) {
      console.error('❌ Ticket not found:', ticketId)
      alert(`Ticket with ID ${ticketId} not found!`)
      return
    }

    console.log('Current ticket status:', ticket.status)
    console.log('Target status:', newStatus)

    if (ticket.status === newStatus) {
      console.log('✅ Ticket already in this status, no update needed')
      return
    }

    console.log(`🔄 Updating ticket ${ticketId} from "${ticket.status}" to "${newStatus}"`)
    
    // OPTIMISTIC UPDATE: Update UI immediately
    const updatedTickets = currentTickets.map((t: Ticket) => 
      t._id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
    )
    setOptimisticTickets(updatedTickets)
    console.log('✅ Optimistic update applied to frontend')
    
    // Then update backend
    updateTicket(
      { id: ticketId, status: newStatus },
      {
        onSuccess: (data) => {
          console.log('✅ Backend update successful:', data)
          // Refresh from backend to get the latest data
          refetch().then(() => {
            console.log('✅ Data refetched from backend')
          })
        },
        onError: (error) => {
          console.error('❌ Backend update failed:', error)
          alert(`Failed to update ticket status: ${error.message || 'Unknown error'}`)
          // Revert optimistic update on error
          setOptimisticTickets(tickets)
          console.log('↩️ Reverted optimistic update due to error')
        }
      }
    )
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      // Optimistic delete - remove from UI immediately
      const updatedTickets = currentTickets.filter((t: Ticket) => t._id !== id)
      setOptimisticTickets(updatedTickets)
      console.log('✅ Optimistic delete applied to frontend')
      
      deleteTicket(id, {
        onSuccess: () => {
          console.log('✅ Ticket deleted successfully from backend')
          refetch()
        },
        onError: (error) => {
          console.error('❌ Failed to delete ticket:', error)
          alert('Failed to delete ticket. Please try again.')
          // Revert optimistic delete on error
          setOptimisticTickets(tickets)
          console.log('↩️ Reverted optimistic delete due to error')
        }
      })
    }
  }

  const handleDragStart = (ticketId: string) => {
    console.log('=== DRAG START ===')
    console.log('Dragging ticket:', ticketId)
    setDraggedTicket(ticketId)
  }

  const handleDragEnd = () => {
    console.log('=== DRAG END ===')
    setDraggedTicket(null)
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading tickets...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="text-lg text-red-600">Error loading tickets</div>
        <div className="text-sm text-gray-500">
          {error?.message || 'Please check your API connection'}
        </div>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Show debug info if no tickets
  if (currentTickets.length === 0) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
        
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">No Tickets Found</h3>
          <p className="text-yellow-700 text-sm">
            Either there are no tickets in the database, or there might be an issue with the API.
            Check the browser console for more details.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {TICKET_STATUSES.map((status) => (
            <div key={status} className="flex-1 min-w-[280px] p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">{status}</h2>
              <div className="text-center text-gray-400 py-12">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-sm">No tickets</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (

 
    <div 
      className="mt- p-8 min-h-screen "
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
     
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Koh-Linear</h1>
        <p>Track progress from generation to completion with our organized workflow system.</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            disabled={isPending}
          >
            {isPending ? "Refreshing..." : "Refresh"}
          </button>

          <button 

          onClick={handlerCreateTicket}
           
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            
          >
          Create Ticket
          </button>

          <button 

          onClick={handlerHome}
           
            className="bg-blue-600 text-white px-4 py-2 rounded-lg blue:bg-green-700 transition-colors shadow-sm"
            
          >
          Back
          </button>


        </div>
      </div>

      {isUpdating && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-lg flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          <p className="text-blue-800 font-medium">Updating ticket status...</p>
        </div>
      )}

      <div className="flex gap-6 overflow-x-auto pb-4">
        {TICKET_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            title={status}
            tickets={groupedTickets[status]}
            onDrop={handleDrop}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            isUpdating={isUpdating}
            draggedTicket={draggedTicket}
          />
        ))}
      </div>

      {/* <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Debug Info:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>Total Tickets:</strong> {currentTickets.length}</div>
          <div><strong>Backend Tickets:</strong> {tickets.length}</div>
          <div><strong>Is Updating:</strong> {isUpdating ? 'Yes' : 'No'}</div>
          <div><strong>Is Loading:</strong> {isPending ? 'Yes' : 'No'}</div>
        </div>
      </div> */}

      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">How to use:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>🖱️ Drag & Drop:</strong> Click and drag tickets between columns to change status
          </div>
          <div>
            <strong>🗑️ Delete:</strong> Click the × button to remove a ticket
          </div>
          <div>
            <strong>🎨 Priority Colors:</strong> Red (High), Yellow (Medium), Green (Low)
          </div>
          <div>
            <strong>🔄 Refresh:</strong> Click refresh to sync with latest data
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default KanbanBoard