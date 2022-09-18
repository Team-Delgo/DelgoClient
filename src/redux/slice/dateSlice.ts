import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  time: '',
  weekDay: '',
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate() {
      const date = new Date();
      const year = date.getFullYear();
      const originalMonth = date.getMonth() + 1;
      const originalDay = date.getDate();
      const originalHours = date.getHours();
      const originalMinutes = date.getMinutes();

      const month = `0${originalMonth}`.slice(-2);
      const day = `0${originalDay}`.slice(-2);
      const dateStr = `${year}-${month}-${day}`;

      const hours = `0${originalHours}`.slice(-2);
      const minutes = `0${originalMinutes}`.slice(-2);
      const timeStr = `${hours}:${minutes}`;

      const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
      const weekDetailDay = weekDay[date.getDay()];
      return {
        date: dateStr,
        time: timeStr,
        weekDay: weekDetailDay,
      };
    },
    setInit() {
      return {
        ...initialState,
      };
    },
  },
});

export const dateAction = dateSlice.actions;
export default dateSlice.reducer;
