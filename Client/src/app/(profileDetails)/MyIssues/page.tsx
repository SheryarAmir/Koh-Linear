
import {useGetMyTickets} from "@/hooks/useCreateTicket"
export function MyIssues() {
  const {data}=useGetMyTickets()

  console.log(data)
  return (

       <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((ticket) => (
          <div key={ticket._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{ticket.title}</h2>
            <p className="text-sm text-gray-600">{ticket.description}</p>
            <p className="text-xs text-gray-500">Status: {ticket.status}</p>
            <p className="text-xs text-gray-500">Priority: {ticket.priority}</p>
          </div>
        ))
      ) : (
        <p>No tickets found.</p>
      )}

</div> 
  )
}
