'use client';

import React, { useState, useEffect } from 'react';
import { Battery } from 'lucide-react';

const BatteryWarning: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const checkBattery = async () => {
      if ('getBattery' in navigator) {
        const battery: any = await (navigator as any).getBattery();
        const updateBatteryStatus = () => {
          setBatteryLevel(battery.level * 100);
        };

        battery.addEventListener('levelchange', updateBatteryStatus);
        updateBatteryStatus();

        return () => battery.removeEventListener('levelchange', updateBatteryStatus);
      }
    };

    checkBattery();
  }, []);

  if (batteryLevel === null || batteryLevel > 10) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
      <Battery className="w-6 h-6" />
      <span className="font-bold">{Math.round(batteryLevel)}%</span>
    </div>
  );
};

export default BatteryWarning;
