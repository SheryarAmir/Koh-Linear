

import { api } from "@/lib/axios";

import { Ticket, TicketPayload } from "@/Types/TicketTypes";




export const createTicket = async (data: TicketPayload) => {
  
  console.log(data);

  const res = await api.post("/v1/ticket/CreateTicket", data);

  console.log(res.data);

  return res.data;
};


export const getTickets=async()=>{
  const res=await api.get("/v1/ticket/getTicket")

  console.log(res.data)
   return res.data.tickets;
}






export const deleteTicket = async (id: string) => {
  console.log(id)
  const res = await api.delete(`/v1/ticket/DeleteTicket/${id}`)

  console.log(res.data.message) 

  return res.data.message 
}


export const UpDateTickets= async(id:string , status:string)=>{

  console.log(id, status)
  
  const res=await api.put(`/v1/ticket/UpDateTicket/${id}`, {status})

  console.log(res.data)

  return res.data
}   