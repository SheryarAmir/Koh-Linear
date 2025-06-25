import { Card, CardContent } from "@/components/ui/card"

const LoadingState = () => (
  <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
    <Card className="p-6 text-center">
      <CardContent>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading tickets...</p>
      </CardContent>
    </Card>
  </div>
)

export default LoadingState
