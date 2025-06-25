import { Card, CardContent } from "@/components/ui/card"
import type { Ticket } from "@/Types/TicketTypes"

interface BoardStatsProps {
  columns: { id: Ticket["status"], title: string }[]
  getTicketsByStatus: (status: Ticket["status"]) => Ticket[]
}

const BoardStats = ({ columns, getTicketsByStatus }: BoardStatsProps) => {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
      {columns.map((col) => (
        <Card key={col.id} className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {getTicketsByStatus(col.id as Ticket["status"]).length}
            </div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">{col.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BoardStats
