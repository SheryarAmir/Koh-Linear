import React from "react";
import { Ticket } from "@/Types/TicketTypes";
import { getPriorityColor } from "../StatusColors/StatusColors";

interface Props {
  ticket: Ticket;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isDragging: boolean;
  onClick: () => void;
}

const TicketCard: React.FC<Props> = ({
  ticket,
  onDelete,
  isDeleting,
  isDragging,
  onClick,
}) => {
  return (
    <div
      className={`bg-white p-4 rounded shadow-sm border-l-4 cursor-pointer transition-transform ${
        getPriorityColor(ticket.priority)
      } ${isDragging ? "opacity-50 scale-105" : "hover:scale-[1.02]"}`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", ticket._id)}
      onDragEnd={() => {}}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-sm">{ticket.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(ticket._id);
          }}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-1 line-clamp-3">{ticket.description}</p>
      <div className="flex justify-between items-center mt-3 text-xs">
        <span className="font-medium">{ticket.priority}</span>
        <span className="text-gray-500">{ticket.assignee}</span>
      </div>
    </div>
  );
};

export default TicketCard;
