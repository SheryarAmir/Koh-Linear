import { type NextRequest, NextResponse } from "next/server"
import type { CreateTicketData } from "@/Types/ticket"
import { addTicket, getTickets } from "@/lib/data-store"

export async function GET() {
  
  try {
    const tickets = getTickets()
    return NextResponse.json(tickets)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateTicketData = await request.json()

    // Validation
    if (!data.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (!data.assignee?.trim()) {
      return NextResponse.json({ error: "Assignee is required" }, { status: 400 })
    }

    const newTicket = {
      id: `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: data.title.trim(),
      description: data.description?.trim() || "",
      assignee: data.assignee.trim(),
      priority: data.priority,
      status: "Todo" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addTicket(newTicket)
    console.log("Created ticket:", newTicket) // Debug log

    return NextResponse.json(newTicket, { status: 201 })
  } catch (error) {
    console.error("Error creating ticket:", error)
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
