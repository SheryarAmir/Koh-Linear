import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GripVertical } from "lucide-react"
import type { Ticket } from "@/Types/TicketTypes"

const getStatusColor = (status: Ticket["status"]) => {
  const colors = {
    todo: "bg-gray-500",
    progress: "bg-blue-500",
    review: "bg-yellow-500",
    done: "bg-green-500",
    cancel: "bg-red-500",
  }
  return colors[status]
}

const getPriorityColor = (priority?: string) => {
  const colors = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-green-600",
  }
  return priority ? colors[priority.toLowerCase() as keyof typeof colors] || "text-gray-600" : "text-gray-600"
}

interface TicketCardProps {
  ticket: Ticket
  onDragStart: (e: React.DragEvent, id: string) => void
}

const TicketCard = ({ ticket, onDragStart }: TicketCardProps) => {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, ticket._id)}
      className="cursor-move hover:shadow-md transition-shadow bg-white border-l-4"
      style={{ borderLeftColor: getStatusColor(ticket.status).replace("bg-", "#") }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-gray-900">
            {ticket.title}
          </CardTitle>
          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 mb-2">{ticket.description}</p>

        <div className="mb-2 space-y-1">
          {ticket.priority && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Priority:</span>
              <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
          )}
          {ticket.assignee && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Assignee:</span>
              <span className="text-xs text-gray-700">{ticket.assignee}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={`text-xs ${getStatusColor(ticket.status)} text-white border-none`}
          >
            {ticket.status.toUpperCase()}
          </Badge>
          <span className="text-xs text-gray-500">
            {new Date(ticket.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketCard
