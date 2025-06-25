export interface TicketTypes {
  title: string;
  description: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
}