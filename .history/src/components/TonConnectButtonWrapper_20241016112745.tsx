'use client';

import React, { useEffect, useState } from 'react';

const TonConnectButtonWrapper: React.FC = () => {
  const [TonConnectButton, setTonConnectButton] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import('@tonconnect/ui-react').then((mod) => {
      setTonConnectButton(() => mod.TonConnectButton);
    });
  }, []);

  if (!TonConnectButton) {
    return null; // или можно вернуть заглушку, например <div>Loading...</div>
  }

  return <TonConnectButton />;
};

export default TonConnectButtonWrapper;
