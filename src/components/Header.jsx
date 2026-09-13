import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Bell, Plus, ShieldAlert } from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Header = ({ onOpenNewPatient, onOpenNewAppt }) => {
  const { theme, toggleTheme, searchQuery, setSearchQuery, patients } = useHospital();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const criticalCount = patients.filter(p => p.triageLevel === 'Critical').length;

  return (
    <header className="top-header">
      <div className="search-box">
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder="Quick search patient, doctor, diagnosis, room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-actions">
        {criticalCount > 0 && (
          <div className="emergency-pill">
            <span className="pulse-dot"></span>
            <ShieldAlert size={14} />
            <span>{criticalCount} Critical Patient{criticalCount > 1 ? 's' : ''}</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          <span>{time}</span>
        </div>

        <button className="icon-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="btn btn-secondary btn-sm" onClick={onOpenNewAppt}>
          <Plus size={16} />
          <span>Book Appointment</span>
        </button>

        <button className="btn btn-primary btn-sm" onClick={onOpenNewPatient}>
          <Plus size={16} />
          <span>New Intake</span>
        </button>
      </div>
    </header>
  );
};
