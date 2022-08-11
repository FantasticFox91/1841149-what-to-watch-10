import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { toast } from 'react-toastify';
import { FavoriteFilmsProcess } from '../../types/state';
import { changeFavouriteFilmStatus, fetchFavouriteFilms } from '../api-actions';

const initialState: FavoriteFilmsProcess = {
  favoriteFilms: [],
  isDataLoading: false,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavouriteFilms.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavouriteFilms.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t find your favorite. Please try again later.');
      })
      .addCase(fetchFavouriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isDataLoading = false;
      })
      .addCase(changeFavouriteFilmStatus.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(changeFavouriteFilmStatus.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t update movie. Please try again later.');
      })
      .addCase(changeFavouriteFilmStatus.fulfilled, (state) => {
        state.isDataLoading = false;
      });
  }
});
