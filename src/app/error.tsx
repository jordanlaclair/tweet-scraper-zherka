"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8tPveh00XJr
 */
import Link from "next/link";

export default function Error() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        The page you are looking for may have been moved or deleted. Please
        check the URL or go back to the homepage.
      </p>
      <div className="mt-6">
        <Link
          className="inline-flex items-center justify-center h-10 px-5 font-medium rounded-md text-white bg-gray-900 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-200"
          href="/"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
