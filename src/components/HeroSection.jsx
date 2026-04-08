import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default HeroSection;
