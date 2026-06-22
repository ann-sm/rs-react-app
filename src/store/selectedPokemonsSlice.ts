import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../common/types';

interface SelectedPokemonsState {
  selectedPokemons: Pokemon[];
}

const initialState: SelectedPokemonsState = {
  selectedPokemons: [],
};

export const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: (create) => ({
    togglePokemon: create.reducer((state, action: PayloadAction<Pokemon>) => {
      const isSelected = state.selectedPokemons.some(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (isSelected) {
        state.selectedPokemons = state.selectedPokemons.filter(
          (pokemon) => pokemon.id !== action.payload.id
        );
      } else {
        state.selectedPokemons.push(action.payload);
      }
    }),
    unselectAllPokemons: create.reducer((state) => {
      state.selectedPokemons = [];
    }),
  }),
});

export const { togglePokemon, unselectAllPokemons } =
  selectedPokemonsSlice.actions;
export default selectedPokemonsSlice.reducer;
