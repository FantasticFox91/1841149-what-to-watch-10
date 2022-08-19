import { humanazeFilmDuration } from './humazie';

describe('humanazeFilm duration tests', () => {
  it('test with less than hour', () => {
    expect(humanazeFilmDuration(40)).toBe('40m');
  });

  it('test with exactly hours minutes', () => {
    expect(humanazeFilmDuration(120)).toBe('2h');
  });

  it('test with hours and minutes', () => {
    expect(humanazeFilmDuration(150)).toBe('3h 30m');
  });
});
