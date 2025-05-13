'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Back button for forms
    const isOnAddOrEditPage = pathname.endsWith('new') || pathname.endsWith('edit');
    setCanGoBack(isOnAddOrEditPage);
  }, [pathname]);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md" suppressHydrationWarning>
      <div className="container mx-auto flex justify-between items-center" suppressHydrationWarning>
        <div className="flex items-center space-x-4" suppressHydrationWarning>
          {canGoBack && (
            <button
              onClick={() => router.back()}
              className="hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors duration-150"
              aria-label="Go back"
            >
              &larr; Back
            </button>
          )}
          <Link href="/" className="text-xl font-semibold hover:text-gray-300">
            App Home
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/profiles" className="hover:text-gray-300">
              User Profiles
            </Link>
          </li>
          <li>
            <Link href="/roles" className="hover:text-gray-300">
              Roles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
