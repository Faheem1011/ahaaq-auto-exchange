export default function Logo({ className = "w-48" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Car Silhouette Custom SVG matching the flyer */}
      <svg viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto mb-[-8px]">
        <path
          d="M 10,50 Q 30,40 80,45 Q 150,20 200,10 Q 280,10 350,30 Q 380,40 390,50 Q 390,55 370,45 Q 330,30 250,20 Q 180,20 120,40 Q 60,45 20,55 Q 5,50 10,50 Z"
          fill="currentColor"
        />
        <path
          d="M 140,40 Q 180,25 240,25 Q 300,35 340,45"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter leading-none text-zinc-900 drop-shadow-sm">
          AHAAQ
        </h1>
        <p className="text-[0.65rem] font-bold tracking-[0.3em] text-zinc-700 mt-1">
          AUTO EXCHANGE
        </p>
      </div>
    </div>
  );
}
