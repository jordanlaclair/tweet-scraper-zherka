/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4qFXMe1GmnG
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f0f0] text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">
        404
      </h1>
      <h2 className="mt-2 text-3xl font-semibold text-gray-600 dark:text-gray-400">
        Not Found
      </h2>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        The page you were looking for could not be found.
      </p>
      <Link
        className="mt-6 inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
        href="/"
      >
        Go Home
      </Link>
    </div>
  );
}
