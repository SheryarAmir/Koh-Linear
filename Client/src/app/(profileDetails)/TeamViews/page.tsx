import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Calendar, Kanban, List } from "lucide-react"

const views = [
  {
    id: 1,
    name: "Sprint Board",
    type: "Kanban",
    description: "Current sprint progress",
    icon: Kanban,
    lastUpdated: "2 hours ago",
    items: 23,
  },
  {
    id: 2,
    name: "Roadmap View",
    type: "Timeline",
    description: "Product roadmap timeline",
    icon: Calendar,
    lastUpdated: "1 day ago",
    items: 45,
  },
  {
    id: 3,
    name: "Bug Tracker",
    type: "List",
    description: "All reported bugs",
    icon: List,
    lastUpdated: "3 hours ago",
    items: 12,
  },
  {
    id: 4,
    name: "Analytics Dashboard",
    type: "Chart",
    description: "Team performance metrics",
    icon: BarChart3,
    lastUpdated: "30 min ago",
    items: 8,
  },
]

const sprintData = [
  { status: "Todo", count: 8, color: "bg-gray-200" },
  { status: "In Progress", count: 5, color: "bg-blue-200" },
  { status: "In Review", count: 3, color: "bg-yellow-200" },
  { status: "Done", count: 7, color: "bg-green-200" },
]

export function TeamViews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Team Views</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="views">All Views</TabsTrigger>
            <TabsTrigger value="sprint">Sprint Board</TabsTrigger>
          </TabsList>

          <TabsContent value="views" className="space-y-3 mt-4">
            {views.map((view) => {
              const Icon = view.icon
              return (
                <div
                  key={view.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{view.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {view.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{view.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{view.items} items</span>
                      <span>•</span>
                      <span>Updated {view.lastUpdated}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="sprint" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sprintData.map((column) => (
                <div key={column.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{column.status}</span>
                    <Badge variant="secondary" className="text-xs">
                      {column.count}
                    </Badge>
                  </div>
                  <div className={`h-2 rounded-full ${column.color}`} />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" size="sm">
                View Full Board
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
