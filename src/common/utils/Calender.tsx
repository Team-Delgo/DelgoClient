import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Exit } from '../icons/exit.svg';
import './Calender.scss';
import park from "./park.jpg";

interface CalenderProps {
  closeCalender: () => void;
  isRoom: boolean;
  roomId?: string;
}

Calender.defaultProps = {
  roomId: 0,
};

function Calender() {
  const dispatch = useDispatch();

  const getNextYear = (currentMonth: number, currentYear: number, add: number) => {
    if (currentMonth + add > 12) {
      return currentYear + 1;
    }
    return currentYear;
  };

  const getToday = () => {
    const date = new Date();
    let today = date.toString().slice(8, 10);
    if (today[0] === '0') {
      today = today.slice(1);
    }
    return today;
  };



  const getDateContext = (prev: number) => {
    const date = new Date();

    let currentYear = date.getFullYear();
    let currentMonth: string | number = date.getMonth() + prev;

    currentYear = getNextYear(currentMonth, currentYear, prev);

    const prevLast = new Date(currentYear, currentMonth, 0);
    const thisLast = new Date(currentYear, currentMonth + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate();
    const thisLastDay = thisLast.getDay();

    const thisDates: number[] = [];
    const prevDates: number[] = [];
    const nextDates: number[] = [];

    for (let i = 1; i <= thisLastDate; i += 1) {
      thisDates.push(i);
    }

    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i += 1) {
        prevDates.unshift(prevLastDate - i);
      }
    }

    for (let i = 1; i < 7 - thisLastDay; i += 1) {
      nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(thisLastDate);

    currentMonth += 1;

    if (currentMonth < 10) {
      currentMonth = currentMonth.toString();
      currentMonth = `0${currentMonth}`;
    }

    let even = false;

    const datesElement = dates.map((date, i) => {
      let rdate: string | number = date;
      if (date < 10) {
        rdate = date.toString();
        rdate = `0${date}`;
      }
      even = !even;
      const condition = i >= firstDateIndex && i <= lastDateIndex;
      const keyCondition = condition ? 'this' : 'other';
      const id = `${currentYear}${currentMonth}${rdate} ${keyCondition}`;

      

      return (
        <div
          key={id}
          className={classNames(
            'date-day',
            { able: condition, circle: even},
          )}
          id={id}
          aria-hidden="true"
        >
          {date}
          {even && <img src={park} alt="park" className='date-day-after' />}

        </div>
      );
    });

    return { datesElement, currentYear, currentMonth };
  };

  const datesElement0 = getDateContext(-1);
  const datesElement1 = getDateContext(0);


  const weekDay = <div className="day-header">
  <div className="day sun">일</div>
  <div className="day">월</div>
  <div className="day">화</div>
  <div className="day">수</div>
  <div className="day">목</div>
  <div className="day">금</div>
  <div className="day">토</div>
</div>

  console.log(process.env.REACT_APP_NCP_CLIENT_ID);

  return (
    <div className="calender">
      
      <div className="date-wrapper">
        
        <div className="current-month">{`${datesElement0.currentYear}.${datesElement0.currentMonth}`}</div>
        {weekDay}
        <div className="date">{datesElement0.datesElement}</div>
        <div className="current-month">{`${datesElement1.currentYear}.${datesElement1.currentMonth}`}</div>
        {weekDay}
        <div className="date">{datesElement1.datesElement}</div>
      </div>
    </div>
  );
}

export default Calender;
