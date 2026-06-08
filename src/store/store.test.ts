import { describe, it, expect } from 'vitest';
import { store } from './store';

describe('Redux Store Configuration', () => {
  it('should initialize with the correct default structural layout', () => {
    const initialState = store.getState();

    expect(initialState).toHaveProperty('countries');
    expect(initialState).toHaveProperty('submissions');
  });

  it('should have the correct initial internal state structure for slices', () => {
    const state = store.getState();

    expect(state.submissions).toBeDefined();
    expect(state.countries).toBeDefined();
  });

  it('should allow dispatching actions directly through the configuration', () => {
    store.dispatch({ type: '@@INIT' });

    const state = store.getState();
    expect(state.submissions).toBeDefined();
  });
});
