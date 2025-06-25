// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Plus, GripVertical, RefreshCw } from "lucide-react"
// import { useQuery } from "@tanstack/react-query"
// import { getTickets } from "@/Services/ticketServices"

// interface Ticket {
//   _id: string
//   title: string
//   description: string
//   status: "todo" | "progress" | "review" | "done" | "cancel"
//   priority?: string
//   assignee?: string
//   createdAt: Date | string
// }

// const KanbanBoard = () => {
//   const [localTickets, setLocalTickets] = useState<Ticket[]>([])
//   const [draggedTicket, setDraggedTicket] = useState<string | null>(null)

//   // Fetch tickets from API
//   const { data: tickets = [], isPending, refetch, isFetching, error } = useQuery({
//     queryKey: ["tickets"],
//     queryFn: getTickets,
//   })

//   // Update local state when API data changes
//   useEffect(() => {
//     if (tickets && Array.isArray(tickets)) {
//       const formattedTickets = tickets.map((ticket: any) => ({
//         _id: ticket._id,
//         title: ticket.title,
//         description: ticket.description,
//         status: ticket.status || "todo", // Default to "todo" if status is not set
//         priority: ticket.priority,
//         assignee: ticket.assignee,
//         createdAt: ticket.createdAt || new Date(),
//       }))
//       setLocalTickets(formattedTickets)
//     }
//   }, [tickets])

//   const columns = [
//     { id: "todo", title: "To Do", color: "bg-gray-100" },
//     { id: "progress", title: "In Progress", color: "bg-blue-100" },
//     { id: "review", title: "Review", color: "bg-yellow-100" },
//     { id: "done", title: "Done", color: "bg-green-100" },
//     { id: "cancel", title: "Cancelled", color: "bg-red-100" },
//   ]

//   const handleCreateTicket = () => {
//     // Navigate to create ticket page or open modal
//     // For demo, I'll add a new ticket directly to local state
//     const newTicket: Ticket = {
//       _id: Date.now().toString(),
//       title: `New Task ${localTickets.length + 1}`,
//       description: "Click to edit this task description",
//       status: "todo",
//       createdAt: new Date(),
//     }
//     setLocalTickets([...localTickets, newTicket])
//   }

//   const handleRefresh = () => {
//     refetch()
//   }

//   const handleDragStart = (e: React.DragEvent, ticketId: string) => {
//     setDraggedTicket(ticketId)
//     e.dataTransfer.effectAllowed = "move"
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.dataTransfer.dropEffect = "move"
//   }

//   const handleDrop = (e: React.DragEvent, newStatus: Ticket["status"]) => {
//     e.preventDefault()

//     if (draggedTicket) {
//       setLocalTickets(localTickets.map((ticket) => 
//         ticket._id === draggedTicket ? { ...ticket, status: newStatus } : ticket
//       ))
//       setDraggedTicket(null)
      
//       // Here you would typically call an API to update the ticket status
//       // updateTicketStatus(draggedTicket, newStatus)
//     }
//   }

//   const getTicketsByStatus = (status: Ticket["status"]) => {
//     return localTickets.filter((ticket) => ticket.status === status)
//   }

//   const getStatusColor = (status: Ticket["status"]) => {
//     const colors = {
//       todo: "bg-gray-500",
//       progress: "bg-blue-500",
//       review: "bg-yellow-500",
//       done: "bg-green-500",
//       cancel: "bg-red-500",
//     }
//     return colors[status]
//   }

//   const getPriorityColor = (priority?: string) => {
//     const colors = {
//       high: "text-red-600",
//       medium: "text-yellow-600",
//       low: "text-green-600",
//     }
//     return priority ? colors[priority.toLowerCase() as keyof typeof colors] || "text-gray-600" : "text-gray-600"
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <Card className="p-6 text-center">
//           <CardContent>
//             <p className="text-red-600 mb-4">Error loading tickets. Please try again.</p>
//             <Button onClick={handleRefresh} variant="outline">
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Retry
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   // Handle loading state
//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <Card className="p-6 text-center">
//           <CardContent>
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p>Loading tickets...</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Task Board</h1>
//             <p className="text-gray-600 mt-2">Manage your tasks with drag and drop</p>
//           </div>
//           <div className="flex gap-2">
//             <Button 
//               onClick={handleRefresh} 
//               variant="outline" 
//               disabled={isFetching}
//               className="flex items-center gap-2"
//             >
//               <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
//               Refresh
//             </Button>
//             <Button onClick={handleCreateTicket} className="flex items-center gap-2">
//               <Plus className="w-4 h-4" />
//               Create Ticket
//             </Button>
//           </div>
//         </div>

//         {/* Kanban Board */}
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {columns.map((column) => (
//             <div
//               key={column.id}
//               className={`${column.color} rounded-lg p-4 min-h-[600px]`}
//               onDragOver={handleDragOver}
//               onDrop={(e) => handleDrop(e, column.id as Ticket["status"])}
//             >
//               {/* Column Header */}
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="font-semibold text-gray-800">{column.title}</h2>
//                 <Badge variant="secondary" className="text-xs">
//                   {getTicketsByStatus(column.id as Ticket["status"]).length}
//                 </Badge>
//               </div>

//               {/* Tickets */}
//               <div className="space-y-3">
//                 {getTicketsByStatus(column.id as Ticket["status"]).map((ticket) => (
//                   <Card
//                     key={ticket._id}
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, ticket._id)}
//                     className="cursor-move hover:shadow-md transition-shadow bg-white border-l-4"
//                     style={{ borderLeftColor: getStatusColor(ticket.status).replace("bg-", "#") }}
//                   >
//                     <CardHeader className="pb-2">
//                       <div className="flex items-start justify-between">
//                         <CardTitle className="text-sm font-medium text-gray-900">{ticket.title}</CardTitle>
//                         <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                       </div>
//                     </CardHeader>
//                     <CardContent className="pt-0">
//                       <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>
                      
//                       {/* Priority and Assignee */}
//                       <div className="mb-2 space-y-1">
//                         {ticket.priority && (
//                           <div className="flex items-center gap-1">
//                             <span className="text-xs text-gray-500">Priority:</span>
//                             <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
//                               {ticket.priority.toUpperCase()}
//                             </span>
//                           </div>
//                         )}
//                         {ticket.assignee && (
//                           <div className="flex items-center gap-1">
//                             <span className="text-xs text-gray-500">Assignee:</span>
//                             <span className="text-xs text-gray-700">{ticket.assignee}</span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <Badge
//                           variant="outline"
//                           className={`text-xs ${getStatusColor(ticket.status)} text-white border-none`}
//                         >
//                           {ticket.status.toUpperCase()}
//                         </Badge>
//                         <span className="text-xs text-gray-500">
//                           {new Date(ticket.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Drop Zone Indicator */}
//               {getTicketsByStatus(column.id as Ticket["status"]).length === 0 && (
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
//                   <p className="text-sm">Drop tickets here</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
//           {columns.map((column) => (
//             <Card key={column.id} className="text-center">
//               <CardContent className="pt-6">
//                 <div className="text-2xl font-bold text-gray-900">
//                   {getTicketsByStatus(column.id as Ticket["status"]).length}
//                 </div>
//                 <p className="text-xs text-gray-600 uppercase tracking-wide">{column.title}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default KanbanBoard




import React from 'react'
import KanbanBoard from '../components/KanbanBoard'

const page = () => {
  return (
    <div>
        <KanbanBoard></KanbanBoard>
    </div>
  )
}

export default page