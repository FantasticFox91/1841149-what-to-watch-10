import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsProcess } from '../../types/state';
import { fetchFilmsAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: FilmsProcess = {
  films: [],
  isDataLoading: false,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t find films. Please try again later.');
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isDataLoading = false;
      });
  }
});
