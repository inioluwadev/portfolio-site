import { Wrench } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Maintenance',
  description: 'Our site is temporarily down for maintenance. We\'ll be back shortly.',
};

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <Wrench className="w-16 h-16 mb-6 text-primary" />
      <h1 className="text-5xl font-headline mb-4">Under Maintenance</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        We're currently performing some scheduled maintenance. We should be back online shortly. Thank you for your patience!
      </p>
    </div>
  );
}
