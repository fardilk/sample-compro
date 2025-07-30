import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  color?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  color = 'orange-main',
  className = '',
  children,
  ...props
}) => {
  const base = 'px-5 py-2 rounded-md font-medium whitespace-nowrap transition-colors';
  const filled = `bg-${color} text-white hover:bg-orange-dark`;
  const outlined = `border-2 border-${color} text-${color} bg-white hover:bg-${color} hover:text-white`;
  const variantClass = variant === 'filled' ? filled : outlined;
  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
