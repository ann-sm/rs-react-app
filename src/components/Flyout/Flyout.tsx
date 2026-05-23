import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAllPokemons } from '../../store/selectedPokemonsSlice';

function Flyout() {
  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(
    (state) => state.selectedPokemons.selectedPokemons
  );

  const handleDownload = () => {
    const csvRows = [
      [
        'Id',
        'Name',
        'Types',
        'Abilities',
        'Height',
        'Weight',
        'Image URL',
        'Details URL',
      ],
      ...selectedPokemons.map((pokemon) => [
        pokemon.id,
        pokemon.name,
        `"${pokemon.types.join(', ')}"`,
        `"${pokemon.abilities.join(', ')}"`,
        pokemon.height,
        pokemon.weight,
        pokemon.image,
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    return URL.createObjectURL(blob);
  };

  const filename = `${selectedPokemons.length}_items.csv`;
  const csvFile = handleDownload();

  return (
    <div className="fixed right-4 bottom-4 p-4 rounded-lg bg-teal-50 shadow-md">
      <h3 className="font-mono text-lg text-md mb-4">{`${selectedPokemons.length} pokemon(s) selected`}</h3>
      <div className="space-x-4">
        <button
          className="inline-block bg-gray-500 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors shadow-md"
          onClick={() => dispatch(unselectAllPokemons())}
        >
          Unselect all
        </button>
        <a
          href={csvFile}
          download={filename}
          className="inline-block bg-teal-600 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default Flyout;
