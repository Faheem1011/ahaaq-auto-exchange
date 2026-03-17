import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-8">
      <ol className="flex items-center space-x-2 text-sm font-medium text-zinc-500">
        <li>
          <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
            <Home size={14} />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-zinc-300" />
            {item.href ? (
              <Link href={item.href} className="hover:text-zinc-900 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-900 font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      {/* Schema for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ahaaq-auto-exchange.vercel.app"
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": item.href ? `https://ahaaq-auto-exchange.vercel.app${item.href}` : undefined
              }))
            ]
          }),
        }}
      />
    </nav>
  );
};

export default Breadcrumbs;
