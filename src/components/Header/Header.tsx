import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-teal-700 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-logo font-black text-yellow-400 uppercase text-center mb-4 tracking-wider [text-shadow:2px_2px_0_rgb(185_28_28)]">
          PokéSearch
        </h1>
        <div className="text-center">
          <Link
            to={'about'}
            className="text-lg text-center container my-auto font-mono text-gray-100"
          >
            about me
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
