import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Circle, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

const issues = [
  {
    id: "ENG-123",
    title: "Fix authentication bug in login flow",
    status: "In Progress",
    priority: "High",
    assignee: "You",
    dueDate: "Today",
    project: "Web App",
  },
  {
    id: "ENG-124",
    title: "Implement dark mode toggle",
    status: "Todo",
    priority: "Medium",
    assignee: "You",
    dueDate: "Tomorrow",
    project: "Design System",
  },
  {
    id: "ENG-125",
    title: "Optimize database queries",
    status: "In Review",
    priority: "Low",
    assignee: "You",
    dueDate: "Next week",
    project: "Backend",
  },
  {
    id: "ENG-126",
    title: "Update documentation",
    status: "Done",
    priority: "Low",
    assignee: "You",
    dueDate: "Completed",
    project: "Docs",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Done":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "In Review":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    default:
      return <Circle className="h-4 w-4 text-gray-400" />
  }
}


const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "destructive"
    case "Medium":
      return "default"
    case "Low":
      return "secondary"
    default:
      return "secondary"
  }
}

export function MyIssues() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">My Issues</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            {getStatusIcon(issue.status)}
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">{issue.id}</span>
                <Badge variant="outline" className="text-xs">
                  {issue.project}
                </Badge>

              </div>
              <p className="text-sm font-medium leading-none">{issue.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant={getPriorityColor(issue.priority) as any} className="text-xs">
                  {issue.priority}
                </Badge>
                <span>•</span>
                <span>{issue.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
