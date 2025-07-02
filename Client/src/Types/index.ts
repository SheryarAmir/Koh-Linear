export type ViewType = "kanban" | "inbox" | "issues" | "projects" | "views"

export interface Task {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "done" | "cancelled"
  priority?: "high" | "medium" | "low"
  assignee?: string
}
