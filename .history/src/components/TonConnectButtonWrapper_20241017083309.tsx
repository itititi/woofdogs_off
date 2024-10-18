'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TonConnectButton = dynamic(
  () => import('@tonconnect/ui-react').then((mod) => mod.TonConnectButton),
  { ssr: false }
);

const TonConnectButtonWrapper: React.FC = () => {
  return (
    <div className="ton-connect-button-wrapper">
      <TonConnectButton />
    </div>
  );
};

export default TonConnectButtonWrapper;
