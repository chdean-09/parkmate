import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Not Found - Url
        </h2>
        <p className="text-gray-600 mb-6">
          Could not find the requested resource.
        </p>
        <Link
          href="/home"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
