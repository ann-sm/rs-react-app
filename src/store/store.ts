import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from './selectedPokemonsSlice';
import { pokemonApi } from '../services/pokemonApi';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
