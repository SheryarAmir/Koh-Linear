import { Router } from "express";

import * as ticketscontroller from "../../controllers/v1/tickets.controller";


const ticketsRouter = Router();

ticketsRouter.post("/CreateTicket", ticketscontroller.AddTicket );
ticketsRouter.get("/getTicket", ticketscontroller.GetTicket );
ticketsRouter.delete("/DeleteTicket/:id", ticketscontroller.DeleteTicketcontroller);
ticketsRouter.put("/UpDateTicket/:id", ticketscontroller.UpDateTicketcontroller);


export default ticketsRouter;