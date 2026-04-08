import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isWithinInterval, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Curated 12 distinct nature images for every month
const MONTH_IMAGES = {
  0: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1600&h=800", // Jan: Snow
  1: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1600&h=800", // Feb: Winter forest
  2: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=1600&h=800", // Mar: Blossoms
  3: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600&h=800", // Apr: Valley
  4: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600&h=800", // May: Green forest
  5: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600&h=800", // Jun: Mountain lake
  6: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1600&h=800", // Jul: Green meadows
  7: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600&h=800", // Aug: Sunset field
  8: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1600&h=800", // Sep: Autumn mountains
  9: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&q=80&w=1600&h=800", // Oct: Fall colors
  10: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&q=80&w=1600&h=800", // Nov: Misty forest
  11: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1600&h=800", // Dec: Winter mountains
};

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('calendar-notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [binderCount, setBinderCount] = useState(24);

  useEffect(() => {
    const handleResize = () => {
      setBinderCount(window.innerWidth < 640 ? 12 : 24);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes));
  }, [notes]);

  const handleDateClick = (day) => {
    // Block dates before today
    if (isBefore(day, startOfDay(new Date()))) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else {
      if (day < selectedRange.start) {
        setSelectedRange({ start: day, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: day });
      }
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const addNote = (dateKey, text) => {
    setNotes(prev => ({ ...prev, [dateKey]: text }));
  };

  return (
    <div className="app-container">
      <div className="wall-calendar-wrapper">
        <SpiralBinder count={binderCount} />
        <div className="calendar-page">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentDate.getMonth()}
              className="calendar-inner-content"
              initial={{ rotateX: -90, opacity: 0, transformOrigin: "top" }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0, transformOrigin: "bottom" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <HeroSection currentDate={currentDate} nextMonth={nextMonth} prevMonth={prevMonth} />
              <div className="main-layout">
                <NotesSection 
                  notes={notes} 
                  addNote={addNote} 
                  focusedDate={selectedRange.end || selectedRange.start} 
                />
                <CalendarGrid 
                  currentDate={currentDate} 
                  selectedRange={selectedRange} 
                  handleDateClick={handleDateClick}
                  notes={notes}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SpiralBinder = ({ count }) => (
  <div className="spiral-binder">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="spiral-ring">
        <div className="ring-metal"></div>
      </div>
    ))}
  </div>
);

const HeroSection = ({ currentDate, nextMonth, prevMonth }) => {
  const monthName = format(currentDate, 'MMMM');
  const year = format(currentDate, 'yyyy');
  const imageUrl = MONTH_IMAGES[currentDate.getMonth()];

  return (
    <div className="hero-section">
      <div className="hero-image-container">
        <img src={imageUrl} alt={monthName} className="hero-image" />
        <div className="hero-slant-overlay"></div>
        <div className="hero-content">
          <div className="month-badge-card">
            <p className="year-text">{year}</p>
            <h1 className="month-text">{monthName}</h1>
          </div>
          <div className="calendar-nav">
            <button onClick={prevMonth} className="nav-btn"><ChevronLeft size={24} /></button>
            <button onClick={nextMonth} className="nav-btn"><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

      const isBeforeToday = isBefore(day, startOfDay(new Date()));

      days.push(
        <div
          className={`day-cell ${
            !isSameMonth(day, monthStart) ? "off-month" : 
            isSameDay(day, new Date()) ? "is-today" : ""
          } ${isSelected ? "selected" : ""} ${isInRange ? "in-range" : ""} ${isBeforeToday ? "is-blocked" : ""}`}
          key={day.toString()}
          onClick={() => !isBeforeToday && handleDateClick(cloneDay)}
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

const NotesSection = ({ notes, addNote, focusedDate }) => {
  const [text, setText] = useState('');
  const dateKey = focusedDate ? format(focusedDate, "yyyy-MM-dd") : null;
  const label = focusedDate ? format(focusedDate, "MMMM d") : "Notes";

  useEffect(() => {
    if (dateKey && notes[dateKey]) {
      setText(notes[dateKey]);
    } else {
      setText('');
    }
  }, [dateKey, notes]);

  const onSave = () => {
    if (dateKey) addNote(dateKey, text);
  };

  return (
    <div className="notes-section">
      <div className="notes-header">
        <Edit3 size={20} className="icon" />
        <h2>{label}</h2>
      </div>
      <div className="notes-body">
        <textarea
          placeholder="New note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!dateKey}
        />
        <button 
          className="save-note-btn" 
          onClick={onSave}
          disabled={!dateKey || !text.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default App;
