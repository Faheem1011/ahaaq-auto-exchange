import Image from "next/image";

export default function Logo({ className = "w-48" }) {
  return (
    <div className={`relative ${className} h-10`}>
      <Image 
        src="/logo.png" 
        alt="Ahaaq Auto Exchange Logo" 
        fill
        className="object-contain" 
      />
    </div>
  );
}
