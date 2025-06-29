"use client"

import React, { useState } from "react";

type Ticket = {
  id: string;
  title: string;
  status: string;
};

type Props = {
  id: string;
};

export default function StatusPage({ id }: Props) {
  // Sample tickets data - replace with your actual data
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "1", title: "Fix login bug", status: "todo" },
    { id: "2", title: "Add new feature", status: "in-progress" },
    { id: "3", title: "Code review", status: "review" },
    { id: "4", title: "API integration", status: "blocked" },
    { id: "5", title: "Deploy to production", status: "done" },
  ]);

  const [draggedTicket, setDraggedTicket] = useState<string | null>(null);

  const statuses = [
    { key: "todo", label: "Todo", color: "bg-blue-100" },
    { key: "in-progress", label: "In Progress", color: "bg-yellow-100" },
    { key: "review", label: "Review", color: "bg-purple-100" },
    { key: "blocked", label: "Blocked", color: "bg-red-100" },
    { key: "done", label: "Done", color: "bg-green-100" },
  ];

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    setDraggedTicket(ticketId);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over (allow drop)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    
    if (!draggedTicket) return;

    // Update ticket status in frontend
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === draggedTicket
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );

    // Update status in backend
    updateTicketStatus(draggedTicket, newStatus);
    
    setDraggedTicket(null);
  };

  // Backend API call to update ticket status
  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      console.log(`Ticket ${ticketId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating ticket status:', error);
      // Optionally revert the frontend change if backend fails
    
    }
  };

  // Get tickets for a specific status
  const getTicketsByStatus = (status: string) => {
    return tickets.filter(ticket => ticket.status === status);
  };

  return (
    <div className="flex gap-4 p-8 mx-auto container">
      {statuses.map(status => (
        <div
          key={status.key}
          className={`flex-1 rounded-lg shadow p-6 ${status.color} min-h-96`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status.key)}
        >
          <h2 className="text-xl font-bold mb-4">{status.label}</h2>
          
          <div className="space-y-2">
            {getTicketsByStatus(status.key).map(ticket => (
              <div
                key={ticket.id}
                draggable
                onDragStart={(e) => handleDragStart(e, ticket.id)}
                className="bg-white p-3 rounded border cursor-move hover:shadow-md transition-shadow"
              >
                <div className="font-medium">#{ticket.id}</div>
                <div className="text-sm text-gray-600">{ticket.title}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}