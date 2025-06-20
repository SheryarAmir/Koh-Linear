"use client"

import { Filter, MoreHorizontal, User, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Topbar() {
  const statusTabs = [
    { label: "All issues", active: false },
    { label: "Active", active: true },
    { label: "Backlog", active: false },
  ]

  return (
    <div className="h-14 border-b border-gray-800 flex items-center justify-between px-4">
      {/* Left side - Status tabs */}
      <div className="flex items-center gap-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.label}
            className={`text-sm font-medium transition-colors ${
              tab.active ? "border-b-2 border-purple-500 pb-4" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Grid3X3 className="w-4 h-4 mr-2" />
          Display
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <User className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
