import { Film } from '../types/films';
import { image, lorem, name, music, random, date } from 'faker';
import { ReviewData } from '../types/review-data';

const getRandomNmber = (max: number): number => Math.floor(Math.random() * max);

const getRandonFullName = () => `${name.firstName()} ${name.lastName()}`;

const randomDate = (start: Date, end: Date): number => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear();

const colors = ['#0A0A0A', '#F4A900', '#1D334A', '#015D52', '#4C514A'];

export const makeFakeFilm = (): Film => ({
  id: getRandomNmber(100),
  name: random.words(3),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: colors[getRandomNmber(colors.length)],
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: getRandomNmber(10),
  scoresCount: getRandomNmber(1000),
  director: getRandonFullName(),
  starring: [getRandonFullName(), getRandonFullName(), getRandonFullName()],
  runTime: getRandomNmber(180),
  genre: music.genre(),
  released: randomDate(new Date(1980, 0, 1), new Date()),
  isFavorite: Boolean(getRandomNmber(2)),
} as Film);

export const makeFakeFilmComment = (): ReviewData => ({
  comment: lorem.sentence(),
  date: String(date.recent()),
  id: getRandomNmber(100),
  rating: getRandomNmber(10),
  user: {
    id: getRandomNmber(100),
    name: getRandonFullName(),
  }
} as ReviewData);
