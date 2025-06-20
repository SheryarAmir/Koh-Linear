"use client"

import { Inbox, User, FolderOpen, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


export function Sidebar() {
  const navigationItems = [
    { icon: Inbox, label: "Inbox", count: 1, active: false },
    { icon: User, label: "My issues", active: false },
    { icon: FolderOpen, label: "Projects", active: true },
    { icon: Eye, label: "Views", active: false },
  ]

  return (
    <div className="w-64 h-[900px] bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-xs font-bold">K</div>
          <span className="font-semibold">Koh-Liner</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                item.active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {item.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Workspace</div>

          <div className="mt-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
              <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center text-xs">K</div>
              <span>Kohminds</span>
            </div>

            <nav className="ml-6 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800">
                <span>Issues</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800">
                <span>Projects</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800">
                <span>Views</span>
              </button>
            </nav>
          </div>

        </div>

        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Your teams</div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button  className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Issue
        </Button>
      </div>
    </div>
  )
}
