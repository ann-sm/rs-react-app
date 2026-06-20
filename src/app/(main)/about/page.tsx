import Link from 'next/link';

const About = () => {
  return (
    <main className=" flex flex-col flex-1 bg-gray-100 dark:bg-teal-950 justify-center">
      <div className="bg-white dark:bg-cyan-900 container rounded-lg shadow-lg p-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-logo font-black text-teal-700 dark:text-teal-600 mb-6">
          About PokéSearch
        </h1>
        <div className="space-y-4 font-mono text-gray-700">
          <p className="dark:text-gray-300">
            PokéSearch is a comprehensive Pokémon search application built with
            React and the PokéAPI. It allows users to search for Pokémon, view
            detailed information, and navigate through pages of results.
          </p>
          <div>
            <h2 className="text-xl font-bold text-teal-600 mt-6 mb-3">
              Technologies Used
            </h2>
            <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
              <li>React with TypeScript</li>
              <li>React Router</li>
              <li>Tailwind CSS</li>
              <li>
                <Link
                  href={'https://pokeapi.co/'}
                  target="blank"
                  className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 underline"
                >
                  PokéAPI
                </Link>
              </li>
              <li>Vite</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-teal-600 mt-6 mb-3">
              Course
            </h2>
            <p className="mb-8 dark:text-gray-300">
              This project was created by{' '}
              <Link
                href={'https://github.com/ann-sm'}
                target="blank"
                className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 underline"
              >
                ann-sm
              </Link>{' '}
              as part of the{' '}
              <Link
                href="https://rs.school/courses/reactjs"
                target="blank"
                className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 underline"
              >
                RS School React Course
              </Link>
            </p>
            <Link
              href="/"
              className="inline-block bg-teal-600 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
