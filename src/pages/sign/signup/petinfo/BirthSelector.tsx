import React, { useEffect, useRef, useState } from 'react';
import './BirthSelector.scss';
import classNames from 'classnames';
import Birth from './birth';
import RightArrow from '../../../../common/icons/right-arrow.svg';

function BirthSelector(props: { changeBirth: (year: number, month: number, day: number) => void, close:()=>void }) {
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const { years, months, days, leapYear } = Birth(2000, 2022, true);
  const [dayArray, setDayArray] = useState<(number | string)[]>(days[0]);
  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const { changeBirth, close } = props;

  useEffect(() => {
    if (leapYear.includes(selectedYear)) {
      if (selectedMonth === 2) {
        days[selectedMonth - 1].splice(31, 0, 29);
      }
    }
    setDayArray(days[selectedMonth - 1]);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (selectedYear) {
      if (yearRef.current) {
        yearRef.current.scrollTop = (selectedYear - 2000) * 30;
      }
    }
    if (selectedMonth) {
      if (monthRef.current) {
        monthRef.current.scrollTop = (selectedMonth - 1) * 30;
      }
    }
    if (selectedDay) {
      if (dayRef.current) {
        dayRef.current.scrollTop = (selectedDay - 1) * 30;
      }
    }
    changeBirth(selectedYear, selectedMonth, selectedDay);
  }, [selectedYear, selectedMonth, selectedDay]);

  let key = 0;
  const yearContext = years.map((year, i) => {
    key+=1;
    if (year === '.') return <div key={`dummyYear${key}`} className="birth-item blank">.</div>;
    return (
      <div key={year} className={classNames('birth-item', { selected: year === selectedYear })}>{`${year} 년`}</div>
    );
  });

  key = 0;
  const monthContext = months.map((month, i) => {
    key+=1;
    if (month === '.') return <div key={`dummyMonth${key}`} className="birth-item blank">.</div>;
    return (
      <div key={`m${month}`} className={classNames('birth-item', { selected: month === selectedMonth })}>
        {month >= 10 ? `${month} 월` : `0${month} 월`}
      </div>
    );
  });

  key = 0;
  const dayContext = dayArray.map((day, i) => {
    key+=1;
    if (day === '.') return <div key={`dummyDay${key}`} className="birth-item blank">.</div>;
    return (
      <div key={`d${day}`} className={classNames('birth-item', { selected: day === selectedDay })}>
        {day >= 10 ? `${day} 일` : `0${day} 일`}
      </div>
    );
  });

  const yearScrollHandler = () => {
    if (yearRef.current) {
      const { scrollTop } = yearRef.current;
      const year = Math.round(scrollTop / 30) + 2000;
      setSelectedYear(year);
    }
  };

  const monthScrollHandler = () => {
    if (monthRef.current) {
      const { scrollTop } = monthRef.current;
      const month = Math.round(scrollTop / 30) + 1;
      setSelectedMonth(month);
    }
  };

  const dayScrollHandler = () => {
    if (dayRef.current) {
      const { scrollTop } = dayRef.current;
      const day = Math.round(scrollTop / 30) + 1;
      setSelectedDay(day);
    }
  };

  return (
    <div className="birth-wrapper">
      <div className='birth'>
        <div className="birth-years tab" ref={yearRef} onScroll={yearScrollHandler}>
          {yearContext}
        </div>
        <div className="birth-divider" />
        <div className="birth-months tab" ref={monthRef} onScroll={monthScrollHandler}>
          {monthContext}
        </div>
        <div className="birth-divider" />
        <div className="birth-days tab" ref={dayRef} onScroll={dayScrollHandler}>
          {dayContext}
        </div>
      </div>
      <div className="birth-button" aria-hidden="true" onClick={close}>
        다음
        <img src={RightArrow} alt="arrow" />
      </div>
    </div>
  );
}

export default BirthSelector;
