import { Link } from 'react-router-dom';

function About() {
  return (
    <main className=" flex flex-col flex-1 bg-gray-100 justify-center">
      <div className="bg-white container rounded-lg shadow-lg p-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-logo font-black text-teal-700 mb-6">
          About PokéSearch
        </h1>
        <div className="space-y-4 font-mono text-gray-700">
          <p>
            PokéSearch is a comprehensive Pokémon search application built with
            React and the PokéAPI. It allows users to search for Pokémon, view
            detailed information, and navigate through pages of results.
          </p>
          <div>
            <h2 className="text-xl font-bold text-teal-600 mt-6 mb-3">
              Technologies Used
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>React 18 with TypeScript</li>
              <li>React Router v6</li>
              <li>Tailwind CSS</li>
              <li>PokéAPI for data</li>
              <li>Vite</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-teal-600 mt-6 mb-3">
              Course
            </h2>
            <p>
              This project was created by{' '}
              <Link
                to={'https://github.com/ann-sm'}
                target="blank"
                className="text-yellow-600 hover:text-yellow-700 underline"
              >
                ann-sm
              </Link>{' '}
              as part of the{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-700 underline"
              >
                RS School React Course
              </a>
            </p>
            <Link
              to="/"
              className="inline-block bg-gray-800 text-white font-mono px-4 py-2 mt-6 rounded-lg hover:bg-gray-900 transition-colors"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
