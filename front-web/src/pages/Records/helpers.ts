import moment from 'moment';

export const formatDate = (date: string) =>
  moment(date).format('DD/MM/YY HH:mm');
