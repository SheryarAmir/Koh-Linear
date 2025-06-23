import { type NextRequest, NextResponse } from "next/server"
import { updateTicket, findTicket } from "@/lib/data-store"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const ticketId = params.id

    console.log("Updating ticket:", ticketId, "to status:", status) // Debug log

    const existingTicket = findTicket(ticketId)
    if (!existingTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    const updatedTicket = updateTicket(ticketId, { status })
    if (!updatedTicket) {
      return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
    }

    console.log("Updated ticket:", updatedTicket) // Debug log
    return NextResponse.json(updatedTicket)
  } catch (error) {
    console.error("Error updating ticket:", error)
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
