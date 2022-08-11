import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { addReviewAction } from '../api-actions';
import { AddReviewProcess } from '../../types/state';
import { toast } from 'react-toastify';
import { resetReviewStatus } from '../action';

const initialState: AddReviewProcess = {
  isDataLoading: false,
  reviewSubmited: false,
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
      .addCase(resetReviewStatus, (state) => {
        state.reviewSubmited = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.reviewSubmited = false;
        state.isDataLoading = false;
        toast('We can\'t send your awesome review, please try again later');
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isDataLoading = false;
        state.reviewSubmited = true;
      });
  }
});
