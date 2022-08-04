import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { addReviewAction } from '../api-actions';
import { AddReviewProcess } from '../../types/state';

const initialState: AddReviewProcess = {
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
      .addCase(addReviewAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isDataLoading = false;
      });
  }
});
