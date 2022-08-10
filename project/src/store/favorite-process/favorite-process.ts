import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
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
      })
      .addCase(changeFavouriteFilmStatus.fulfilled, (state) => {
        state.isDataLoading = false;
      });
  }
});
