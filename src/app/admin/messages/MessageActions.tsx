'use client'

import { useTransition } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, BookCheck, Archive, Trash2 } from 'lucide-react';
import { deleteContactMessage, updateMessageStatus } from "@/lib/actions/messages";
import type { ContactMessage } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';

export function MessageActions({ message }: { message: ContactMessage }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleAction = (action: () => Promise<any>, successMessage: string, errorMessage: string) => {
        startTransition(async () => {
            const result = await action();
            if (result?.error) {
                toast({ variant: 'destructive', title: 'Error', description: errorMessage });
            } else {
                toast({ title: 'Success', description: successMessage });
            }
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost" disabled={isPending}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <a href={`mailto:${message.email}`} className="flex items-center cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" /> Reply
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {message.status === 'unread' && (
                    <DropdownMenuItem onSelect={() => handleAction(() => updateMessageStatus(message.id, 'read'), 'Message marked as read.', 'Failed to mark as read.')} className="cursor-pointer">
                        <BookCheck className="mr-2 h-4 w-4" /> Mark as Read
                    </DropdownMenuItem>
                )}
                {message.status !== 'archived' && (
                    <DropdownMenuItem onSelect={() => handleAction(() => updateMessageStatus(message.id, 'archived'), 'Message archived.', 'Failed to archive message.')} className="cursor-pointer">
                        <Archive className="mr-2 h-4 w-4" /> Archive
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={() => handleAction(() => deleteContactMessage(message.id), 'Message deleted.', 'Failed to delete message.')} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
