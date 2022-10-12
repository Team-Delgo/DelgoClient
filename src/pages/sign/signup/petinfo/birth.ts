import React from 'react';

function Birth(yearStart: number, yearEnd: number, forSelector: boolean) {
  let years: (number | string)[] = [];
  let months: (number | string)[] = [];
  const days: (number | string)[][] = [];
  const leapYear = [2000, 2004, 2008, 2012, 2016, 2020];
  const day31: (number | string)[] = ['.', '.', '.'];
  const day30: (number | string)[] = ['.', '.', '.'];
  const day28: (number | string)[] = ['.', '.', '.'];

  if (forSelector) {
    years = ['.', '.', '.'];
    months = ['.', '.', '.'];
  }

  for (let i = yearStart; i <= yearEnd; i += 1) {
    years.push(i);
  }
  for (let i = 1; i <= 12; i += 1) {
    months.push(i);
  }

  for (let i = 1; i <= 31; i += 1) {
    if (i === 31) {
      day31.push(i);
    } else if (i >= 29) {
      day30.push(i);
      day31.push(i);
    } else {
      day31.push(i);
      day30.push(i);
      day28.push(i);
    }
  }

  if (forSelector) {
    for (let i = 0; i < 3; i += 1) {
      day28.push('.');
      day30.push('.');
      day31.push('.');
    }
  }
  // 1월부터 12월까지 days에 push
  days.push(day31);
  days.push(day28);
  days.push(day31);
  days.push(day30);
  days.push(day31);
  days.push(day30);
  days.push(day31);
  days.push(day31);
  days.push(day30);
  days.push(day31);
  days.push(day30);
  days.push(day31);

  if (forSelector) {
    for (let i = 0; i < 3; i += 1) {
      years.push('.');
      months.push('.');
    }
  }
  return { years, months, days, leapYear };
}

export default Birth;
