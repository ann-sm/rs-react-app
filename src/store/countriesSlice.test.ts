import { describe, it, expect } from 'vitest';
import countriesReducer from './countriesSlice';

describe('countriesSlice', () => {
  it('should return initial state with countries list', () => {
    const initialState = countriesReducer(undefined, { type: 'unknown' });
    expect(initialState.countries).toContain('Germany');
    expect(initialState.countries).toContain('France');
    expect(initialState.countries).toHaveLength(48);
  });
});
