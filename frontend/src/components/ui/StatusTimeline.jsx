export default function StatusTimeline({ currentStatus }) {
  const statuses = ['SUBMITTED', 'ASSIGNED', 'INSPECTED', 'APPROVED', 'CERTIFIED'];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="flex items-center w-full my-6">
      {statuses.map((status, idx) => (
        <div key={status} className="flex-1 flex items-center relative">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors ${idx <= currentIndex ? 'bg-primary-900 text-white shadow-sm' : 'bg-gray-100 text-gray-400 border border-gray-300'}`}>
            {idx + 1}
          </div>
          {idx < statuses.length - 1 && (
            <div className={`h-1 w-full absolute left-4 top-1/2 -translate-y-1/2 ${idx < currentIndex ? 'bg-primary-900' : 'bg-gray-200'}`} />
          )}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600">{status}</span>
        </div>
      ))}
    </div>
  );
}
