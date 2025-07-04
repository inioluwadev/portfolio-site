import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialLinkForm } from '@/components/forms/SocialLinkForm';
import { updateSocialLink } from '@/lib/actions/socials';
import { getSocialLinkById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditSocialLinkPage({ params }: { params: { id: string } }) {
  const link = await getSocialLinkById(params.id);

  if (!link) {
    notFound();
  }

  const updateLinkWithId = updateSocialLink.bind(null, link.id!);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Edit Social Link</CardTitle>
        <CardDescription>Update the details for your social link below.</CardDescription>
      </CardHeader>
      <CardContent>
        <SocialLinkForm link={link} formAction={updateLinkWithId} />
      </CardContent>
    </Card>
  );
}
