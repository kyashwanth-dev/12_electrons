import React from 'react';

export function GlassCard({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-[rgba(15,17,23,0.7)] backdrop-blur-md border border-[var(--border)] rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
