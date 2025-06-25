import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import TicketCard from "./TicketCard"
import type { Ticket } from "@/Types/TicketTypes"

interface ColumnProps {
  column: { id: Ticket["status"], title: string, color: string }
  tickets: Ticket[]
  onDrop: (e: React.DragEvent) => void
  onDragStart: (e: React.DragEvent, id: string) => void
}

const KanbanColumn = ({ column, tickets, onDrop, onDragStart }: ColumnProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  return (
    <div
      className={`${column.color} rounded-lg p-4 min-h-[600px]`}
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">{column.title}</h2>
        <Badge variant="secondary" className="text-xs">
          {tickets.length}
        </Badge>
      </div>

      {/* Tickets */}
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {/* Drop Zone */}
      {tickets.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          <p className="text-sm">Drop tickets here</p>
        </div>
      )}
    </div>
  )
}

export default KanbanColumn
