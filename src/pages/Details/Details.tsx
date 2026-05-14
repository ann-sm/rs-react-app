import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Pokemon } from '../../types';
import { BASE_URL, fetchPokemonData } from '../../services/api';
import Loader from '../../components/Loader/Loader';

function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsId = searchParams.get('details');
  const page = searchParams.get('page') || '1';
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (!detailsId) {
      return;
    }

    async function fetchDetails() {
      const data = await fetchPokemonData(`${BASE_URL}/${detailsId}`);
      setPokemon(data);
    }
    fetchDetails();
  }, [detailsId]);

  function closeModal() {
    navigate(`/?page=${page}`);
  }

  if (!detailsId) {
    return null;
  }

  return (
    <div className="p-4 fixed mr-8 bg-white w-1/4 rounded-lg shadow-md mt-4 text-left">
      <button
        onClick={closeModal}
        className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
      {!pokemon ? (
        <Loader />
      ) : (
        <div>
          <img
            src={pokemon.image}
            className="w-full h-full object-contain p-4"
          ></img>
          <h2 className="text-xl font-accent font-bold text-teal-700 capitalize mb-2">
            {pokemon.name}
          </h2>
          <p className="font-mono text-md text-gray-600 mb-1">
            types: {pokemon.types.join(', ')}
          </p>
          <p className="font-mono text-md text-gray-600 mb-1">
            abilities: {pokemon.abilities.join(', ')}
          </p>
          <p className="font-mono text-md text-gray-600 mb-1">
            height: {pokemon.height}
          </p>
          <p className="font-mono text-md text-gray-600 mb-2">
            weight: {pokemon.weight}
          </p>
          <audio src={pokemon.cry} controls></audio>
        </div>
      )}
    </div>
  );
}

export default Details;
