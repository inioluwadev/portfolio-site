"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function NewsletterForm({ substackUrl }: { substackUrl: string }) {
  const formActionUrl = substackUrl ? `${substackUrl}/api/v1/free_email_signup` : "";
  
  return (
    <form 
      className="flex w-full max-w-md items-center space-x-2"
      action={formActionUrl}
      method="post" 
      target="_blank"
    >
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="flex-1 bg-background"
        required
        disabled={!substackUrl}
      />
      <Button type="submit" variant="default" size="icon" aria-label="Subscribe" disabled={!substackUrl}>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
