"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function NewsletterForm() {
  return (
    <form 
      className="flex w-full max-w-md items-center space-x-2"
      action="https://inioluwa.substack.com/api/v1/free_email_signup"
      method="post" 
      target="_blank"
    >
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="flex-1 bg-background"
        required
      />
      <Button type="submit" variant="default" size="icon" aria-label="Subscribe">
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
