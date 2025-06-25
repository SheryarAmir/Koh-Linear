


import { useMutation ,useQuery  } from "@tanstack/react-query";
import { createTicket ,getTickets} from "@/Services/ticketServices";
import {TicketPayload } from "@/Types/TicketTypes"

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




// export const useTickets = () => {
//   return useQuery({
//     queryKey: ["tickets"],
//     queryFn: getTickets,
//     onError: () => {
//       alert("Something went WRONG");
//     },
//   });
// };