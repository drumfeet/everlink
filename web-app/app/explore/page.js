"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Sparkles } from "lucide-react"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for featured profiles
  const featuredProfiles = [
    {
      id: "1",
      username: "creativecoder",
      name: "Alex Morgan",
      bio: "Full-stack developer & UI designer",
      template: "neonpulse",
      image: "/profile-avatar-1.png",
    },
    {
      id: "2",
      username: "designerflow",
      name: "Jamie Smith",
      bio: "Product designer & illustrator",
      template: "subtle",
      image: "/diverse-profile-avatars-2.png",
    },
    {
      id: "3",
      username: "cryptoexplorer",
      name: "Taylor Reed",
      bio: "Blockchain enthusiast & developer",
      template: "glassmorph",
      image: "/profile-avatar-3.png",
    },
    {
      id: "4",
      username: "artcollector",
      name: "Riley Cooper",
      bio: "Digital artist & NFT collector",
      template: "retro",
      image: "/profile-avatar-4.png",
    },
    {
      id: "5",
      username: "musicproducer",
      name: "Jordan Lee",
      bio: "Music producer & sound designer",
      template: "neonpulse",
      image: "/profile-avatar-5.png",
    },
    {
      id: "6",
      username: "travelblogger",
      name: "Casey Kim",
      bio: "Travel blogger & photographer",
      template: "subtle",
      image: "/profile-avatar-6.png",
    },
    {
      id: "7",
      username: "techwriter",
      name: "Morgan Taylor",
      bio: "Tech writer & content creator",
      template: "glassmorph",
      image: "/profile-avatar-7.png",
    },
    {
      id: "8",
      username: "gamedev",
      name: "Avery Johnson",
      bio: "Game developer & 3D artist",
      template: "retro",
      image: "/profile-avatar-8.png",
    },
  ]

  // Filter profiles based on search query
  const filteredProfiles = featuredProfiles.filter(
    (profile) =>
      profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get template badge color
  const getTemplateBadgeColor = (template) => {
    switch (template) {
      case "neonpulse":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "subtle":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      case "glassmorph":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30"
      case "retro":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-purple-600/20 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Explore Profiles</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover creative profiles and get inspired for your own permanent web presence
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-gray-700 text-white"
            />
          </div>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Featured Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <Card
              key={profile.id}
              className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={profile.image || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${getTemplateBadgeColor(profile.template)} inline-flex self-start mb-2`}
                  >
                    {profile.template}
                  </span>
                  <h3 className="text-white font-bold text-lg">{profile.name}</h3>
                  <p className="text-gray-300 text-sm">@{profile.username}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-400 text-sm line-clamp-2">{profile.bio}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    variant="link"
                    className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    onClick={() => window.open(`/${profile.username}`, "_blank")}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={() => window.open(`/?template=${profile.template}`, "_blank")}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-16 bg-gray-900/30 rounded-lg border border-gray-800">
            <div className="inline-flex items-center justify-center p-3 bg-gray-800/50 rounded-full mb-4">
              <Search className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No profiles found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We couldn't find any profiles matching your search. Try adjusting your search terms.
            </p>
          </div>
        )}

        {/* Coming Soon Section */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-lg border border-purple-900/30">
          <h2 className="text-2xl font-bold text-white mb-4">More Features Coming Soon</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            We're working on adding more discovery features, categories, and trending profiles. Stay tuned for updates!
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Create Your Profile</Button>
        </div>
      </div>
    </Layout>
  )
}
