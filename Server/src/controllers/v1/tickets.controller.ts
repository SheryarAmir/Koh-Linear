import { NextFunction, Request, Response } from "express";
import Ticket from "../../models/TicketsModal";
export const AddTicket=async (
  request: Request,
  response: Response,
  next: NextFunction
) => {


  const data= request.body


const newTicket = await Ticket.create(data);

console.log(data)

 response.json({ message: "server is healthy" , newTicket });

};
