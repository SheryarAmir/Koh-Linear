"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { KanbanSidebar } from "../sidebar/page"
import { KanbanTopbar } from "../topbar/page"
import KanbanBoard from "@/app/(feed)/KanbanBoard/KanbanBoard"

export default function KanbanApp() {
  const [currentView, setCurrentView] = React.useState("all-issues")

  const handleViewChange = (view: string) => {
    setCurrentView(view)
    console.log("View changed to:", view) // You can replace this with your actual view switching logic
  }

  const renderMainContent = () => {
    switch (currentView) {
      case "all-issues":
      case "all-tickets":
        return (
          <div className="">
            <KanbanBoard/>
          </div>
        )
      case "active":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Active Issues</h2>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Active issues view</p>
            </div>
          </div>
        )
      case "backlog":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Backlog</h2>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Backlog view</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{currentView}</h2>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace("-", " ")} view
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SidebarProvider defaultOpen={true}>
        <KanbanSidebar onViewChange={handleViewChange} currentView={currentView} />
        <SidebarInset className="bg-white">
          <KanbanTopbar onViewChange={handleViewChange} currentView={currentView} />
          <main className="flex-1 bg-white">{renderMainContent()}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
