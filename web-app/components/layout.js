"use client"

export function Layout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <main>{children}</main>
    </div>
  )
}
