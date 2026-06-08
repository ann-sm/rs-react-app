import { describe, it, expect } from 'vitest';
import { selectCountries, selectSubmissions } from './selector';
import type { RootState } from './store';

describe('selectors', () => {
  const mockState = {
    countries: { countries: ['Germany', 'France'] },
    submissions: { submissions: [{ name: 'Test', age: 25 }] },
  } as RootState;

  it('selectCountries should return countries array', () => {
    const countries = selectCountries(mockState);
    expect(countries).toEqual(['Germany', 'France']);
  });

  it('selectSubmissions should return submissions array', () => {
    const submissions = selectSubmissions(mockState);
    expect(submissions).toEqual([{ name: 'Test', age: 25 }]);
  });
});
