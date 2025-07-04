import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getSocialLinks } from '@/lib/data';
import { deleteSocialLink } from '@/lib/actions/socials';
import { getIcon } from '@/lib/icons';

async function DeleteButton({ id }: { id: string }) {
  const deleteLinkWithId = deleteSocialLink.bind(null, id);
  return (
    <form action={deleteLinkWithId}>
      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
        <DropdownMenuItem className="text-destructive w-full focus:text-destructive focus:bg-destructive/10">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </Button>
    </form>
  )
}

export default async function AdminSocialsPage() {
  const socialLinks = await getSocialLinks();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline">Manage Social Links</CardTitle>
            <CardDescription>Add, edit, or remove your social media links.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/socials/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Link
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {socialLinks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialLinks.map((link) => {
                const Icon = getIcon(link.icon);
                return (
                  <TableRow key={link.id}>
                    <TableCell>{link.sort_order}</TableCell>
                    <TableCell><Icon className="h-5 w-5" /></TableCell>
                    <TableCell className="font-medium">{link.name}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-sm">{link.url}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/socials/edit/${link.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DeleteButton id={link.id!} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
            <p className="font-medium">No social links yet.</p>
            <p className="text-sm">Click "Add Link" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
