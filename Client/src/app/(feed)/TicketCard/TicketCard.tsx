import React from "react";
import { Ticket } from "@/Types/TicketTypes";
import { getPriorityColor } from "../StatusColors/StatusColors";

interface Props {
  ticket: Ticket;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isDragging: boolean;
}

const TicketCard: React.FC<Props> = ({
  ticket,
  onDelete,
  isDeleting,
  isDragging,
}) => {
  return (
    <div
      className={`bg-white p-4 border-l-4 rounded shadow hover:shadow-md cursor-move transition-all ${getPriorityColor(ticket.priority)} ${isDragging ? "opacity-50" : ""}`}
      draggable
      onDragStart={e => e.dataTransfer.setData("text/plain", ticket._id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm text-gray-800">{ticket.title}</h3>
        <button
          onClick={() => onDelete(ticket._id)}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-600"
        >
          ×
        </button>
      </div>
      <p className="text-xs text-gray-600 line-clamp-3">{ticket.description}</p>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>{ticket.priority}</span>
        <span>{ticket.assignee}</span>
      </div>
    </div>
  );
};

export default TicketCard;
