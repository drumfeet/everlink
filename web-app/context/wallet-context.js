"use client"

import { createContext, useContext, useState, useEffect } from "react"

const WalletContext = createContext(undefined)

export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null)

  // Load wallet from localStorage on initial render
  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress")
    if (savedWallet) {
      setWalletAddress(savedWallet)
    }
  }, [])

  // Function to truncate wallet address
  const truncateAddress = (address) => {
    if (!address) return ""
    return `${address.substring(0, 4)}..${address.substring(address.length - 4)}`
  }

  // Mock wallet connection functions
  const connectWanderWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0xD3aB1a5623C6b7d"
    setWalletAddress(mockAddress)
    localStorage.setItem("walletAddress", mockAddress)
  }

  const connectBrowserWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0xF29bC7e31B3E8f1D"
    setWalletAddress(mockAddress)
    localStorage.setItem("walletAddress", mockAddress)
  }

  const logout = () => {
    setWalletAddress(null)
    localStorage.removeItem("walletAddress")
  }

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        connectWanderWallet,
        connectBrowserWallet,
        logout,
        truncateAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
