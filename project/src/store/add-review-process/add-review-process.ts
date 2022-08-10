import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { addReviewAction } from '../api-actions';
import { AddReviewProcess } from '../../types/state';
import { toast } from 'react-toastify';

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
      .addCase(addReviewAction.rejected, () => {
        toast('We can\'t send your awesome review, please try again later');
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isDataLoading = false;
      });
  }
});
