export interface PokemonResponse {
  name: string;
  url: string;
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  cries: {
    latest: string;
  };
}

export interface Pokemon extends Omit<
  PokemonData,
  'sprites' | 'abilities' | 'types' | 'cries'
> {
  image: string;
  abilities: string[];
  types: string[];
  cry: string;
}
