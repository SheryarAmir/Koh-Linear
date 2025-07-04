import Ticket from "../models/TicketsModal";
import { TicketTypes } from "../Types/TicketType";

export const AddNewTicketService = async (TicketData: TicketTypes ) => {

  const newTicket = await Ticket.create(TicketData);
  
  return newTicket;


};


export const GetAllTicketsService = async () => {
 

    const AllTickets=await Ticket.find(); 

  return AllTickets;


};


export const DeleteTicketService = async(id:string)=>{

const DeleteTicketId=await Ticket.findByIdAndDelete(id)

return DeleteTicketId
}


export const UpDateTicketService = async (id: string, status: string) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(
    id,
    { status }, // ✅ update object
    { new: true } // ✅ optional: returns the updated document
  )

  return updatedTicket
}
