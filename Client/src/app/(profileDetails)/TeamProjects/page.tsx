import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Folder, Users, Calendar } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Web Application Redesign",
    description: "Complete overhaul of the user interface",
    progress: 75,
    team: ["Alice", "Bob", "Charlie"],
    dueDate: "Dec 15, 2024",
    status: "On Track",
    issues: { total: 24, completed: 18 },
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android applications",
    progress: 45,
    team: ["Diana", "Eve", "Frank"],
    dueDate: "Jan 30, 2025",
    status: "At Risk",
    issues: { total: 32, completed: 14 },
  },
  {
    id: 3,
    name: "API Integration",
    description: "Third-party service integrations",
    progress: 90,
    team: ["Grace", "Henry"],
    dueDate: "Nov 30, 2024",
    status: "Ahead",
    issues: { total: 16, completed: 15 },
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "On Track":
      return "default"
    case "At Risk":
      return "destructive"
    case "Ahead":
      return "secondary"
    default:
      return "secondary"
  }
}

export function TeamProjects() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Folder className="h-4 w-4" />
          Team Projects
        </CardTitle>
        <Button variant="outline" size="sm">
          New Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-sm">{project.name}</h3>
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
              <Badge variant={getStatusColor(project.status) as any} className="text-xs">
                {project.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{project.team.length} members</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{project.dueDate}</span>
              </div>
              <span>
                {project.issues.completed}/{project.issues.total} issues
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
