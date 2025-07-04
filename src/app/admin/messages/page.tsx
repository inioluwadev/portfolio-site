import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deleteContactMessage } from "@/lib/actions/messages";
import { getContactMessages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

async function DeleteButton({ id }: { id: string }) {
  const deleteMessageWithId = deleteContactMessage.bind(null, id);
  return (
    <form action={deleteMessageWithId}>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="sr-only">Delete message</span>
      </Button>
    </form>
  )
}

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Contact Messages</CardTitle>
        <CardDescription>View messages sent through your contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Received</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{new Date(message.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">{message.message}</TableCell>
                  <TableCell className="text-right">
                    <DeleteButton id={message.id} />
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
