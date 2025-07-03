import { socialLinks } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SocialLinks() {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1">
        {socialLinks.map(link => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon">
                <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  <link.icon className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
