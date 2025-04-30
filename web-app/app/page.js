"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateTemplate } from "@/lib/template-generator"
import { LinkInput } from "@/components/link-input"
import { TemplatePreview } from "@/components/template-preview"
import { UsernameChecker } from "@/components/username-checker"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import { FormTabs } from "@/components/form-tabs"
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Share2,
  Instagram,
  Twitter,
  Youtube,
  Music,
  MapPin,
  ExternalLink,
  Pencil,
  Download,
  Upload,
} from "lucide-react"
import { Layout } from "@/components/layout"

export default function ProfileCreator() {
  const [activeTab, setActiveTab] = useState("template")
  const [profileName, setProfileName] = useState("")
  const [isProfileNameAvailable, setIsProfileNameAvailable] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [currentGatewayIndex, setCurrentGatewayIndex] = useState(0)

  const gateways = [
    "weavedb.app",
    "permadao.io",
    "permagate.io",
    "arnode.xyz",
    "arfrost.xyz",
    "arnode.asia",
    "arlink.xyz",
    "ardrive.net",
    "ar.xyz",
    "defi.ao",
    "vevivofficial.xyz",
    "arweave.chat",
    "arweave.ph",
    "arweave.dev",
    "arweave.net",
  ]

  // Effect to cycle through gateways
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGatewayIndex((prevIndex) => (prevIndex + 1) % gateways.length)
    }, 2000) // Change gateway every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    links: [{ title: "", url: "" }],
    template: "neonpulse",
  })

  const [generatedHtml, setGeneratedHtml] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  // Define the tabs
  const tabs = [
    { id: "template", label: "Select Template" },
    { id: "username", label: "Choose Username" },
    { id: "profile", label: "Generate Profile" },
  ]

  // Template definitions with sample content
  const templates = [
    {
      id: "neonpulse",
      name: "Neon Pulse",
      description: "Dark theme with neon accents",
      image: "/templates/neonpulse.png",
      sampleName: "Alex Morgan",
      sampleBio: "Digital artist & motion designer",
      sampleLinks: ["Portfolio", "Instagram", "Twitter", "YouTube"],
      bgColor: "bg-black",
      textColor: "text-[#5CFFCA]",
      accentColor: "border-[#5CFFCA]",
    },
    {
      id: "subtle",
      name: "Subtle",
      description: "Light, minimalist design",
      image: "/templates/subtle.png",
      sampleName: "Jamie Smith",
      sampleBio: "Product designer based in San Francisco",
      sampleLinks: ["Portfolio", "Dribbble", "LinkedIn", "Contact"],
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      accentColor: "border-gray-300",
    },
    {
      id: "glassmorph",
      name: "Glassmorphic",
      description: "Modern glass effect design",
      image: "/templates/glassmorph.png",
      sampleName: "Taylor Reed",
      sampleBio: "Software engineer & open source contributor",
      sampleLinks: ["GitHub", "Twitter", "Blog", "Projects"],
      bgColor: "bg-[#0F1A3B]",
      textColor: "text-white",
      accentColor: "border-[#FF4D6D]",
    },
    {
      id: "retro",
      name: "Retro",
      description: "Vintage style with warm colors",
      image: "/templates/retro.png",
      sampleName: "Riley Cooper",
      sampleBio: "Vintage collector & music enthusiast",
      sampleLinks: ["Shop", "Instagram", "Spotify", "Events"],
      bgColor: "bg-[#FFEBB7]",
      textColor: "text-black",
      accentColor: "border-[#FF8AAE]",
    },
  ]

  // Add the isTabDisabled function to check if a tab should be disabled
  const isTabDisabled = (tabId) => {
    if (tabId === "profile") {
      return !isProfileNameAvailable || !profileName
    }
    return false
  }

  // Update the handleTabChange function to prevent navigation to disabled tabs
  const handleTabChange = (tabId) => {
    // Prevent navigation to the profile tab if username is not available
    if (tabId === "profile" && (!isProfileNameAvailable || !profileName)) {
      return
    }
    setActiveTab(tabId)
  }

  const handleTemplateChange = (templateId) => {
    setFormData((prev) => ({ ...prev, template: templateId }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setFormData((prev) => ({ ...prev, links: newLinks }))
  }

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { title: "", url: "" }],
    }))
  }

  const removeLink = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, links: newLinks }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const html = generateTemplate({
      ...formData,
      profileName,
      profileImage,
    })
    setGeneratedHtml(html)
    setShowPreview(true)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${profileName.toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const deployProfile = () => {
    console.log("Deploying profile:", profileName)
    // Mock deployment function
    console.log("Profile HTML (full):", generatedHtml)
  }

  // Update the handleContinue function to check if the next tab is accessible
  const handleContinue = () => {
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentTabIndex < tabs.length - 1) {
      const nextTabId = tabs[currentTabIndex + 1].id

      // Check if the next tab is disabled
      if (isTabDisabled(nextTabId)) {
        return
      }

      setActiveTab(nextTabId)
    }
  }

  const handleBack = () => {
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id)
    }
  }

  // Social media icons for template previews
  const SocialIcons = ({ template }) => {
    if (template === "neonpulse") {
      return (
        <div className="flex space-x-3 mt-3 justify-center">
          <div className="w-8 h-8 rounded-full border border-[#5CFFCA] flex items-center justify-center">
            <Instagram size={16} className="text-[#5CFFCA]" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#5CFFCA] flex items-center justify-center">
            <Twitter size={16} className="text-[#5CFFCA]" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#5CFFCA] flex items-center justify-center">
            <Youtube size={16} className="text-[#5CFFCA]" />
          </div>
        </div>
      )
    } else if (template === "subtle") {
      return (
        <div className="flex space-x-3 mt-3 justify-center">
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <Instagram size={16} className="text-gray-600" />
          </div>
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <ExternalLink size={16} className="text-gray-600" />
          </div>
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <Twitter size={16} className="text-gray-600" />
          </div>
        </div>
      )
    } else if (template === "glassmorph") {
      return (
        <div className="flex space-x-3 mt-3 justify-center">
          <div className="w-8 h-8 rounded-full border border-[#FF4D6D] flex items-center justify-center">
            <Instagram size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#FF4D6D] flex items-center justify-center">
            <Twitter size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#FF4D6D] flex items-center justify-center">
            <Globe size={16} className="text-white" />
          </div>
        </div>
      )
    } else if (template === "retro") {
      return (
        <div className="flex space-x-3 mt-3 justify-center">
          <div className="w-8 h-8 rounded-full border border-[#FF8AAE] flex items-center justify-center">
            <Instagram size={16} className="text-black" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#FF8AAE] flex items-center justify-center">
            <Music size={16} className="text-black" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#FF8AAE] flex items-center justify-center">
            <MapPin size={16} className="text-black" />
          </div>
        </div>
      )
    }
    return null
  }

  // Link button for template previews
  const LinkButton = ({ template, text }) => {
    if (template === "neonpulse") {
      return (
        <div className="bg-black border border-[#5CFFCA] text-[#5CFFCA] rounded-md py-2 px-4 text-center my-2">
          {text}
        </div>
      )
    } else if (template === "subtle") {
      return (
        <div className="bg-white border border-gray-300 text-gray-800 rounded-md py-2 px-4 text-center my-2">
          {text}
        </div>
      )
    } else if (template === "glassmorph") {
      return (
        <div className="bg-[#1A2A5E]/50 border border-[#2A3A6E] text-white rounded-md py-2 px-4 text-center my-2">
          {text}
        </div>
      )
    } else if (template === "retro") {
      return (
        <div className="bg-black border-2 border-[#FF8AAE] text-white rounded-md py-2 px-4 text-center my-2">
          {text}
        </div>
      )
    }
    return null
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {!showPreview ? (
          <>
            {/* Tab Navigation */}
            <FormTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isTabDisabled={isTabDisabled}
            />

            {/* Template Selection Tab */}
            {activeTab === "template" && (
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gray-600/80 border-none shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-white">
                          Select a template
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Pick a design template for your profile
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => handleTemplateChange(template.id)}
                          className={`cursor-pointer transition-all duration-200 rounded-xl overflow-hidden ${
                            formData.template === template.id
                              ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20"
                              : "hover:ring-1 hover:ring-purple-500/50"
                          }`}
                        >
                          <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center">
                            <img
                              src={`/templates/${template.id}.png`}
                              alt={`${template.name} template preview`}
                              className="w-full h-full object-contain"
                            />

                            {/* Selection Indicator */}
                            {formData.template === template.id && (
                              <div className="absolute top-3 right-3 bg-purple-600 rounded-full p-1.5 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleContinue}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
                    >
                      Continue with{" "}
                      {templates.find((t) => t.id === formData.template)?.name}{" "}
                      template
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Username Selection Tab */}
            {activeTab === "username" && (
              <div className="max-w-3xl mx-auto">
                <Card className="bg-gray-600/80 border-none shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-white">
                          Input a username
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          This will be your unique identifier on Everlink
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <UsernameChecker
                        username={profileName}
                        setUsername={setProfileName}
                        onAvailabilityChange={setIsProfileNameAvailable}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="border-gray-700 text-gray-300 hover:text-white"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleContinue}
                      disabled={!isProfileNameAvailable || !profileName}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Profile Details Tab */}
            {activeTab === "profile" && (
              <div className="max-w-3xl mx-auto">
                <Card className="bg-gray-600/80 border-none shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-white">
                          Profile Information
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Fill out the details for your profile page
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="profileImage" className="text-white">
                          Profile Photo
                        </Label>
                        <ProfileImageUpload
                          imageUrl={profileImage}
                          onImageChange={setProfileImage}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">
                          Main Heading
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          placeholder="Your name or username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="bg-black/50 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white">
                          Sub Heading
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="A short bio or description"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="bg-black/50 border-gray-700 text-white min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label className="text-white">Links</Label>
                        {formData.links.map((link, index) => (
                          <LinkInput
                            key={index}
                            link={link}
                            onChange={(field, value) =>
                              handleLinkChange(index, field, value)
                            }
                            onRemove={() => removeLink(index)}
                            showRemove={formData.links.length > 1}
                          />
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addLink}
                          className="w-full border-gray-700 text-gray-300 hover:text-white"
                        >
                          Add Another Link
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="border-gray-700 text-gray-300 hover:text-white"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Generate Profile
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white">
                Your Profile Preview
              </h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPreview(false)}
                  className="border-gray-700 text-gray-300 hover:text-white"
                  title="Edit Profile"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDownload}
                  className="border-gray-700 text-gray-300 hover:text-white"
                  title="Download HTML"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  onClick={deployProfile}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Deploy
                </Button>
              </div>
            </div>

            <div className="w-full bg-[#111827]/60 backdrop-blur-md border border-gray-800 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-gradient-to-br from-[#1f2937cc] to-[#111827cc] rounded-lg p-4 flex-1 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[rgba(91,33,182,0.3)] p-2.5 rounded-md">
                      <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      Permanent Hosting
                    </h3>
                  </div>
                  <div className="bg-[#030712e6] border border-gray-800 rounded-md p-4">
                    <div className="flex flex-wrap items-center text-sm font-mono text-gray-300 break-all">
                      <span className="opacity-80">https://</span>
                      <span className="text-white font-bold bg-[rgba(124,58,237,0.3)] px-1.5 py-0.5 rounded-sm mx-1 inline-block">
                        {profileName || "yourname"}
                      </span>
                      <span className="inline-block">
                        _everlink.{gateways[currentGatewayIndex]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Your profile is always available through multiple{" "}
                    <a
                      href="https://network-portal.app/gateways#/gateways"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      gateways
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#1f2937cc] to-[#111827cc] rounded-lg p-4 flex-1 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[rgba(91,33,182,0.3)] p-2.5 rounded-md">
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      Easy Sharing
                    </h3>
                  </div>
                  <div className="bg-[#030712e6] border border-gray-800 rounded-md p-4">
                    <div className="flex flex-wrap items-center text-sm font-mono text-gray-300 break-all">
                      <span className="opacity-80">https://</span>
                      <span className="inline-block">everlink.fun/</span>
                      <span className="text-white font-bold bg-[rgba(124,58,237,0.3)] px-1.5 py-0.5 rounded-sm inline-block">
                        {profileName || "yourname"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Your profile is also accessible with a simple url
                  </p>
                </div>
              </div>
            </div>

            <TemplatePreview html={generatedHtml} />
          </div>
        )}
      </div>
    </Layout>
  )
}
