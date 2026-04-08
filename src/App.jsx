import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, isBefore, startOfDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import SpiralBinder from './components/SpiralBinder';
import HeroSection from './components/HeroSection';
import CalendarGrid from './components/CalendarGrid';
import NotesSection from './components/NotesSection';
import './App.css';

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

export default App;
