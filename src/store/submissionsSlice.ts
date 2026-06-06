import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface submitedData {
  id: string;
  type: 'Uncontrolled' | 'RHF';
  name: string;
  age: number;
  email: string;
  gender: string;
  acceptedTerms: boolean;
  imageBase64: string;
  country: string;
  submittedAt: number;
}

interface SubmissionsState {
  submissions: submitedData[];
}

const initialState: SubmissionsState = {
  submissions: [],
};

export const submissionsSlice = createSlice({
  name: 'submissionsSlice',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<submitedData>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;
