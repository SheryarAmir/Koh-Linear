"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createTicket } from "@/lib/api"
import type { CreateTicketData, Priority } from "@/Types/ticket"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/Hooks/use-toast"

interface TicketFormProps {
  onTicketCreated?: () => void
}

export function TicketForm({ onTicketCreated }: TicketFormProps) {
  const [formData, setFormData] = useState<CreateTicketData>({
    title: "",
    description: "",
    assignee: "",
    priority: "Medium",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }

    if (!formData.assignee.trim()) {
      toast({
        title: "Validation Error",
        description: "Assignee is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    console.log("Submitting ticket data:", formData) // Debug log

    try {
      await createTicket(formData)
      toast({
        title: "Success",
        description: "Ticket created successfully",
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        assignee: "",
        priority: "Medium",
      })

      onTicketCreated?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const priorityColors = {
    Low: "text-green-600",
    Medium: "text-yellow-600",
    High: "text-orange-600",
    Urgent: "text-red-600",
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Ticket
        </CardTitle>
        <CardDescription>Add a new ticket to track work and issues</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter ticket title..."
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the ticket in detail..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="text-base resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee *</Label>
              <Input
                id="assignee"
                placeholder="Enter assignee name..."
                value={formData.assignee}
                onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Priority) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Low", "Medium", "High", "Urgent"] as Priority[]).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <span className={priorityColors[priority]}>{priority}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Ticket...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Ticket
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
