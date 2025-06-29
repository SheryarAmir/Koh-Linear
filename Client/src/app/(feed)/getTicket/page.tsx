"use client"

import React from "react"
import { Ticket } from "@/Types/TicketTypes"
import { useGetAllTickets, useDeleteTicket,useUpdateTicketStatus } from "@/Hooks/useCreateTicket"
import StatusPage from "../status/page"
import { ticketSchema } from "@/lib/validations/ticketSchema"

const Page = () => {
  const {
    data,
    isPending,
    isError,
    refetch,
    isSuccess,
  } = useGetAllTickets()

  const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicket()
  const {mutate:UpDateTicket, isPending:isUpDateing } =useUpdateTicketStatus()

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id)
    }
  }


  function handleUpdate (id:string, status:string){
     if (confirm("Are you sure you want to update this ticket?")) {
      UpDateTicket({id , status})
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={() => refetch()}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Get All Tickets
      </button>

      {isPending && <p>Loading...</p>}
      {isError && <p>Error loading tickets.</p>}

      {isSuccess && data && (
        <ul className="space-y-2">
          {data.map((ticket: Ticket) => (
            <li key={ticket._id} className="border p-3 rounded shadow space-y-1">

              <h2 className="font-semibold">{ticket.title}</h2>
              {ticket.description && <p>{ticket.description}</p>}
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Assignee:</strong> {ticket.assignee}</p>
              <p><strong>Updated:</strong> {ticket.updatedAt}</p>
              <p><strong>Created:</strong> {ticket.createdAt}</p>
              <p><strong>ID:</strong> {ticket._id}</p>

              <button
                onClick={() => handleDelete(ticket._id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                disabled={isDeleting}


              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>


<button onClick={()=>handleUpdate(ticket._id , ticket.status)}
             className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
             disabled={isUpDateing}
  >

{isUpDateing ? "updating..." : "update Status"}


</button>

<StatusPage id={ticket._id}/>

            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page
