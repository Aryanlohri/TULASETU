import { twMerge } from 'tailwind-merge';

export default function Card({ children, className, ...props }) {
  return (
    <div className={twMerge("bg-white border border-gray-200 shadow-sm rounded-lg", className)} {...props}>
      {children}
    </div>
  );
}
