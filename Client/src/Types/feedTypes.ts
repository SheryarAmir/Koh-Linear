export type IssueStatus = "backlog" | "todo" | "in-progress" | "done" | "canceled"

export interface Issue {
  id: string
  title: string
  status: IssueStatus
  priority: "low" | "medium" | "high"
  assignee: {
    name: string
    avatar: string
  }
}
