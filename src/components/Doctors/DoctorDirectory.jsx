import React, { useState } from 'react';
import { UserCheck, Star, Calendar, Mail, Phone, MapPin, Activity } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const DoctorDirectory = ({ onOpenNewAppt }) => {
  const { doctors, updateDoctorStatus, searchQuery } = useHospital();
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', ...new Set(doctors.map(d => d.department))];

  const filteredDoctors = doctors.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'All' || d.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Duty': return <span className="badge badge-success">On Duty</span>;
      case 'In Surgery': return <span className="badge badge-critical">In Surgery</span>;
      default: return <span className="badge badge-warning">On Break</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Medical Staff & Specialist Directory</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Attending physicians, active patient loads, surgical availability, and qualifications.
          </span>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Department:</span>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`btn btn-sm ${selectedDept === dept ? 'btn-primary' : 'btn-secondary'}`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-equal-2">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: doctor.avatarColor || '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    {doctor.name.replace('Dr. ', '').charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{doctor.name}</h3>
                    <div style={{ fontSize: '0.825rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
                      {doctor.specialty}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {doctor.qualification} • {doctor.experience} Exp.
                    </div>
                  </div>
                </div>
                {getStatusBadge(doctor.status)}
              </div>

              <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.8rem' }}>
                <div style={{ flex: 1, textCenter: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Active Patients:</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{doctor.activePatients} Patients</div>
                </div>
                <div style={{ flex: 1, textCenter: 'center', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Today Queue:</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{doctor.todayAppointments} Appts</div>
                </div>
                <div style={{ flex: 1, textCenter: 'center', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Rating:</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Star size={14} fill="#f59e0b" /> {doctor.rating}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} color="var(--text-muted)" />
                  <span>{doctor.room} ({doctor.department})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="var(--text-muted)" />
                  <span>{doctor.email}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <select
                className="form-control"
                style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.775rem' }}
                value={doctor.status}
                onChange={(e) => updateDoctorStatus(doctor.id, e.target.value)}
              >
                <option value="On Duty">Set: On Duty</option>
                <option value="In Surgery">Set: In Surgery</option>
                <option value="On Break">Set: On Break</option>
              </select>

              <button className="btn btn-primary btn-sm" onClick={onOpenNewAppt}>
                <Calendar size={14} />
                <span>Book Consult</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
