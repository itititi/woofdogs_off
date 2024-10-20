'use client';

import React, { useState, useEffect } from 'react';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<BatteryManager>;
}

const BatteryWarning: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const checkBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery: BatteryManager = await (navigator as NavigatorWithBattery).getBattery();
          const updateBatteryStatus = () => {
            setBatteryLevel(battery.level * 100);
          };

          battery.addEventListener('levelchange', updateBatteryStatus);
          updateBatteryStatus();

          return () => battery.removeEventListener('levelchange', updateBatteryStatus);
        } catch (error) {
          console.error('Error accessing battery status:', error);
        }
      }
    };

    checkBattery();
  }, []);

  if (batteryLevel === null || batteryLevel > 10) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center space-x-2 animate-pulse">
      <span className="w-6 h-6">🔋</span>
      <span className="font-bold">{Math.round(batteryLevel)}%</span>
    </div>
  );
};

export default BatteryWarning;
