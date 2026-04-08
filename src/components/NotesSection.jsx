import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit3 } from 'lucide-react';

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

export default NotesSection;
