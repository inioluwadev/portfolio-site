'use client';

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useFormStatus } from "react-dom";
import { syncBlogPosts } from "@/lib/actions/blog";
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect } from "react";
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
      {pending ? 'Syncing...' : 'Sync Now'}
    </Button>
  );
}

function RssInfoDisplay({ rssUrl }: { rssUrl: string }) {
  return (
    <div>
      <h3 className="font-medium">Substack Sync</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Syncing from feed: <code className="bg-muted px-1 py-0.5 rounded text-xs">{rssUrl}</code>
      </p>
    </div>
  )
}

export function BlogSyncForm({ rssUrl }: { rssUrl: string }) {
  const [state, formAction] = useActionState(syncBlogPosts, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Sync Failed',
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: 'Sync Complete!',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <>
      <form action={formAction}>
        <div className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="flex-1">
            <RssInfoDisplay rssUrl={rssUrl} />
          </div>
          <SubmitButton />
        </div>
      </form>
       {state?.error && <p className="text-sm text-destructive mt-4">{state.error}</p>}
    </>
  );
}
