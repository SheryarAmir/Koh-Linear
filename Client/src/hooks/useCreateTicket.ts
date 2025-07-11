


import { useMutation ,useQuery  } from "@tanstack/react-query";
import { createTicket ,getTickets, deleteTicket,updateTicketStatus,GetMyTickets} from "@/Services/ticketServices";
import {TicketPayload ,Ticket } from "@/Types/TicketTypes"
import { useQueryClient } from "@tanstack/react-query"



export const useCreateTicket = () => {

  return useMutation({
    mutationFn: (payload: TicketPayload) => createTicket(payload),
    onSuccess: (data) => {
     
      console.log("Ticket created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating ticket:", error);
    },
  });
};

export const useGetAllTickets = () => {
  return useQuery<Ticket[]>({
    queryKey: ["Tickets"],
    queryFn: getTickets,
    enabled: true, // Only fetch on refetch()
  })
}


export const useDeleteTicket = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Tickets"] }) // Refetch tickets
    },
  })
}




export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTicketStatus(id, status),

    onSuccess: () => {
      // ✅ Refetch tickets after successful update
      queryClient.invalidateQueries({ queryKey: ["Tickets"] })
    },
  })
}




export const useGetMyTickets=(id:string)=>{

 const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => GetMyTickets(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Tickets"] }) // Refetch tickets
    },
  })
  
  

}