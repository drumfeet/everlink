"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { useParams } from "next/navigation"

export default function UserDashboardPage() {
  const params = useParams()
  const address = params?.address

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Card className="bg-gray-900/50 border-gray-800 max-w-lg w-full">
            <CardContent className="p-12 flex flex-col items-center text-center">
              <div className="bg-purple-600/20 p-4 rounded-full mb-6">
                <Clock className="h-10 w-10 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Dashboard Coming Soon</h1>
              <p className="text-gray-400 mb-6">User: {address}</p>
              <a
                href="/"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition-colors"
              >
                Return to Home
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
