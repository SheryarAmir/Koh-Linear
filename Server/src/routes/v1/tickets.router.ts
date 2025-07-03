import { Router } from "express";
import * as ticketscontroller from "../../controllers/v1/tickets.controller";

<<<<<<< HEAD
import { authMiddleware } from "../../middleware/AuthMiddleware";


=======
>>>>>>> 9bf72abdd147b60ec3b7162e30987512f2a06bdc
const ticketsRouter = Router();

ticketsRouter.post("/CreateTicket",authMiddleware, ticketscontroller.AddTicket );
ticketsRouter.get("/getTicket",authMiddleware, ticketscontroller.GetTicket );
ticketsRouter.delete("/DeleteTicket/:id", authMiddleware,ticketscontroller.DeleteTicketcontroller);
ticketsRouter.patch("/Updatetickets/:id",authMiddleware, ticketscontroller.UpDateTicketController);





export default ticketsRouter;
