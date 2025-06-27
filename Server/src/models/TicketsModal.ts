import mongoose from "mongoose";

const TicketsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: String, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"], // restrict to allowed values
      required: true,
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress" , "Review" , "Backlog" , "Done"], // restrict to allowed values
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketsSchema);

export default Ticket;
