import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SubmitedData } from '../types';

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
