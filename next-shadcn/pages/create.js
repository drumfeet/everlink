import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { AppHeader } from "@/components/AppHeader"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  ImageUp,
  Plus,
  Trash2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Custom TikTok Icon component
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export default function CreatePage() {
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const [subdomain, setSubdomain] = useState("")
  const { toast } = useToast()

  const checkAvailability = async () => {
    if (!subdomain || subdomain.trim() === "") {
      toast({
        description: "Subdomain cannot be empty",
        variant: "destructive",
      })
      return
    }

    // Simulated availability check - in real app would check against actual records
    toast({
      title: "Subdomain is available",
      description: `${subdomain}_everlink.ar.io is available for registration`,
    })
  }

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, newLink])
      setNewLink({ title: "", url: "" })
    }
  }

  const deleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pb-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Create Profile</h1>
            {/* <p className="text-muted-foreground">Fill in your details</p> */}
          </div>

          <form className="space-y-8">
            {/* Profile section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex overflow-hidden rounded-md bg-background border border-input">
                  <Input
                    id="subdomain"
                    type="text"
                    placeholder="yoursubdomain"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="flex items-center bg-muted px-3 text-muted-foreground font-medium text-sm">
                    _everlink.ar.io
                  </div>
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select defaultValue="dark">
                  <SelectTrigger id="template" className="bg-background">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Links section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Custom Links
              </h2>
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="text-primary hover:text-primary/90"
                  onClick={addLink}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="linkTitle">Label</Label>
                    <Input
                      id="linkTitle"
                      placeholder="Enter link label"
                      value={newLink.title}
                      onChange={(e) =>
                        setNewLink({ ...newLink, title: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="linkUrl">URL</Label>
                    <Input
                      id="linkUrl"
                      placeholder="Enter link URL"
                      value={newLink.url}
                      onChange={(e) =>
                        setNewLink({ ...newLink, url: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>
                </div>

                {links.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-muted">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Link Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {links.map((link, index) => (
                        <TableRow key={index} className="border-b border-muted">
                          <TableCell className="w-[50px]">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLink(index)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{link.title}</div>
                              <div className="font-mono text-sm text-muted-foreground">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {link.url}
                                </a>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>

            {/* Profile Photo section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Profile Photo
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <ImageUp className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="photoInput">Upload Photo</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="photoInput"
                        type="file"
                        accept="image/*"
                        className="bg-background flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          // Simulated upload success
                          toast({
                            title: "Upload Successful",
                            description: "Transaction ID: ABC123XYZ",
                          })
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Or enter Transaction ID</Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter Arweave Tx ID for existing photo"
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Social media section */}
            <div className="space-y-6 rounded-lg border border-border/50 p-4">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Social Media
              </h2>
              {[
                {
                  icon: <Twitter className="h-5 w-5" />,
                  id: "twitter",
                  placeholder: "https://x.com/username",
                },
                {
                  icon: <TikTokIcon className="h-5 w-5" />,
                  id: "tiktok",
                  placeholder: "https://tiktok.com/@username",
                },
                {
                  icon: <Instagram className="h-5 w-5" />,
                  id: "instagram",
                  placeholder: "https://instagram.com/username",
                },
                {
                  icon: <Facebook className="h-5 w-5" />,
                  id: "facebook",
                  placeholder: "https://facebook.com/username",
                },
                {
                  icon: <Linkedin className="h-5 w-5" />,
                  id: "linkedin",
                  placeholder: "https://linkedin.com/in/username",
                },
              ].map((social) => (
                <div key={social.id} className="flex items-center space-x-2">
                  <Label htmlFor={social.id} className="w-8">
                    {social.icon}
                  </Label>
                  <Input
                    id={social.id}
                    placeholder={social.placeholder}
                    className="bg-background flex-grow"
                  />
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
