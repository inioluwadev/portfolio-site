import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getContactMessages } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { MessageActions } from "./MessageActions";
import { cn } from "@/lib/utils";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  const sortedMessages = [...messages].sort((a, b) => {
    if (a.status === 'unread' && b.status !== 'unread') return -1;
    if (a.status !== 'unread' && b.status === 'unread') return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Contact Submissions</CardTitle>
        <CardDescription>View and manage messages from your contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[150px]">Received</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMessages.map((message) => (
                <TableRow 
                  key={message.id} 
                  data-read={message.status !== 'unread'} 
                  className={cn(
                    message.status === 'unread' ? 'font-semibold' : 'text-muted-foreground',
                    'transition-colors'
                  )}
                >
                  <TableCell>
                    <Badge 
                      variant={message.status === 'unread' ? 'default' : 'secondary'} 
                      className="capitalize"
                    >
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{new Date(message.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className={cn(message.status !== 'unread' && 'text-foreground')}>
                    {message.name}
                  </TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="truncate max-w-xs">{message.message}</TableCell>
                  <TableCell className="text-right">
                    <MessageActions message={message} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
            <p className="font-medium">No messages yet.</p>
            <p className="text-sm">New submissions from your contact form will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
