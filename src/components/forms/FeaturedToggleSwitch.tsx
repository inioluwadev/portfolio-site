'use client';

import { Switch } from '@/components/ui/switch';
import { toggleProjectFeatured } from '@/lib/actions/projects';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

export function FeaturedToggleSwitch({ id, isFeatured }: { id: string, isFeatured: boolean }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    startTransition(async () => {
      await toggleProjectFeatured(id, isFeatured);
      toast({
        title: 'Project Updated',
        description: `Project has been ${!isFeatured ? 'featured' : 'un-featured'}.`,
      });
    });
  };

  return <Switch checked={isFeatured} onCheckedChange={handleToggle} disabled={isPending} aria-label="Toggle featured status" />;
}
