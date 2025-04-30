"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, LayoutDashboard, Copy } from "lucide-react"
import { useWallet } from "@/context/wallet-context"
import { useToast } from "@/hooks/use-toast"

/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children
 */

/**
 * Layout component that wraps the application with header and footer
 * @param {LayoutProps} props
 */
export function Layout({ children }) {
  const router = useRouter()
  const { toast } = useToast()
  const {
    walletAddress,
    connectWanderWallet,
    connectBrowserWallet,
    logout,
    truncateAddress,
  } = useWallet()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      toast({
        variant: "success",
        title: "Address Copied",
        description: `${truncateAddress(
          walletAddress
        )} has been copied to clipboard`,
        duration: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white">
              everlink.fun
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/explore"
                className="text-white flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                <span className="sr-only">Explore</span>
              </Link>
              {walletAddress ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium bg-purple-600 text-white hover:bg-purple-700">
                      <span>{truncateAddress(walletAddress)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-800">
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-gray-300 hover:text-white focus:text-white cursor-pointer"
                      onClick={() => router.push(`/user/${walletAddress}`)}
                    >
                      <LayoutDashboard size={16} />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-gray-300 hover:text-white focus:text-white cursor-pointer"
                      onClick={handleCopyAddress}
                    >
                      <Copy size={16} />
                      <span>Copy Address</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-gray-300 hover:text-white focus:text-white cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-medium bg-purple-600 text-white hover:bg-purple-700">
                      <span>Login</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Connect Wallet
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <Button
                        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => {
                          connectWanderWallet()
                          setIsDialogOpen(false)
                          toast({
                            title: "Wallet Connected",
                            description:
                              "Successfully connected to Wander Wallet",
                            duration: 3000,
                          })
                        }}
                      >
                        <Wallet size={18} />
                        Wander Wallet
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => {
                          connectBrowserWallet()
                          setIsDialogOpen(false)
                          toast({
                            title: "Wallet Connected",
                            description:
                              "Successfully connected to Browser Wallet",
                            duration: 3000,
                          })
                        }}
                      >
                        <Wallet size={18} />
                        Browser Wallet
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="py-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Footer left section */}
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/everlinkdotfun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 1200 1227"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                  />
                </svg>
                <span className="sr-only">Twitter/X</span>
              </a>
              <a
                href="https://discord.com/invite/bWU5e3cVuW"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 199"
                  fill="currentColor"
                  stroke="none"
                >
                  <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
                </svg>
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="https://github.com/weavedb/everlink"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  stroke="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M512 0C229.12 0 0 229.12 0 512C0 738.56 146.56 929.92 350.08 997.76C375.68 1002.24 385.28 983.68 385.28 967.68C385.28 953.28 384.64 920.96 384.64 878.08C256 905.76 222.72 849.92 212.48 821.12C206.72 806.4 181.76 760.96 160 746.56C142.08 735.36 116.48 707.84 159.36 707.2C199.68 706.56 228.48 744.32 237.44 759.68C284.16 836.8 357.76 822.4 387.2 806.4C391.68 773.12 405.12 750.4 419.84 737.28C305.92 724.16 186.88 680 186.88 484.48C186.88 429.44 206.72 384 238.72 348.48C233.6 335.36 215.68 282.24 244.48 211.84C244.48 211.84 287.36 198.4 385.28 264.32C426.24 252.8 469.76 247.04 513.28 247.04C556.8 247.04 600.32 252.8 641.28 264.32C739.2 197.76 782.08 211.84 782.08 211.84C810.88 282.24 792.96 335.36 787.84 348.48C819.84 384 839.68 428.8 839.68 484.48C839.68 680.64 720 724.16 606.08 737.28C624.64 753.92 640.64 785.6 640.64 834.24C640.64 902.4 640 947.84 640 967.68C640 983.68 649.6 1002.88 675.2 997.76C877.44 929.92 1024 737.92 1024 512C1024 229.12 794.88 0 512 0Z"
                  />
                </svg>
                <span className="sr-only">GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
