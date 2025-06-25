

import { api } from "@/lib/axios";

import { getTicketTypes, TicketPayload } from "@/Types/TicketTypes";




export const createTicket = async (data: TicketPayload) => {
  console.log(data);

  const res = await api.post("/v1/ticket/CreateTicket", data);

  console.log(res.data);

  return res.data;
};




export const getTickets=async(data:getTicketTypes)=>{

  

  const res=await api.get("/v1/ticket/getTicket")

  // console.log(res.data)


   return res.data.tickets;
}