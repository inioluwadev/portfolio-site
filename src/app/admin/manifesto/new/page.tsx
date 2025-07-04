import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ManifestoPrincipleForm } from '@/components/forms/ManifestoPrincipleForm';
import { createManifestoPrinciple } from '@/lib/actions/manifesto';

export default function NewManifestoPrinciplePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Add New Principle</CardTitle>
        <CardDescription>Fill out the form below to add a new principle to your manifesto.</CardDescription>
      </CardHeader>
      <CardContent>
        <ManifestoPrincipleForm formAction={createManifestoPrinciple} />
      </CardContent>
    </Card>
  );
}
