import { filmProcess } from './film-process';
import { FilmProcess } from '../../types/state';
import { fetchFilm, fetchFilmComments, fetchPromoAction, fetchSimilarFilms } from '../api-actions';
import toastify from 'react-toastify';
import { makeFakeFilm, makeFakeFilmComment } from '../../utils/mock';
import { setFilm } from '../action';

const film = makeFakeFilm();
const filmComment = makeFakeFilmComment();

describe('Reducer: addReviewProcess', () => {
  let state: FilmProcess;
  it('Without additional parameters should return initial state', () => {
    expect(filmProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
  });

  it('Should set film to state and set isDataLoading to false', () => {
    expect(filmProcess.reducer(state, setFilm(film)))
      .toEqual({promoFilm: null, film: film, filmComments: [], similarFilms: [], isDataLoading: false});
  });

  describe('fetchFilm test', () => {
    it('Should set isDataLoading to true while waiting results from server', () => {
      expect(filmProcess.reducer(state, { type: fetchFilm.pending.type}))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: true});
    });

    it('Should set isDataLoading to false and set film if fetchFilm fulfilled', () => {
      expect(filmProcess.reducer(state, { type: fetchFilm.fulfilled.type, payload: film }))
        .toEqual({promoFilm: null, film: film, filmComments: [], similarFilms: [], isDataLoading: false});
    });

    it('Should set isDataLoading to false if fetchFilm rejected', () => {
      expect(filmProcess.reducer(state, { type: fetchFilm.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
    });

    it('Should invoke toast if fetchFilm rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(filmProcess.reducer(state, { type: fetchFilm.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t find film. Please try again later.');
    });
  });

  describe('fetchSimilarFilms test', () => {
    it('Should set isDataLoading to true while waiting results from server', () => {
      expect(filmProcess.reducer(state, { type: fetchSimilarFilms.pending.type}))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: true});
    });

    it('Should set isDataLoading to false and set film if fetchSimilarFilms fulfilled', () => {
      expect(filmProcess.reducer(state, { type: fetchSimilarFilms.fulfilled.type, payload: film }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: film, isDataLoading: false});
    });

    it('Should set isDataLoading to false if fetchSimilarFilms rejected', () => {
      expect(filmProcess.reducer(state, { type: fetchSimilarFilms.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
    });

    it('Should invoke toast if fetchSimilarFilms rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(filmProcess.reducer(state, { type: fetchSimilarFilms.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t find similar films. Please try again later.');
    });
  });

  describe('fetchFilmComments test', () => {
    it('Should set isDataLoading to true while waiting results from server', () => {
      expect(filmProcess.reducer(state, { type: fetchFilmComments.pending.type}))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: true});
    });

    it('Should set isDataLoading to false and set film if fetchFilmComments fulfilled', () => {
      expect(filmProcess.reducer(state, { type: fetchFilmComments.fulfilled.type, payload: filmComment }))
        .toEqual({promoFilm: null, film: null, filmComments: filmComment, similarFilms: [], isDataLoading: false});
    });

    it('Should set isDataLoading to false if fetchFilmComments rejected', () => {
      expect(filmProcess.reducer(state, { type: fetchFilmComments.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
    });

    it('Should invoke toast if fetchFilmComments rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(filmProcess.reducer(state, { type: fetchFilmComments.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t find comments for this film. Please try again later.');
    });
  });

  describe('fetchPromoAction test', () => {
    it('Should set isDataLoading to true while waiting results from server', () => {
      expect(filmProcess.reducer(state, { type: fetchPromoAction.pending.type}))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: true});
    });

    it('Should set isDataLoading to false and set film if fetchPromoAction fulfilled', () => {
      expect(filmProcess.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: film }))
        .toEqual({promoFilm: film, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
    });

    it('Should set isDataLoading to false if fetchPromoAction rejected', () => {
      expect(filmProcess.reducer(state, { type: fetchPromoAction.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
    });

    it('Should invoke toast if fetchPromoAction rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(filmProcess.reducer(state, { type: fetchPromoAction.rejected.type }))
        .toEqual({promoFilm: null, film: null, filmComments: [], similarFilms: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t find promo film. Please try again later.');
    });
  });
});
