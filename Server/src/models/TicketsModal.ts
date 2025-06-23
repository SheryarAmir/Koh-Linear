

import mongoose from "mongoose";

const  Tickets= new mongoose.Schema({

Title:{
    type:String,
    require:true,
} ,
Description:{
    type:String,
    require:true,
} ,

Assignee:{
    type:String,
    require:true,
   

},

Priority:{
     type:String,
    require:true,
   
}


})

const Ticket =mongoose.model("Tickets", Tickets)

export default  Ticket;


