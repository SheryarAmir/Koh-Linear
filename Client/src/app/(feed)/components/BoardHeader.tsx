"use Client"

import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation";

interface BoardHeaderProps {
  onRefresh: () => void
  onCreate: () => void
  isFetching: boolean
}

const BoardHeader = ({ onRefresh, isFetching }: BoardHeaderProps) => {

      const router = useRouter();

      function hadleraddTicket(){
        router.push("/newTicket")
      }
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Task Board</h1>
        <p className="text-gray-600 mt-2">Manage your tasks with drag and drop</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onRefresh}
          variant="outline"
          disabled={isFetching}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        <Button onClick= {hadleraddTicket} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Ticket
        </Button>
      </div>
    </div>
  )
}

export default BoardHeader
