import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../types';

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
    removeAllPokemons: create.reducer((state) => {
      state.selectedPokemons = [];
    }),
  }),
});

export const { togglePokemon, removeAllPokemons } =
  selectedPokemonsSlice.actions;
export default selectedPokemonsSlice.reducer;
