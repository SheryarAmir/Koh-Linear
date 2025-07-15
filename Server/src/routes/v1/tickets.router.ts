import { Router } from "express";
import * as ticketscontroller from "../../controllers/v1/tickets.controller";
import { authMiddleware } from "../../middleware/AuthMiddleware";
const ticketsRouter = Router();

ticketsRouter.post("/CreateTicket",authMiddleware, ticketscontroller.AddTicket );
ticketsRouter.get("/getTicket",authMiddleware, ticketscontroller.GetTicket );
ticketsRouter.delete("/DeleteTicket/:id", authMiddleware,ticketscontroller.DeleteTicketcontroller);
ticketsRouter.patch("/Updatetickets/:id",authMiddleware, ticketscontroller.UpDateTicketController);

// ticketsRouter.get("/getMyIssues",authMiddleware, ticketscontroller.GetMyTicket );






export default ticketsRouter;
