"use client"

import type React from "react"
import { useDroppable } from "@dnd-kit/core"
import type { Status } from "@/Types/ticket"

interface DroppableAreaProps {
  id: Status
  children: React.ReactNode
}

export function DroppableArea({ id, children }: DroppableAreaProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-96 p-2 transition-all duration-200 ${
        isOver ? "bg-blue-50 border-2 border-blue-300 border-dashed rounded-lg" : "border-2 border-transparent"
      }`}
    >
      {children}
    </div>
  )
}
