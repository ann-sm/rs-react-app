import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Pokemon } from '../../types';
import { BASE_URL, fetchPokemonData } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import Audio from '../../components/Audio/Audio';

function Details() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details');
  const page = searchParams.get('page') || '1';
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      const data = await fetchPokemonData(`${BASE_URL}/${detailsId}`);
      setPokemon(data);
    }
    fetchDetails();
  }, [detailsId]);

  function closeModal() {
    navigate(`/?page=${page}`);
  }

  return (
    <div className="p-4 fixed mr-8 bg-white w-1/4 rounded-lg shadow-md mt-4 text-left">
      {!pokemon ? (
        <Loader />
      ) : (
        <div>
          <div className="relative pb-[100%] bg-linear-to-br from-teal-50 to-blue-50 mb-4">
            {pokemon.image ? (
              <img
                src={pokemon.image}
                alt={`${pokemon.name} image`}
                className=" absolute w-full h-full object-contain p-4"
              ></img>
            ) : (
              <div className="absolute flex h-full w-full items-center justify-center">
                <p className="text-lg font-mono text-gray-500">
                  No image available
                </p>
              </div>
            )}
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            ×
          </button>
          <div className="flex gap-4 items-center justify-between">
            <h2 className="text-xl font-accent font-bold text-teal-700 capitalize mb-2">
              {pokemon.name}
            </h2>
            {pokemon.cry && <Audio cry={pokemon.cry} />}
          </div>
          <p className="font-mono text-md text-gray-600 mb-1">
            types: {pokemon.types.join(', ') || 'n/a'}
          </p>
          <p className="font-mono text-md text-gray-600 mb-1">
            abilities: {pokemon.abilities.join(', ') || 'n/a'}
          </p>
          <p className="font-mono text-md text-gray-600 mb-1">
            height: {pokemon.height || 'n/a'}
          </p>
          <p className="font-mono text-md text-gray-600 mb-2">
            weight: {pokemon.weight || 'n/a'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Details;
