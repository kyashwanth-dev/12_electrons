import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-[var(--bg2)] border border-[var(--border)] rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
