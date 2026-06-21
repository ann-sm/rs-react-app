'use server';

import Audio from '../Audio/Audio';
import CloseButton from '../CloseButton/CloseButton';
import { getPokemonDetails } from '../../actions/pokemonActions';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

type DetailsProps = {
  pokemonId: string;
};

const Details = async ({ pokemonId }: DetailsProps) => {
  const t = await getTranslations('details');
  const pokemon = await getPokemonDetails(pokemonId);

  if (!pokemon) {
    return (
      <div className="p-4 fixed mr-8 bg-white dark:bg-cyan-900 w-1/4 rounded-lg shadow-md mt-4 text-left">
        <CloseButton />
        <p className="text-gray-500 font-mono mt-10">{`${t('notFound')} ${pokemonId}`}</p>
      </div>
    );
  }

  return (
    <div className="p-4 fixed mr-8 bg-white dark:bg-cyan-900 w-1/4 rounded-lg shadow-md mt-4 text-left">
      <div className="relative pb-[100%] bg-linear-to-br from-teal-50 to-blue-50 dark:from-slate-500 dark:to-mist-500 mb-4">
        {pokemon.image ? (
          <Image
            src={pokemon.image}
            alt={`${pokemon.name} image`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className=" absolute w-full h-full object-contain p-4"
          ></Image>
        ) : (
          <div className="absolute flex h-full w-full items-center justify-center">
            <p className="text-lg font-mono text-gray-500">
              {t('noImage')}
            </p>
          </div>
        )}
      </div>
      <CloseButton />
      <div className="flex gap-4 items-center justify-between">
        <h2 className="text-xl font-accent font-bold text-teal-700 dark:text-green-200 capitalize mb-2">
          {pokemon.name}
        </h2>
        {pokemon.cry && <Audio cry={pokemon.cry} />}
      </div>
      <p className="font-mono text-md text-gray-600 dark:text-gray-300 mb-1">
        {t('types')}: {pokemon.types.join(', ') || 'n/a'}
      </p>
      <p className="font-mono text-md text-gray-600 dark:text-gray-300 mb-1">
       {t('abilities')}: {pokemon.abilities.join(', ') || 'n/a'}
      </p>
      <p className="font-mono text-md text-gray-600 dark:text-gray-300 mb-1">
        {t('height')}: {pokemon.height || 'n/a'}
      </p>
      <p className="font-mono text-md text-gray-600 dark:text-gray-300 mb-2">
        {t('weight')}: {pokemon.weight || 'n/a'}
      </p>
    </div>
  );
};

export default Details;
