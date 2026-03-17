import Link from 'next/link';

export default function Header({ title, description, menuItems }) {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                {title}
              </Link>
            </div>
            {description && (
              <p className="ml-4 text-sm text-gray-500 hidden sm:flex sm:items-center">
                {description}
              </p>
            )}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {menuItems?.map((item) => (
              <Link
                key={item.id}
                href={item.uri || '/'}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
