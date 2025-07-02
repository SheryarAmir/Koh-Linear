"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Ticket } from "@/Types/TicketTypes";
import { useGetAllTickets, useDeleteTicket, useUpdateTicketStatus } from "@/Hooks/useCreateTicket";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import TicketModal from "../popup/TicketModal";
import { TICKET_STATUSES, STATUS_MAPPING, TicketStatus } from "../StatusColors/StatusColors";
import { Button } from "@/components/ui/button"
import NewTicket from "@/app/(feed)/newTicket/page"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// import { useCreateTicket } from "@/Hooks/useCreateTicket"

const KanbanBoard = () => {
  const router = useRouter();
  const [draggedTicket, setDraggedTicket] = useState<string | null>(null);
  const [optimisticTickets, setOptimisticTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tickets = [], isPending, isError, refetch, error } = useGetAllTickets();
  const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicket();
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicketStatus();
   const [open, setOpen] = useState(false)

  useEffect(() => {
    if (tickets.length > 0) setOptimisticTickets(tickets);
  }, [tickets]);

  const currentTickets = optimisticTickets.length > 0 ? optimisticTickets : tickets;

  const groupedTickets = TICKET_STATUSES.reduce((acc, status) => {
    acc[status] = currentTickets.filter((ticket) => {
      const mappedStatus = STATUS_MAPPING[ticket.status?.toLowerCase() || ""];
      return mappedStatus === status || ticket.status === status;
    });
    return acc;
  }, {} as Record<TicketStatus, Ticket[]>);

  const handleDrop = (ticketId: string, newStatus: TicketStatus) => {
    const ticket = currentTickets.find((t) => t._id === ticketId);
    if (!ticket || ticket.status === newStatus) return;

    const updatedTickets = currentTickets.map((t) =>
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
    if (!confirm("Are you sure?")) return;
    const updatedTickets = currentTickets.filter((t) => t._id !== id);
    setOptimisticTickets(updatedTickets);
    deleteTicket(id, {
      onSuccess: () => refetch(),
      onError: () => setOptimisticTickets(tickets),
    });
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="px-8 py-8">
      <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 ">All Tickets</h2>

        <div className="flex gap-2 ">
          <button onClick={() => refetch()} className="btn p-2 text-sm bg-rose-900    rounded border text-white">Refresh</button>

<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-2 text-sm bg-green-600 rounded border text-white hover:bg-green-700">Create Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <NewTicket/>
        </DialogHeader>
{/* 
          <button onClick={() => router.push("/newTicket")} className="btn p-2 text-sm bg-green-600  rounded border text-white">Create Ticket</button> */}
   </DialogContent>
    </Dialog>


          <button onClick={() => router.push("/")} className="btn bg-blue-600 p-2 text-sm rounded border text-white">Logout</button>
        </div>
      </div>

      {isUpdating && <p className="text-blue-500 mb-2">Updating ticket status...</p>}

      <div className="flex gap-4 overflow-x-auto">
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
            onTicketClick={handleTicketClick}
          />
        ))}
      </div>


      <div className="mt-10 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">How to use:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>🖱️ Drag & Drop:</strong> Click and drag tickets between
            columns to change status
          </div>
          <div>
            <strong>🗑️ Delete:</strong> Click the × button to remove a ticket
          </div>
          <div>
            <strong>🎨 Priority Colors:</strong> Red (High), Yellow (Medium),
            Green (Low)
          </div>
          <div>
            <strong>🔄 Refresh:</strong> Click refresh to sync with latest data
          </div>
        </div>
      </div>
    


      <TicketModal open={isModalOpen} onClose={handleCloseModal} ticket={selectedTicket} />



    </div>
  );
};

export default KanbanBoard;
