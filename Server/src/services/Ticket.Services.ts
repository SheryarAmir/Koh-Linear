import Ticket from "../models/TicketsModal";
import { TicketTypes } from "../Types/TicketType";

export const AddNewTicketService = async (TicketData: TicketTypes) => {

  const newTicket = await Ticket.create(TicketData);
  
  return newTicket;


};


export const GetAllTicketsService = async () => {
 

    const AllTickets=await Ticket.find(); 

  return AllTickets;


};
