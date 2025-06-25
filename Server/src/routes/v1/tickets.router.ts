import { Router } from "express";

import * as ticketscontroller from "../../controllers/v1/tickets.controller";

const ticketsRouter = Router();

ticketsRouter.post("/CreateTicket", ticketscontroller.AddTicket );
ticketsRouter.get("/getTicket", ticketscontroller.GetTicket );


export default ticketsRouter;