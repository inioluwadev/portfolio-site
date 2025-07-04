import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getManifestoCoreBelief, getManifestoPrinciples, updateManifestoCoreBelief, deleteManifestoPrinciple } from '@/lib/actions/manifesto';
import { CoreBeliefForm } from './CoreBeliefForm';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

async function DeleteButton({ id }: { id: string }) {
  const deletePrincipleWithId = deleteManifestoPrinciple.bind(null, id);
  return (
    <form action={deletePrincipleWithId}>
      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
        <DropdownMenuItem className="text-destructive w-full focus:text-destructive focus:bg-destructive/10">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </Button>
    </form>
  )
}

export default async function AdminManifestoPage() {
  const [coreBelief, principles] = await Promise.all([
    getManifestoCoreBelief(),
    getManifestoPrinciples(),
  ]);

  if (!coreBelief) {
    return (
       <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Setup Required</AlertTitle>
        <AlertDescription>
          The manifesto tables seem to be empty or could not be reached. Please run the initial setup SQL script in your Supabase dashboard.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Update Core Belief</CardTitle>
          <CardDescription>Edit the main quote displayed on your manifesto page.</CardDescription>
        </CardHeader>
        <CardContent>
          <CoreBeliefForm coreBelief={coreBelief} formAction={updateManifestoCoreBelief} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-headline">Manage Manifesto Principles</CardTitle>
              <CardDescription>Add, edit, or remove principles from your manifesto.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/manifesto/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Principle
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {principles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {principles.map((principle) => (
                  <TableRow key={principle.id}>
                    <TableCell className="font-medium">{principle.title}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-sm">{principle.description}</TableCell>
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
                            <Link href={`/admin/manifesto/edit/${principle.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DeleteButton id={principle.id!} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
              <p className="font-medium">No principles yet.</p>
              <p className="text-sm">Click "Add Principle" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
