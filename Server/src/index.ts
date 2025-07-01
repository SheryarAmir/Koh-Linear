import * as http from "http"; // http: Built-in Node.js module to create a web server.
import app from "./app"; // app: This is your Express app (probably defined in app.ts).
import connectDB from "./config/db"; // connectDB: A custom function that connects your server to MongoDB.
import dotenv from "dotenv"; // dotenv: Loads environment variables from a .env file (like PORT, MONGO_URI, etc.).

dotenv.config(); //This reads the .env file and makes the variables accessible using process.env.

const PORT = process.env.PORT || 8000; //Uses the port from your .env file if it exists.

const httpServer: http.Server = http.createServer(app); //Wraps your Express app in a raw HTTP server.

async function startServer(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

// app: This is your Express app (probably defined in app.ts).

// connectDB: A custom function that connects your server to MongoDB.

// dotenv: Loads environment variables from a .env file (like PORT, MONGO_URI, etc.).
