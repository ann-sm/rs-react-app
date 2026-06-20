import { NextResponse } from 'next/server';
import type { Pokemon } from '../../../common/types';

const POST = async(request: Request) => {
  try {
    const { selectedPokemons }: { selectedPokemons: Pokemon[] } = await request.json();

    if (!selectedPokemons || selectedPokemons.length === 0) {
      return NextResponse.json({ error: 'No items selected' }, { status: 400 });
    }

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

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${selectedPokemons.length}_items.csv"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to compile server CSV' }, { status: 500 });
  }
}

export { POST };