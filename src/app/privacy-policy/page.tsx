import PrivacyView from '@/components/views/PrivacyView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Welmora Privacy Policy - Learn how we protect your financial data with AES-256 encryption and privacy-first architecture.',
};

export default function PrivacyPolicyPage() {
    return <PrivacyView />;
}
