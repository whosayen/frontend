import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/components/home/Home'), { ssr: false });

export default function TutorPage() {
    return (
        <Home />
    );
}