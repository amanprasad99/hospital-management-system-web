import React, { useState } from 'react';
import { Search, Plus, Eye, HeartPulse, Activity, User } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const PatientList = ({ onSelectPatient, onOpenNewPatient }) => {
  const { patients, searchQuery } = useHospital();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTriage, setFilterTriage] = useState('All');

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesTriage = filterTriage === 'All' || p.triageLevel === filterTriage;

    return matchesSearch && matchesStatus && matchesTriage;
  });

  const getTriageBadge = (level) => {
    switch (level) {
      case 'Critical': return <span className="badge badge-critical">Critical</span>;
      case 'Urgent': return <span className="badge badge-urgent">Urgent</span>;
      default: return <span className="badge badge-routine">Routine</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Electronic Health Records (EHR)</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Patient roster, real-time vitals monitoring, lab reports, and clinical history.
          </span>
        </div>

        <button className="btn btn-primary" onClick={onOpenNewPatient}>
          <Plus size={18} />
          <span>New Patient Registration</span>
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Care Status:</span>
            {['All', 'Inpatient', 'Outpatient', 'Discharged'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-secondary'}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Triage Urgency:</span>
            {['All', 'Critical', 'Urgent', 'Routine'].map(triage => (
              <button
                key={triage}
                onClick={() => setFilterTriage(triage)}
                className={`btn btn-sm ${filterTriage === triage ? 'btn-primary' : 'btn-secondary'}`}
              >
                {triage}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Patient ID & Name</th>
                <th>Age / Gender</th>
                <th>Triage Level</th>
                <th>Care Type</th>
                <th>Department & Room</th>
                <th>Primary Diagnosis</th>
                <th>Current Vitals</th>
                <th>Attending Doctor</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No patient records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPatients.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.id}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{p.age} yrs / {p.gender}</span>
                      <div style={{ fontSize: '0.725rem', color: 'var(--primary-blue)', fontWeight: 600 }}>{p.bloodGroup}</div>
                    </td>
                    <td>{getTriageBadge(p.triageLevel)}</td>
                    <td>
                      <span className={`badge ${p.status === 'Inpatient' ? 'badge-urgent' : 'badge-muted'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{p.department}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.room}</div>
                    </td>
                    <td>
                      <div style={{ maxWidth: '200px', fontSize: '0.825rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={p.diagnosis}>
                        {p.diagnosis}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.75rem' }}>
                        <span style={{ color: p.vitals.heartRate > 100 ? '#ef4444' : 'inherit' }}>❤️ {p.vitals.heartRate}</span>
                        <span>🩺 {p.vitals.bp}</span>
                        <span style={{ color: p.vitals.spO2 < 95 ? '#f59e0b' : 'inherit' }}>💨 {p.vitals.spO2}%</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>{p.assignedDoctorName}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onSelectPatient(p.id)}
                      >
                        <Eye size={14} />
                        <span>View EHR</span>
                      </button>
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
