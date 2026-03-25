import Image from "next/image";

export default function Logo({ className = "w-48 h-12" }) {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Ahaaq Auto Exchange Logo" 
        fill
        className="object-contain" 
        priority
      />
    </div>
  );
}
