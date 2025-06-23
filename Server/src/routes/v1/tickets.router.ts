import { Router } from "express";

import * as ticketscontroller from "../../controllers/v1/tickets.controller";

const ticketsRouter = Router();

ticketsRouter.post("/AddTicket", ticketscontroller.AddTicket );
// authRouter.post();

export default ticketsRouter;