import AboutUsView from '@/components/views/AboutUsView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Meet the founders of Welmora - Muad Rahman (IIT Kharagpur) and Rohith CK (IISc Bangalore). Learn about our mission to simplify financial planning.',
};

export default function AboutUsPage() {
    return <AboutUsView />;
}
