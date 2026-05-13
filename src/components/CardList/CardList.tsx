import Card from '../Card/Card';
import type { CardListProps } from '../../types';

function CardList({ pokemons, isLoading }: CardListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-">
        <div className="relative h-18 w-18 animate-spin rounded-full border-4 border-black bg-linear-to-b from-red-500 from-50% to-white to-50%">
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black bg-gray-100"></div>
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-black"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-4 px-6">
      {pokemons.length === 0 ? (
        <div className="col-span-full flex justify-center items-center">
          <p className="text-gray-500 text-xl font-mono">
            No pokemons found. Try something different!
          </p>
        </div>
      ) : (
        <>
          {pokemons.map((item) => {
            return <Card key={item.id} data={item} />;
          })}
        </>
      )}
    </div>
  );
}

export default CardList;
