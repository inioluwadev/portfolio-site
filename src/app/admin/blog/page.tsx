'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { syncBlogPosts } from "@/lib/actions/blog";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
      {pending ? 'Syncing...' : 'Sync Now'}
    </Button>
  );
}

export default function AdminBlogPage() {
  const [state, formAction] = useFormState(syncBlogPosts, undefined);
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sync Blog Posts</CardTitle>
        <CardDescription>Sync your latest posts from your Substack feed.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium">Substack Sync</h3>
              <p className="text-sm text-muted-foreground">
                Fetch the latest articles to display on your blog page.
              </p>
            </div>
            <SubmitButton />
          </div>
        </form>
         {state?.error && <p className="text-sm text-destructive mt-4">{state.error}</p>}
      </CardContent>
    </Card>
  );
}
