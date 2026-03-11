import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Ayubowan Connect</h1>
        <p className="text-lg text-gray-600 mb-8">
          The homepage is currently under construction. We will integrate it later!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
          <Link
            href="/cart"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
