import { createSlice } from '@reduxjs/toolkit';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'North Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
  ],
};

const countriesSlice = createSlice({
  name: 'countriesSlice',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
