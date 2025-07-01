"use client"

import type React from "react"
import type { Ticket } from "@/Types/TicketTypes"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, AlertCircle, Clock } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
  ticket: Ticket | null
}

const TicketModal: React.FC<Props> = ({ open, onClose, ticket }) => {
  if (!ticket) return null

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "closed":
        return "bg-green-100 text-green-800 border-green-200"
      case "resolved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold text-gray-900 pr-8">{ticket.title}</DialogTitle>
          <DialogDescription className="text-base text-gray-600 leading-relaxed">
            {ticket.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Status and Priority Row */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <Badge variant="outline" className={`${getStatusColor(ticket.status)} font-medium`}>
                {ticket.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <Badge variant={getPriorityColor(ticket.priority)} className="font-medium">
                {ticket.priority}
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Assignee</div>
                  <div className="text-sm text-gray-900">{ticket.assignee}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Created</div>
                  <div className="text-sm text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-blue-700 mb-1">Last Updated</div>
              <div className="text-sm text-blue-900">{new Date(ticket.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
          <Button onClick={onClose} variant="outline" className="px-6 py-2 font-medium bg-transparent">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TicketModal
