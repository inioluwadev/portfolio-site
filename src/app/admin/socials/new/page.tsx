import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialLinkForm } from '@/components/forms/SocialLinkForm';
import { createSocialLink } from '@/lib/actions/socials';

export default function NewSocialLinkPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Add New Social Link</CardTitle>
        <CardDescription>Fill out the form below to add a new link to your site.</CardDescription>
      </CardHeader>
      <CardContent>
        <SocialLinkForm formAction={createSocialLink} />
      </CardContent>
    </Card>
  );
}
