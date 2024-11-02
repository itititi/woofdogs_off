'use client';

import React from 'react';

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const RainbowButton: React.FC<RainbowButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`relative group h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300 ${props.className || ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
      <span className="text-[16px] font-semibold text-white z-10">{children}</span>
    </button>
  );
};

export default RainbowButton;
