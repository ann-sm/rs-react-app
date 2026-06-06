import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SubmitedData {
  // id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  termsAccepted: boolean;
  // imageBase64: string;
  // country: string;
  submittedAt: string;
  isNew: boolean;
}

interface SubmissionsState {
  submissions: SubmitedData[];
}

const initialState: SubmissionsState = {
  submissions: [],
};

export const submissionsSlice = createSlice({
  name: 'submissionsSlice',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<SubmitedData>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;
