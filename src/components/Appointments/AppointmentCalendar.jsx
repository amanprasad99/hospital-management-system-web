import React, { useState } from 'react';
import { Calendar, Plus, Clock, User, CheckCircle2, XCircle, PlayCircle } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AppointmentCalendar = ({ onOpenNewAppt }) => {
  const { appointments, updateAppointmentStatus, searchQuery } = useHospital();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return <span className="badge badge-routine">Confirmed</span>;
      case 'In-Progress': return <span className="badge badge-urgent">In-Progress</span>;
      case 'Completed': return <span className="badge badge-success">Completed</span>;
      case 'Cancelled': return <span className="badge badge-critical">Cancelled</span>;
      default: return <span className="badge badge-muted">Scheduled</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Appointment & Clinical Triage Schedule</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Schedule patient consults, track room queues, and manage appointment progression.
          </span>
        </div>

        <button className="btn btn-primary" onClick={onOpenNewAppt}>
          <Plus size={18} />
          <span>Book New Appointment</span>
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter Status:</span>
          {['All', 'Scheduled', 'Confirmed', 'In-Progress', 'Completed', 'Cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Appt ID & Date</th>
                <th>Time Slot</th>
                <th>Patient Name</th>
                <th>Attending Doctor</th>
                <th>Department</th>
                <th>Type & Triage</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No appointments found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map(appt => (
                  <tr key={appt.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{appt.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{appt.date}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--primary-blue)' }}>
                        <Clock size={14} />
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{appt.patientName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{appt.notes}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{appt.doctorName}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem' }}>{appt.department}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{appt.type}</div>
                      <span className={`badge ${appt.triage === 'Critical' ? 'badge-critical' : appt.triage === 'Urgent' ? 'badge-urgent' : 'badge-routine'}`}>
                        {appt.triage}
                      </span>
                    </td>
                    <td>{getStatusBadge(appt.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        {appt.status !== 'In-Progress' && appt.status !== 'Completed' && (
                          <button
                            className="btn btn-secondary btn-sm"
                            title="Mark In-Progress"
                            onClick={() => updateAppointmentStatus(appt.id, 'In-Progress')}
                          >
                            <PlayCircle size={14} color="#f59e0b" />
                            <span>Start</span>
                          </button>
                        )}
                        {appt.status !== 'Completed' && (
                          <button
                            className="btn btn-secondary btn-sm"
                            title="Mark Completed"
                            onClick={() => updateAppointmentStatus(appt.id, 'Completed')}
                          >
                            <CheckCircle2 size={14} color="#10b981" />
                            <span>Complete</span>
                          </button>
                        )}
                        {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                          <button
                            className="btn btn-danger btn-sm"
                            title="Cancel Appointment"
                            onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
