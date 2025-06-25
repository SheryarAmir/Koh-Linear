import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
    <Card className="p-6 text-center">
      <CardContent>
        <p className="text-red-600 mb-4">Error loading tickets. Please try again.</p>
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </CardContent>
    </Card>
  </div>
)

export default ErrorState
