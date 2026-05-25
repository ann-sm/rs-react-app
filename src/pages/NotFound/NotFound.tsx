import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-teal-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-logo font-black text-teal-700 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-mono font-bold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-300 font-mono mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-teal-600 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
          >
            Go to PokéSearch
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-block bg-gray-500 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
