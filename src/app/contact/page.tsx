import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/layout/SocialLinks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a project in mind, a question, or just want to connect? I\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="container max-w-4xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12 animate-fadeInUp">
        <h1 className="font-headline text-4xl md:text-5xl">Get In Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/60">
          Have a project in mind, a question, or just want to connect? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="animate-fadeInUp animation-delay-200">
          <h2 className="font-headline text-2xl mb-4">Send a Message</h2>
          <ContactForm />
        </div>
        <div className="flex flex-col animate-fadeInUp animation-delay-400">
           <h2 className="font-headline text-2xl mb-4">Direct Links</h2>
            <p className="text-foreground/60 mb-4">
              For a quicker response, feel free to reach out on social media.
            </p>
          <div className="flex-grow flex items-start">
             <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
