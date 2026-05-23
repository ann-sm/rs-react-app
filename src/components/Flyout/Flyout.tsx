import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAllPokemons } from '../../store/selectedPokemonsSlice';

function Flyout() {
  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(
    (state) => state.selectedPokemons.selectedPokemons
  );

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
        <button className="inline-block bg-teal-600 text-white font-mono text-lg px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md">
          Download
        </button>
      </div>
    </div>
  );
}

export default Flyout;
