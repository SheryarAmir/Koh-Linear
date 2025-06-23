export type Priority = "Low" | "Medium" | "High" | "Urgent"
export type Status = "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled"

export interface Ticket {
  id: string
  title: string
  description: string
  assignee: string
  priority: Priority
  status: Status
  createdAt: string
  updatedAt: string
}

export interface CreateTicketData {
  title: string
  description: string
  assignee: string
  priority: Priority
}
