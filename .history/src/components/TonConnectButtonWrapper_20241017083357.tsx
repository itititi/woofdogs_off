'use client';

import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

const TonConnectButtonWrapper: React.FC = () => {
  return (
    <div className="ton-connect-button-wrapper">
      <TonConnectButton />
    </div>
  );
};

export default TonConnectButtonWrapper;
