import type { CreateTicketData, Ticket } from "@/Types/ticket"

export async function createTicket(data: CreateTicketData): Promise<Ticket> {
  console.log("API: Creating ticket", data) // Debug log

  const response = await fetch("http://localhost:8000/v1/ticketsRouter/AddTicket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error("API Error:", response.status, errorData) // Debug log
    throw new Error("Failed to create ticket")
  }

  const result = await response.json()
  console.log("API: Created ticket result", result) // Debug log
  return result
}


export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch("/api/tickets")

  if (!response.ok) {
    throw new Error("Failed to fetch tickets")
  }

  return response.json()
  
}


export async function updateTicketStatus(id: string, status: string): Promise<Ticket> {
  console.log("API: Updating ticket", id, "to status", status) // Debug log

  const response = await fetch(`/api/tickets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error("API Error:", response.status, errorData) // Debug log
    throw new Error(`Failed to update ticket: ${response.status}`)
  }

  const result = await response.json()
  console.log("API: Updated ticket result", result) // Debug log
  return result
}
