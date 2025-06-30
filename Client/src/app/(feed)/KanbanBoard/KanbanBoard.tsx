"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TICKET_STATUSES, STATUS_MAPPING } from "../StatusColors/StatusColors";
import { useGetAllTickets, useDeleteTicket, useUpdateTicketStatus } from "@/Hooks/useCreateTicket";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { Ticket } from "@/Types/TicketTypes";

const KanbanBoard: React.FC = () => {
  const [draggedTicket, setDraggedTicket] = useState<string | null>(null);
  const [optimisticTickets, setOptimisticTickets] = useState<Ticket[]>([]);
  const { data: tickets = [], isPending, isError, error, refetch } = useGetAllTickets();
  const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicket();
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicketStatus();
  const router = useRouter();

  const currentTickets = optimisticTickets.length > 0 ? optimisticTickets : tickets;

  useEffect(() => {
    if (tickets.length > 0) {
      setOptimisticTickets(tickets);
    }
  }, [tickets]);

  const groupedTickets = TICKET_STATUSES.reduce((acc, status) => {
    acc[status] = currentTickets.filter(ticket => {
      const normalized = STATUS_MAPPING[ticket.status?.toLowerCase() || ""];
      return ticket.status === status || normalized === status;
    });
    return acc;
  }, {} as Record<(typeof TICKET_STATUSES)[number], Ticket[]>);

  const handleDrop = (ticketId: string, newStatus: (typeof TICKET_STATUSES)[number]) => {
    const ticket = currentTickets.find(t => t._id === ticketId);
    if (!ticket || ticket.status === newStatus) return;

    const updatedTickets = currentTickets.map(t =>
      t._id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
    );

    setOptimisticTickets(updatedTickets);
    updateTicket(
      { id: ticketId, status: newStatus },
      {
        onSuccess: () => refetch(),
        onError: () => setOptimisticTickets(tickets),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    const updatedTickets = currentTickets.filter(t => t._id !== id);
    setOptimisticTickets(updatedTickets);
    deleteTicket(id, {
      onSuccess: () => refetch(),
      onError: () => setOptimisticTickets(tickets),
    });
  };

  const handleDragStart = (ticketId: string) => setDraggedTicket(ticketId);
  const handleDragEnd = () => setDraggedTicket(null);

  if (isPending) return <div className="text-center py-10">Loading tickets...</div>;
  if (isError) return (
    <div className="text-center py-10 text-red-600">
      Error loading tickets: {error?.message}
      <button onClick={() => refetch()} className="ml-4 underline">Retry</button>
    </div>
  );

  return (
    <div onDragStart={() => handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Koh-Linear</h1>
        <div className="space-x-3">
          <button onClick={() => refetch()} className="bg-blue-600 text-white px-4 py-2 rounded">
            Refresh
          </button>
          <button onClick={() => router.push("/newTicket")} className="bg-green-600 text-white px-4 py-2 rounded">
            Create Ticket
          </button>
          <button onClick={() => router.push("/")} className="bg-gray-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {isUpdating && <p className="text-sm text-blue-700 mb-3">Updating ticket status...</p>}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {TICKET_STATUSES.map(status => (
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
    </div>
  );
};

export default KanbanBoard;
