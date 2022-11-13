import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Exit } from '../icons/exit.svg';
import './Calender.scss';
import park from './park.jpg';
import { getCalendarData } from '../api/record';
import { DateType } from './CalendarType';
import {Certification} from '../../pages/post/RecordCertificationPage';

interface CalenderProps {
  closeCalender: () => void;
  isRoom: boolean;
  roomId?: string;
}

Calender.defaultProps = {
  roomId: 0,
};

function Calender() {
  const userId = useSelector((state:any)=>state.persist.user.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dateList, setDateList] = useState<DateType[]>([]);
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

  useEffect(() => {
    getCalendarData(
      userId,
      (response: AxiosResponse) => {
        const { code, data } = response.data;
        setDateList(data);
      },
      dispatch,
    );
  }, []);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({block:'end'});
  },[dateList]);

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

    const datesElement = dates.map((date, i) => {
      let rdate: string | number = date;
      if (date < 10) {
        rdate = date.toString();
        rdate = `0${date}`;
      }
      const condition = i >= firstDateIndex && i <= lastDateIndex;
      const id = condition ? `${currentYear}-${currentMonth}-${rdate}` : `f${currentYear}-${currentMonth}-${rdate}`;

      let achieve = 0;
      let isCertificated = false;
      let imageSrc;
      // let dateId;
      dateList.forEach((date) => {
        if (date.date === id) {
          isCertificated = true;
          imageSrc = date.dateList[0].photoUrl;
          achieve = date.isAchievements;
          console.log(date);
        }
      });

      return (
        <div
          key={id}
          className={classNames('date-day', { able: condition, circle: isCertificated })}
          id={id}
          aria-hidden="true"
          onClick={
            isCertificated
              ? () => {
                // navigate('/record/certs',{state:datel})
                }
              : undefined
          }
        >
          {date}
          {achieve > 0 && <div className='date-day-achieve' />}
          {isCertificated && <img src={imageSrc} alt="park" className="date-day-after" />}
        </div>
      );
    });

    return { datesElement, currentYear, currentMonth };
  };

  const tempUserSignDate = '2022-05-01';

  const getMonthDiff = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const startYear = new Date(tempUserSignDate).getFullYear();
    const startMonth = new Date(tempUserSignDate).getMonth();

    return (currentYear - startYear) * 12 + (currentMonth - startMonth);
  };

  const diff = getMonthDiff() + 1;

  const monthArray: number[] = [];

  for (let i = 0; i < diff; i += 1) {
    monthArray.push(-i);
  }

  const datesElement = monthArray.map((i) => {
    console.log(monthArray.length + i);
    const element = getDateContext(-(monthArray.length + i) + 1);
    const weekDay = (
      <div className="day-header">
        <div className="day sun">일</div>
        <div className="day">월</div>
        <div className="day">화</div>
        <div className="day">수</div>
        <div className="day">목</div>
        <div className="day">금</div>
        <div className="day">토</div>
      </div>
    );
    return (
      <>
        <div className="current-month">{`${element.currentYear}.${element.currentMonth}`}</div>
        {weekDay}
        <div className="date">{element.datesElement}</div>
      </>
    );
  });

  return (
    <div className="calender">
      <div className="date-wrapper" ref={scrollRef}>
        {datesElement}
        {/* <div className="current-month">{`${datesElement0.currentYear}.${datesElement0.currentMonth}`}</div>
        {weekDay}
        <div className="date">{datesElement0.datesElement}</div>
        <div className="current-month">{`${datesElement1.currentYear}.${datesElement1.currentMonth}`}</div>
        {weekDay}
        <div className="date">{datesElement1.datesElement}</div> */}
      </div>
    </div>
  );
}

export default Calender;
