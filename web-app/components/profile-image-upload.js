"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link, X } from "lucide-react"

export function ProfileImageUpload({ imageUrl, onImageChange }) {
  const [activeTab, setActiveTab] = useState("upload")
  const [previewUrl, setPreviewUrl] = useState(imageUrl)
  const [urlInput, setUrlInput] = useState(imageUrl)
  const fileInputRef = useRef(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setError(null)

    if (file) {
      // Check file size (100KiB = 102400 bytes)
      if (file.size > 102400) {
        setError("File size must be less than 100KiB")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }

      // Mock upload function
      mockUploadFile(file)
    }
  }

  const mockUploadFile = (file) => {
    // Simulate upload process
    setError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      setPreviewUrl(result)
      onImageChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleUrlSubmit = () => {
    setPreviewUrl(urlInput)
    onImageChange(urlInput)
  }

  const handleRemoveImage = () => {
    setPreviewUrl("")
    setUrlInput("")
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-gray-800/50">
          <TabsTrigger value="upload" className="data-[state=active]:bg-purple-600">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="data-[state=active]:bg-purple-600">
            <Link className="h-4 w-4 mr-2" />
            URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="mt-4">
          <div className="flex flex-col items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-black/50 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400">
              Recommended: Square image, at least 200x200 pixels. Maximum size: 100KiB
            </p>
          </div>
        </TabsContent>
        <TabsContent value="url" className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="bg-black/50 border-gray-700 text-white flex-1"
              />
              <Button type="button" onClick={handleUrlSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">
                Set
              </Button>
            </div>
            <p className="text-xs text-gray-400">Enter a direct link to an image (JPG, PNG, GIF)</p>
          </div>
        </TabsContent>
      </Tabs>

      {error && <div className="mt-2 text-sm text-red-400">{error}</div>}

      {previewUrl && (
        <div className="relative mt-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500 bg-black/30 flex items-center justify-center group">
              <img
                src={previewUrl || "/placeholder.svg?height=200&width=200&query=profile"}
                alt="Profile preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/diverse-professional-profiles.png"
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRemoveImage}
              className="text-gray-300 hover:text-red-400 hover:bg-red-400/10 border-gray-700 mt-2 h-8 w-8"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
