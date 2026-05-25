import Card from '../Card/Card';
import type { CardListProps } from '../../types';
import Loader from '../Loader/Loader';

function CardList({ pokemons, isLoading }: CardListProps) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4 px-6 h-full">
      {pokemons.length === 0 ? (
        <div className="col-span-full flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-300 text-xl font-mono">
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
