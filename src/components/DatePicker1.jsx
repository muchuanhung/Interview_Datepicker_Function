// (Date Range Component for current month)
import React, { useState } from "react";
import "./DatePicker1.css";

const DatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // Caculate Range
  const startMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
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
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  // Next/Prev Button
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

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

  // 渲染日曆 ＆ 非當前月份判斷
  const renderDay = (date) => {
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
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
        } ${isCurrentMonth ? "" : "non-current"}`}
        onClick={() => isCurrentMonth && handleDayClick(date)}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="date-picker">
     <h4>Date Range Component for cross months</h4>
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {currentMonth.getFullYear()}{" "}
          {currentMonth.toLocaleString("default", { month: "long" })}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">{days.map((day) => renderDay(day))}</div>
      <div>
        {startDate ? startDate.toLocaleDateString() : "Start Date"} ~
        {endDate ? endDate.toLocaleDateString() : "End Date"}
      </div>
    </div>
  );
};

export default DatePicker;
