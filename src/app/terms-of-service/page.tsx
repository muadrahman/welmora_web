import TermsView from '@/components/views/TermsView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Welmora Terms of Service - Educational financial tools and risk disclosure. Read our legal agreements and liability limitations.',
};

export default function TermsOfServicePage() {
    return <TermsView />;
}
