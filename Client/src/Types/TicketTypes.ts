export type TicketPayload = {
  title: string;
  description: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
};



export type getTicketTypes = {
  id: string
  title: string
  description: string
  assignee: string
  priority: "Low" | "Medium" | "High"
//   createdAt: string
//   updatedAt: string
//   status: "todo" | "progress" | "review" | "done" | "cancel"
}


export type TicketStatus = "todo" | "progress" | "review" | "done" | "cancel"

export interface Ticket {
  _id: string
  title: string
  description: string
  status: TicketStatus
  priority?: string
  assignee?: string
  createdAt: Date | string
}

export interface KanbanColumn {
  id: TicketStatus
  title: string
  color: string
}