"use client"

import { useState } from "react"
import { TicketForm } from "@/app/(ui)/components/ticket-form"
import { TicketList } from "@/app/(ui)/components/ticket-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, Plus } from "lucide-react"

export default function HomePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTicketCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Linear Clone</h1>
          <p className="text-gray-600">Streamline your project management with our ticket system</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Kanban Board
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Ticket
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <TicketList refreshTrigger={refreshTrigger} />
          </TabsContent>

          <TabsContent value="create" className="mt-6 flex justify-center">
            <TicketForm onTicketCreated={handleTicketCreated} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
