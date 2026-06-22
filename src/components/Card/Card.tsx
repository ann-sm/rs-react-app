'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Pokemon } from '../../common/types';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { togglePokemon } from '../../store/selectedPokemonsSlice';
import { useLocale } from 'next-intl';

type CardProps = {
  data: Pokemon;
  index: number;
};

const Card = ({ data, index }: CardProps) => {
  const { id, name, height, weight, image, abilities } = data;
  const searchParams = useSearchParams();
  const locale = useLocale();

  const page = searchParams?.get('page');
  const search = searchParams?.get('search') || '';

  const getDetailsUrl = () => {
    const params = new URLSearchParams();

    if (search) {
      params.set('search', search);
    }
    if (page) {
      params.set('page', page);
    }

    params.set('details', id.toString());
    return `/${locale}?${params.toString()}`;
  };

  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(
    (state) => state.selectedPokemons.selectedPokemons
  );

  return (
    <Link href={getDetailsUrl()} className="block h-full min-w-0">
      <article className="relative flex flex-col bg-white dark:bg-cyan-900 rounded-lg shadow-md h-full w-full min-w-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left">
        <div className="relative pb-[100%] bg-linear-to-br from-teal-50 to-blue-50 dark:from-slate-500 dark:to-mist-500">
          {image ? (
            <Image
              src={image}
              alt={`${name} image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
              className="absolute inset-0 w-full h-full object-contain p-4"
            ></Image>
          ) : (
            <div className="absolute flex w-full h-full items-center justify-center">
              <p className="text-lg font-mono text-gray-500">
                No image available
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-accent font-semibold text-teal-700 dark:text-green-200 capitalize mb-2">
            {name}
          </h3>
          <p className="font-mono text-md font-semibold text-gray-600 dark:text-gray-300 mb-1">
            {abilities.join(',') || 'n/a'}
          </p>
          <p className="font-mono text-md text-gray-600 dark:text-gray-300 mb-1">
            height: {height || 'n/a'}
          </p>
          <p className="font-mono text-md text-gray-600 dark:text-gray-300">
            weight: {weight || 'n/a'}
          </p>
        </div>
        <input
          type="checkbox"
          id={`pokemon-${id}`}
          checked={selectedPokemons.some((pokemon) => pokemon.id === id)}
          onChange={() => dispatch(togglePokemon(data))}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 w-5 h-5 accent-yellow-500 hover:cursor-pointer"
        />
      </article>
    </Link>
  );
};

export default Card;
