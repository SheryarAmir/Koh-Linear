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

    createdBy: {
  type: mongoose.Schema.Types.ObjectId,   // This tells Mongoose that the value stored in createdBy is an ObjectId — which is the unique identifier of another document in MongoDB. Think of it as a foreign key in relational databases.
  ref: "Auth",  //This tells Mongoose that the ObjectId refers to a document in the "Auth" collection .
  required: true,

}

    
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketsSchema);

export default Ticket;
