import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AddReviewProcess } from '../../types/state';
import { addReviewAction } from '../api-actions';

const initialState: AddReviewProcess = {
  error: null,
  isDataLoading: false,
};

export const addReviewProcess = createSlice({
  name: NameSpace.AddReview,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addReviewAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(addReviewAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isDataLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isDataLoading = false;
      });
  }
});
