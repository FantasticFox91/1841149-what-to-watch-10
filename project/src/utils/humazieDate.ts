import dayjs from 'dayjs';

const dateValue = (date: string) => dayjs(date).format('YYYY-DD-MM');
const humanizedDate = (date: string) => dayjs(date).format('MMMM DD, YYYY');

export { dateValue, humanizedDate };
