import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ManifestoPrincipleForm } from '@/components/forms/ManifestoPrincipleForm';
import { updateManifestoPrinciple } from '@/lib/actions/manifesto';
import { getManifestoPrincipleById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditManifestoPrinciplePage({ params }: { params: { id: string } }) {
  const principle = await getManifestoPrincipleById(params.id);

  if (!principle) {
    notFound();
  }

  const updatePrincipleWithId = updateManifestoPrinciple.bind(null, principle.id!);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Edit Principle</CardTitle>
        <CardDescription>Update the details for your manifesto principle below.</CardDescription>
      </CardHeader>
      <CardContent>
        <ManifestoPrincipleForm principle={principle} formAction={updatePrincipleWithId} />
      </CardContent>
    </Card>
  );
}
