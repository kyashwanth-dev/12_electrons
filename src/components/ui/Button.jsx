import React from 'react';
import { Link } from 'react-router-dom';

export function Button({ variant = 'primary', className = '', children, to, href, ...props }) {
  const baseStyles = "inline-flex justify-center items-center gap-1.5 text-sm font-semibold rounded-lg px-6 py-3 cursor-pointer transition-all duration-150 active:scale-[0.98]";
  
  const variants = {
    primary: "text-[#0A0C0F] bg-[var(--green)] hover:bg-[var(--green-hover)]",
    secondary: "text-[var(--text)] bg-[var(--bg3)] border border-[var(--border)] hover:bg-[var(--bg2)]",
    ghost: "bg-transparent hover:bg-[var(--bg3)] text-[var(--text)]",
  };

  const selectedVariant = variants[variant] || variants.primary;
  const classes = `${baseStyles} ${selectedVariant} ${className}`;

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }
  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
