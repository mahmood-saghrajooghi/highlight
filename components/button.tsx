import type { HTMLAttributes } from 'react';

export default function Button({ children, className, ...props}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`button ${className}`}>
      {children}
    </button>
  )
}
