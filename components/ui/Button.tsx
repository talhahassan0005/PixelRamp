import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3',
  };
  const baseStyles = `${sizes[size]} rounded-lg font-semibold transition-all`;
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-300',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-200 border border-transparent hover:border-slate-700',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
