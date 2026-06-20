'use client';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAllPokemons } from '../../store/selectedPokemonsSlice';

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(
    (state) => state.selectedPokemons.selectedPokemons
  );

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/export-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedPokemons }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedPokemons.length}_items.csv`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate CSV:', error);
    }
  };

  if (selectedPokemons.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 p-4 rounded-lg bg-teal-50 dark:bg-mist-400 shadow-md">
      <h3 className="font-mono text-lg text-md mb-4">{`${selectedPokemons.length} pokemon(s) selected`}</h3>
      <div className="space-x-4">
        <button
          className="inline-block bg-gray-500 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-md cursor-pointer"
          onClick={() => dispatch(unselectAllPokemons())}
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="inline-block bg-teal-600 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md cursor-pointer"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
