import { describe, expect, it } from 'vitest';
import { mockCard, mockCard2 } from '../__tests__/mocks';
import selectedPokemonsReducer, {
  togglePokemon,
  unselectAllPokemons,
} from './selectedPokemonsSlice';

describe('selectedItems slice', () => {
  it('should return the initial state', () => {
    const initialState = undefined;
    const action = { type: 'unknown' };
    const state = selectedPokemonsReducer(initialState, action);

    expect(state).toEqual({ selectedPokemons: [] });
  });

  it('should add a pokemon when it is not already selected', () => {
    const initialState = { selectedPokemons: [] };
    const action = togglePokemon(mockCard.data);
    const state = selectedPokemonsReducer(initialState, action);

    expect(state.selectedPokemons).toHaveLength(1);
    expect(state.selectedPokemons[0]).toEqual(mockCard.data);
  });

  it('should remove a pokemon when it is already selected', () => {
    const initialState = { selectedPokemons: [mockCard.data, mockCard2.data] };
    const action = togglePokemon(mockCard.data);
    const state = selectedPokemonsReducer(initialState, action);

    expect(state.selectedPokemons).toHaveLength(1);
    expect(state.selectedPokemons).toEqual([mockCard2.data]);
  });

  it('should unselect all items', () => {
    const initialState = { selectedPokemons: [mockCard.data, mockCard2.data] };
    const action = unselectAllPokemons();
    const state = selectedPokemonsReducer(initialState, action);
    expect(state.selectedPokemons).toHaveLength(0);
  });
});
