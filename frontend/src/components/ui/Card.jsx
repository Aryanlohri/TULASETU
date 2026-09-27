import { twMerge } from 'tailwind-merge';

export default function Card({ children, className, ...props }) {
  return (
    <div className={twMerge("glass rounded-2xl", className)} {...props}>
      {children}
    </div>
  );
}
