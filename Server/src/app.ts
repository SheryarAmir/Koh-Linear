
import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";
import Api1 from "./routes/v1/global.router";
import { corsOptions } from "./config/cors.config";

// import deserializeUser from "./middleware/deserializeUser";
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));

// app.use(deserializeUser);


app.use("/v1", Api1);

export default app;
