'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TonConnectButton = dynamic(
  () => import('@tonconnect/ui-react').then((mod) => mod.TonConnectButton),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const TonConnectButtonWrapper: React.FC = () => {
  return <TonConnectButton />;
};

export default TonConnectButtonWrapper;
