export default function LoadingSkeleton() {
  return (
    <div className="space-y-8 w-full">
      <div className="h-12 bg-white/5 rounded-2xl animate-pulse w-3/4" />
      <div className="h-32 bg-white/5 rounded-3xl animate-pulse w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-24 bg-white/5 rounded-[2rem] animate-pulse" />
        <div className="h-24 bg-white/5 rounded-[2rem] animate-pulse" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[140px] h-28 bg-white/5 rounded-3xl animate-pulse" />
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white/5 rounded-[2rem] animate-pulse" />
        ))}
      </div>
    </div>
  );
}
