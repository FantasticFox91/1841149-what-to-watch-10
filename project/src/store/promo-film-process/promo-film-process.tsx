import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PromoFilmProcess } from '../../types/state';
import { fetchPromoAction } from '../api-actions';


const initialState: PromoFilmProcess = {
  promoFilm: null,
  isDataLoading: false,
};

export const promoFilmProcess = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoading = false;
      });
  }
});
