// (Date Range Component for current month)
import React, { useState } from "react";
import "./DatePicker2.css";

const DatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // Caculate Range
  const startMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const startDateToShow = new Date(startMonth);
  startDateToShow.setDate(startMonth.getDate() - startMonth.getDay());
  const endDateToShow = new Date(endMonth);
  endDateToShow.setDate(endMonth.getDate() + (6 - endMonth.getDay()));

  // Date Array
  const days = [];
  let day = new Date(startDateToShow);
  while (day <= endDateToShow) {
    if (day.getMonth() === currentMonth.getMonth()) {
      days.push(new Date(day));
    }
    day.setDate(day.getDate() + 1);
  }

  // Diable Button
  const isPrevDisabled = currentMonth.getMonth() === 0;
  const isNextDisabled = currentMonth.getMonth() === 11;

  // Handle Click function
  const handleDayClick = (date) => {
    const dateTimestamp = date.getTime();
    const startTimestamp = startDate ? startDate.getTime() : null;
    const endTimestamp = endDate ? endDate.getTime() : null;

    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (
      dateTimestamp === startTimestamp ||
      (dateTimestamp > startTimestamp && !endDate)
    ) {
      setEndDate(date);
    } else if (dateTimestamp < startTimestamp) {
      setStartDate(date);
      setEndDate(null);
    } else if (endTimestamp && dateTimestamp > endTimestamp) {
      setStartDate(date);
      setEndDate(null);
    }
  };

  // Render Date
  const renderDay = (date) => {
    const isStart =
      startDate && date.toDateString() === startDate.toDateString();
    const isEnd = endDate && date.toDateString() === endDate.toDateString();
    const isInRange =
      startDate && endDate && date > startDate && date < endDate;

    return (
      <div
        key={date}
        className={`day ${isStart ? "start" : ""} ${isEnd ? "end" : ""} ${
          isInRange ? "range" : ""
        }`}
        onClick={() => handleDayClick(date)}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="date-picker">
      <h4>Date Range Component for current month</h4>
      <div className="header">
        <button disabled={isPrevDisabled}>&lt;</button>
        <div>
          {currentMonth.getFullYear()}{" "}
          {currentMonth.toLocaleString("default", { month: "long" })}
        </div>
        <button disabled={isNextDisabled}>&gt;</button>
      </div>
      <div className="days">{days.map((day) => renderDay(day))}</div>
    </div>
  );
};

export default DatePicker;
