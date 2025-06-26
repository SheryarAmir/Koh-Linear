export type TicketPayload = {
  title: string;
  description: string;
  assignee: string;
  status: "Todo" | "In Progress" | "Review" | "Backlog" | "Done";
  priority: "Low" | "Medium" | "High";
};

export type Ticket = {
  _id: string;
  title: string;
  description: string;
  assignee: string;
   status:string;
  priority: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTicketsResponse = {
  message: string;
  tickets: Ticket[];
};
