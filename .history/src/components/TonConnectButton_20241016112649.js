import dynamic from 'next/dynamic';

const TonConnectButton = dynamic(
  () => import('@tonconnect/ui-react').then((mod) => mod.TonConnectButton),
  { ssr: false }
);

export default TonConnectButton;
