import Card from '../Card/Card';
import type { Pokemon } from '../../common/types';
import { useTranslations } from 'next-intl';

type CardListProps = {
  pokemons: Pokemon[];
};

const CardList = ({ pokemons }: CardListProps) => {
  const t = useTranslations('cardlist');

  if (!pokemons) {
    return;
  }
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4 px-6 h-full">
      {pokemons.length === 0 ? (
        <div className="col-span-full flex justify-center items-center">
          <p className="text-gray-500 dark:text-gray-300 text-xl font-mono">
            {t('noResults')}
          </p>
        </div>
      ) : (
        <>
          {pokemons.map((item, index) => {
            return <Card key={item.id} data={item} index={index} />;
          })}
        </>
      )}
    </div>
  );
};

export default CardList;
