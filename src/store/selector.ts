import type { RootState } from './store';

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectSubmissions = (state: RootState) =>
  state.submissions.submissions;
