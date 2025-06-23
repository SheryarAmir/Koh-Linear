import { api } from "@/lib/axios";
import type { CreateTicketData, Ticket } from "@/Types/ticket";

export async function createTicket(data: CreateTicketData): Promise<Ticket> {
  console.log("API: Creating ticket", data); // Debug log
  
  try {
    const response = await api.post("/v1/ticket/AddTicket", data);
    
    console.log("API: Created ticket result", response.data); // Debug log
    return response.data;
    
  } catch (error: any) {
    console.error("API Error:", error.response?.status, error.response?.data); // Debug log
    throw new Error("Failed to create ticket");
  }
}

export async function getTickets(): Promise<Ticket[]> {
  try {
    const response = await api.get("/v1/tickets"); // Updated to use axios and proper endpoint
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.status, error.response?.data);
    throw new Error("Failed to fetch tickets");
  }
}

export async function updateTicketStatus(id: string, status: string): Promise<Ticket> {
  console.log("API: Updating ticket", id, "to status", status); // Debug log

  try {
    const response = await api.patch(`/v1/tickets/${id}`, { status }); // Updated to use axios
    
    console.log("API: Updated ticket result", response.data); // Debug log
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.status, error.response?.data); // Debug log
    throw new Error(`Failed to update ticket: ${error.response?.status || 'Unknown error'}`);
  }
}