import { Linkedin, Instagram, Twitter, Send, BookOpen, AtSign, Link2, type LucideIcon } from 'lucide-react';
import { availableIcons } from './types';

export const iconMap: Record<typeof availableIcons[number], LucideIcon> = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    send: Send,
    bookOpen: BookOpen,
    atSign: AtSign,
    link: Link2,
};

export function getIcon(name: string): LucideIcon {
    return iconMap[name as keyof typeof iconMap] || Link2;
}
