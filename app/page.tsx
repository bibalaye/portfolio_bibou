import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('./ClientHome'), {
  loading: () => <p>Chargement...</p>,
});

export default function Home() {
  return <HomeClient />;
}
