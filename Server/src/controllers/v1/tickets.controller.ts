import { Request, Response } from "express";
import { AddNewTicketSchema } from "../../schema/Ticket.Schema";
import { AddNewTicketService,GetAllTicketsService,DeleteTicketService,UpDateTicketService ,GetMyIssuesServices} from "../../services/Ticket.Services";
import { ZodError } from "zod";
import JWT from "jsonwebtoken";




const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const AddTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      console.log("No token found");
      res.status(401).json({ message: "No token found" });
      return;
    }

    // console.log("Token:", token);

    const decoded = JWT.verify(token, JWT_SECRET) as { id: string };
    const { id } = decoded;

    // console.log("Decoded User ID:", id);

    const InComingData = req.body;
    const TicketData = AddNewTicketSchema.parse(InComingData);

    console.log("TicketData:", TicketData);

    const newTicket = await AddNewTicketService(TicketData, id);

    console.log("Created newTicket:", newTicket); // 👈 This should now work

    res.status(201).json({
      message: "Ticket created successfully",
      newTicket,
    });
  } catch (error) {
    console.log("Error in AddTicket:", error);

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




export const UpDateTicketController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
  res.status(400).json({ message: "Ticket ID and new status are required." });
    }

    const updatedTicket = await UpDateTicketService(id, status);

    if (!updatedTicket) {
     res.status(404).json({ message: "Ticket not found." });
    }

    console.log(`🎯 Drag-and-drop update: Ticket ID = ${id}, New Status = ${status}`);

    res.status(200).json({
      message: "Backend received the ID and status successfully.",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error(`❌ Error updating ticket status:`, error);
    res.status(500).json({ message: "Internal server error." });
  }
};





// export const GetMyTicket=async(req:Request ,res:Response)=>{

//  try{ 
  
//    const token = req.cookies.accessToken;

//     if (!token) {
//       console.log("No token found");
//       res.status(401).json({ message: "No token found" });
//       return;
//     }

//     // console.log("Token:", token);
//     const decoded = JWT.verify(token, JWT_SECRET) as { id: string };
//     const { id } = decoded;
  
//   console.log( ` this is my o find my ticket only ${id}`)

//   const getMyIssuesData= await GetMyIssuesServices(id)

//   console.log(getMyIssuesData)

//   res.status(500).json({
//   message : "only you tickets", 
//   getMyIssuesData
//   })

// }
// catch(error){

// console.error("Error fetching tickets:", error);
//     res.status(500).json({
//       message: "Something went wrong while fetching tickets",
//     });
// }

// }