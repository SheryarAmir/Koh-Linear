import { Request, Response } from "express";
import { AddNewTicketSchema } from "../../schema/Ticket.Schema";
import { AddNewTicketService,GetAllTicketsService,DeleteTicketService } from "../../services/Ticket.Services";
import { ZodError } from "zod";

export const AddTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    

    const InComingData=req.body
    // console.log(InComingData)
     const TicketData = AddNewTicketSchema.parse(InComingData);

    //  console.log(TicketData);

    const newTicket = await AddNewTicketService(TicketData);
     console.log(TicketData);

    res.status(201).json({
      message: "Ticket created successfully",
      newTicket,
    });


  } catch (error) {


    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
      return;
    }

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};






export const GetTicket = async (req: Request, res: Response) => {
  try {
    const tickets = await GetAllTicketsService(); // Fetch from DB


    // console.log(tickets)

    res.status(200).json({
      
      message: "Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      message: "Something went wrong while fetching tickets",
    });
  }
};


export const DeleteTicketcontroller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params 

    const deletedTicket = await DeleteTicketService(id)

    if (!deletedTicket) {
      res.status(404).json({ message: "Ticket not found" })
    }

    console.log("Deleted:", deletedTicket)

    res.status(200).json({
      message: "Ticket deleted successfully",
      deletedTicket,
      
    })
  } catch (error) {
    console.error("Delete error:", error)
     res.status(500).json({ message: "Server error", error })
  }
}


export const UpDateTicketcontroller = async (req:Request ,res:Response)=>{

  try{
    const {id}=req.params

    const {status} =req.body

    console.log(id ,status)

    res.json({mesage:"backend got the status and id "})

  }catch(error){

    console.log(`there is an error on get the status and id ${error}`)
  }
}