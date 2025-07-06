import Ticket from "../models/TicketsModal";
import Api1 from "../routes/v1/global.router";
import { TicketTypes } from "../Types/TicketType";

export const AddNewTicketService = async (TicketData: TicketTypes  ,CreaterId :string) => {

  const ticketPayload = {
    ...TicketData,
    createdBy: CreaterId,
  };

  console.log("Final payload sent to Mongoose:", ticketPayload);

  const newTicket = await Ticket.create(ticketPayload);

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

export const GetMyIssuesServices=async(id:string)=>{

    const onlyMyTickets = await Ticket.find({ createdBy: id });
  return onlyMyTickets
}   