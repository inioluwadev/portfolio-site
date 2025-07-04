import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { SocialLink } from '@/lib/types';
import { getIcon } from '@/lib/icons';

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1">
        {links.map(link => {
          const Icon = getIcon(link.icon);
          return (
            <Tooltip key={link.id}>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
