

import { api } from "@/api/api";

import { Ticket, TicketPayload } from "@/Types/TicketTypes";




export const createTicket = async (data: TicketPayload) => {
  
  console.log(data);

  const res = await api.post("/v1/ticket/CreateTicket", data, {

    
    withCredentials: true,
  });

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


export const updateTicketStatus = async (id: string, status: string) => {
  try {
    console.log("Updating Ticket:", id, status)

    const res = await api.patch(`/v1/ticket/Updatetickets/${id}`, { status })

    console.log("Updated Ticket Response:", res.data)
    return res.data
  } catch (error) {
    console.error("Error updating ticket:", error)
    throw error
  }
}



// export const GetMyTickets=async(id:string)=>{
//   const res=await api.get(`/v1/ticket/getMyIssues/${id}`,{
//     withCredentials: true,

//   })

//   console.log(res.data)
//   return res.data.getMyIssuesData
// }
