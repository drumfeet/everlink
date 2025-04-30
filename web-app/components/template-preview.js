"use client"

import { useEffect, useRef } from "react"

export function TemplatePreview({ html }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        iframeDoc.open()
        iframeDoc.write(html)
        iframeDoc.close()
      }
    }
  }, [html])

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-black/30 shadow-md">
      <iframe
        ref={iframeRef}
        title="Template Preview"
        className="w-full h-[600px] border-0"
        sandbox="allow-same-origin"
      />
    </div>
  )
}
