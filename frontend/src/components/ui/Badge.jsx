import { twMerge } from 'tailwind-merge';

export default function Badge({ children, type = 'default', className }) {
  const types = {
    VERIFIED: 'bg-green-100 text-green-800 border border-green-200',
    PENDING: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    REJECTED: 'bg-red-100 text-red-800 border border-red-200',
    WEIGHING: 'bg-primary-100 text-primary-800 border border-primary-200',
    default: 'bg-gray-100 text-gray-800 border border-gray-200'
  };
  
  return (
    <span className={twMerge("px-2.5 py-0.5 rounded-full text-xs font-bold", types[type] || types.default, className)}>
      {children}
    </span>
  );
}
