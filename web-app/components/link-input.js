"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function LinkInput({ link, onChange, onRemove, showRemove }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-1">
        <Input
          placeholder="Link Title (e.g. Twitter, YouTube)"
          value={link.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="mb-2 bg-black/50 border-gray-700 text-white"
        />
        <Input
          placeholder="URL (e.g. https://twitter.com/username)"
          value={link.url}
          onChange={(e) => onChange("url", e.target.value)}
          type="url"
          className="bg-black/50 border-gray-700 text-white"
        />
      </div>
      {showRemove && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="mt-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
