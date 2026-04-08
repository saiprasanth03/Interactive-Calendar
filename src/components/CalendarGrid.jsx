import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isWithinInterval, isBefore, startOfDay } from 'date-fns';

const CalendarGrid = ({ currentDate, selectedRange, handleDateClick, notes }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const dateKey = format(day, "yyyy-MM-dd");
      const isSelected = (selectedRange.start && isSameDay(day, selectedRange.start)) || 
                         (selectedRange.end && isSameDay(day, selectedRange.end));
      const isInRange = selectedRange.start && selectedRange.end && 
                        isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end });
      const hasNote = notes[dateKey];
      const isBlocked = isBefore(day, startOfDay(new Date()));

      days.push(
        <div
          className={`day-cell ${
            !isSameMonth(day, monthStart) ? "off-month" : 
            isSameDay(day, new Date()) ? "is-today" : ""
          } ${isSelected ? "selected" : ""} ${isInRange ? "in-range" : ""} ${isBlocked ? "is-blocked" : ""}`}
          key={day.toString()}
          onClick={() => !isBlocked && handleDateClick(cloneDay)}
        >
          <span className="date-number">{format(day, "d")}</span>
          {hasNote && <div className="note-dot"></div>}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="calendar-row" key={day.toString()}>{days}</div>);
    days = [];
  }

  return (
    <div className="calendar-grid-container">
      <div className="weekdays-row">
        {weekdays.map(d => <div className="weekday" key={d}>{d}</div>)}
      </div>
      <div className="dates-rows">{rows}</div>
    </div>
  );
};

export default CalendarGrid;
