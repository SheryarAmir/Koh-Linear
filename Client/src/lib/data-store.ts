import type { Ticket } from "@/Types/ticket"

// Shared in-memory storage (replace with database in production)
export const ticketsStore: Ticket[] = []

export function addTicket(ticket: Ticket): void {
  ticketsStore.push(ticket)
}

export function getTickets(): Ticket[] {
  return ticketsStore.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}


export function updateTicket(id: string, updates: Partial<Ticket>): Ticket | null {
  const index = ticketsStore.findIndex((ticket) => ticket.id === id)
  if (index === -1) return null

  ticketsStore[index] = { ...ticketsStore[index], ...updates, updatedAt: new Date().toISOString() }
  return ticketsStore[index]
}

export function findTicket(id: string): Ticket | null {
  return ticketsStore.find((ticket) => ticket.id === id) || null
}
