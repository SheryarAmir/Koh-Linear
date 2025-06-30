"use client"

import type React from "react"

import { useRouter } from "next/navigation";
// import { useForm, useFormState } from "react-dom";
import { useCreateTicket } from "@/Hooks/useCreateTicket"
import { ticketSchema } from "@/lib/validations/ticketSchema"
import { useState } from "react"

export default function CreateTicketPage() {
  const router = useRouter();

  const { mutate, isPending, isSuccess, isError, error } = useCreateTicket()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "Low", // Set default value
    status: "Todo", // Fixed: changed from Status to status and set default
  })

  function addNewTicket(){
    router.push("/dashboard")
  }
  function handlerShowAllTickets (){
     router.push("/getTicket")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsed = ticketSchema.safeParse(formData)

    if (!parsed.success) {
      console.error("Validation errors:", parsed.error.errors)
      alert("Validation failed: " + parsed.error.errors.map(err => err.message).join(", "))
      return
    }
    console.log("Form data being sent:", formData)
    // console.log("Parsed data:", parsed.data)
    mutate(parsed.data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Create New Ticket</h1>
            <p className="text-slate-300 mt-2">Fill out the form below to create a new support ticket</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter ticket title"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200 placeholder-slate-400 text-slate-900"
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail"
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200 placeholder-slate-400 text-slate-900 resize-none"
                />
              </div>

              {/* Assignee Field */}
              <div className="space-y-2">
                <label htmlFor="assignee" className="block text-sm font-semibold text-slate-700">
                  Assignee
                </label>
                <input
                  id="assignee"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  placeholder="Enter assignee name or email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200 placeholder-slate-400 text-slate-900"
                />
              </div>

              {/* Status Field - FIXED */}
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-semibold text-slate-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status" // ✅ matches form state key
                  value={formData.status} // ✅ now correctly references formData.status
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200 text-slate-900 bg-white"
                >
                  <option value="">Select Status</option>
                  <option value="Todo">🟢 Todo</option>
                  <option value="In Progress">🟡 In Progress</option>
                  <option value="Review">🔴 Review</option>

                  <option value="Done">✅ Done</option>
                </select>
              </div>

              {/* Priority Field - FIXED */}
              <div className="space-y-2">
                <label htmlFor="priority" className="block text-sm font-semibold text-slate-700">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  id="priority"
                  name="priority" // ✅ matches form state key
                  value={formData.priority} // ✅ now correctly references formData.priority
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200 text-slate-900 bg-white"
                >
                  <option value="">Select Priority</option>
                  <option value="Low" className="text-green-600">
                    🟢 Low
                  </option>
                  <option value="Medium" className="text-yellow-600">
                    🟡 Medium
                  </option>
                  <option value="High" className="text-red-600">
                    🔴 High
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  onClick={addNewTicket}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Ticket...</span>
                    </div>
                  ) : (
                    "Create Ticket"
                  )}
                </button>

                <button className="w-full mt-8 bg-gradient-to-r from-yellow-900 to-green-700 hover:from-slate-800 hover:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg" onClick={handlerShowAllTickets}>show all Tickets</button>
              </div>

             

              {/* Status Messages */}
              {isSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-green-800 font-medium">Ticket created successfully!</p>
                </div>
              )}

              {isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-800 font-medium">Error creating ticket</p>
                    <p className="text-red-600 text-sm mt-1">{error?.message}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}