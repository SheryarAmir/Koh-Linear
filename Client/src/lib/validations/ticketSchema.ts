
import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  assignee: z.string().min(1),
  priority: z.enum(["Low", "Medium", "High"]),
   status: z.enum(["Todo", "In Progress" , "Review" , "Backlog" , "Done"])
});

export type TicketFormData = z.infer<typeof ticketSchema>;
