import { extendMoment } from "moment-range";
import Moment from "moment";

export const mapDays = (data) => {
  const moment = extendMoment(Moment);
  const start = moment(new Date(Moment(Date.now()).startOf('year')));
  const end   = moment(new Date(Moment(Date.now()).endOf('year')));
  const range = moment.range(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
  const days = Array.from(range.by('day'));
  const result = days.map(day => {
    let resultDate = null;
    const formatDate = day.format('YYYY-MM-DD');
    data.forEach(day => {
      if (day.date === formatDate) resultDate = day;
    });
    if (!resultDate) resultDate = { date: formatDate ,successful: null };
    return resultDate;
  });
  return result;
};