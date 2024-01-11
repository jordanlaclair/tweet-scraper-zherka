/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6s3Xgq9ld5R
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4 animate-pulse">
        <div className="h-12 w-12 text-gray-900 animate-spin" />
        <p className="text-lg font-medium text-gray-600">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
