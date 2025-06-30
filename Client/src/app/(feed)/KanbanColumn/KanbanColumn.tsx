import React, { useState } from "react";
import { Ticket } from "@/Types/TicketTypes";
import TicketCard from "../TicketCard/TicketCard";
import { getPriorityColor, getStatusColor, TicketStatus } from "../StatusColors/StatusColors";

interface Props {
  title: TicketStatus;
  tickets: Ticket[];
  onDrop: (ticketId: string, newStatus: TicketStatus) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isUpdating: boolean;
  draggedTicket: string | null;
}

const KanbanColumn: React.FC<Props> = ({
  title,
  tickets,
  onDrop,
  onDelete,
  isDeleting,
  isUpdating,
  draggedTicket,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const ticketId = e.dataTransfer.getData("text/plain");
        onDrop(ticketId, title);
      }}
      className={`flex-1 min-w-[280px] p-4 border-2 rounded-lg transition-all ${
        isDragOver ? "border-blue-500 bg-blue-100" : "border-gray-200"
      } ${getStatusColor(title)}`}
      style={{ minHeight: 500 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">{tickets.length}</span>
      </div>

      <div className="space-y-3">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              isDragging={draggedTicket === ticket._id}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-300 rounded">
            <p>📋 No tickets</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
