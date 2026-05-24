import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsSlice from '../store/selectedPokemonsSlice';

export const createTestStore = () => {
  return configureStore({
    reducer: {
      selectedPokemons: selectedPokemonsSlice,
    },
  });
};
