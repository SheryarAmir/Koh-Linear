import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, MessageSquare, GitPullRequest, AlertCircle } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "mention",
    title: "You were mentioned in a comment",
    description: "Sarah mentioned you in 'Fix login bug'",
    time: "2 min ago",
    icon: MessageSquare,
    unread: true,
  },
  {
    id: 2,
    type: "review",
    title: "Code review requested",
    description: "Please review PR #123",
    time: "1 hour ago",
    icon: GitPullRequest,
    unread: true,
  },
  {
    id: 3,
    type: "issue",
    title: "High priority issue assigned",
    description: "Critical bug in payment system",
    time: "3 hours ago",
    icon: AlertCircle,
    unread: false,
  },
]

export function Inbox() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Inbox
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          {notifications.filter((n) => n.unread).length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-muted/50 ${
                notification.unread ? "bg-muted/30" : ""
              }`}
            >
              <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {notification.unread && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
