"use client"

import { cn } from "@/lib/utils"

export function FormTabs({ tabs, activeTab, onTabChange, isTabDisabled }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
        {tabs.map((tab, index) => {
          const disabled = isTabDisabled ? isTabDisabled(tab.id) : false
          return (
            <button
              key={tab.id}
              onClick={() => !disabled && onTabChange(tab.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : disabled
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50",
              )}
              disabled={activeTab === tab.id || disabled}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full text-xs",
                    disabled ? "bg-gray-600/50 text-gray-500" : "bg-gray-700/50 text-gray-300",
                  )}
                >
                  {index + 1}
                </div>
                <span>{tab.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
