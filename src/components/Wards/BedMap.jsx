import React, { useState } from 'react';
import { Bed, HeartPulse, Sparkles, UserPlus, RefreshCw, Activity } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Modal } from '../Modal';

export const BedMap = ({ onSelectPatient }) => {
  const { wards, updateBedStatus, assignPatientToBed, patients } = useHospital();
  const [selectedWardId, setSelectedWardId] = useState(wards[0]?.id || 'WARD-ICU');
  const [selectedBed, setSelectedBed] = useState(null);
  const [assignPatientId, setAssignPatientId] = useState('');

  const activeWard = wards.find(w => w.id === selectedWardId) || wards[0];

  const handleBedAction = (status) => {
    if (!selectedBed) return;
    updateBedStatus(activeWard.id, selectedBed.bedId, status);
    setSelectedBed(null);
  };

  const handleAssignPatient = (e) => {
    e.preventDefault();
    if (!selectedBed || !assignPatientId) return;
    const pat = patients.find(p => p.id === assignPatientId);
    if (pat) {
      assignPatientToBed(activeWard.id, selectedBed.bedId, pat.id, pat.name, pat.triageLevel, false);
    }
    setSelectedBed(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Visual Ward & Bed Allocation Map</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Real-time telemetry bed state tracking across ICU, Surgical, Trauma, and Pediatric floors.
          </span>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Select Ward Floor:</span>
            {wards.map(w => (
              <button
                key={w.id}
                onClick={() => setSelectedWardId(w.id)}
                className={`btn btn-sm ${selectedWardId === w.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                {w.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
              Occupied ({activeWard.occupiedBeds})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
              Available ({activeWard.totalBeds - activeWard.occupiedBeds})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
              Cleaning / Sanitizing
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{activeWard.name}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Location: {activeWard.floor} • Head Physician: <strong>{activeWard.headDoctor}</strong>
            </span>
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
            Occupancy Rate: <span style={{ color: 'var(--primary-blue)' }}>{Math.round((activeWard.occupiedBeds / activeWard.totalBeds) * 100)}%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {activeWard.beds.map(bed => {
            const isOccupied = bed.status === 'Occupied';
            const isCleaning = bed.status === 'Cleaning';

            const borderColor = isOccupied ? 'rgba(239, 68, 68, 0.4)' : isCleaning ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)';
            const bgColor = isOccupied ? 'rgba(239, 68, 68, 0.05)' : isCleaning ? 'rgba(245, 158, 11, 0.05)' : 'rgba(16, 185, 129, 0.05)';

            return (
              <div
                key={bed.bedId}
                onClick={() => setSelectedBed(bed)}
                style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                  position: 'relative'
                }}
                className="bed-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{bed.bedId}</div>
                  <span className={`badge ${isOccupied ? 'badge-critical' : isCleaning ? 'badge-warning' : 'badge-success'}`}>
                    {bed.status}
                  </span>
                </div>

                {isOccupied ? (
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0' }}>
                      {bed.patientName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ID: {bed.patientId} • {bed.condition}
                    </div>
                    {bed.ventilator && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#ef4444', fontWeight: 600, marginTop: '0.4rem', background: 'rgba(239, 68, 68, 0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        <Activity size={10} />
                        <span>Ventilator Active</span>
                      </div>
                    )}
                  </div>
                ) : isCleaning ? (
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-amber)', padding: '0.5rem 0' }}>
                    🧹 Sanitation cycle in progress
                  </div>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-emerald)', padding: '0.5rem 0' }}>
                    ✨ Bed ready for immediate intake
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bed Action Modal */}
      {selectedBed && (
        <Modal
          isOpen={!!selectedBed}
          onClose={() => setSelectedBed(null)}
          title={`Bed Allocation Control: ${selectedBed.bedId}`}
          maxWidth="500px"
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Current Status: <strong>{selectedBed.status}</strong>
              {selectedBed.patientName && <span> • Patient: <strong>{selectedBed.patientName}</strong></span>}
            </div>
          </div>

          {selectedBed.status === 'Occupied' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => onSelectPatient(selectedBed.patientId)}
              >
                Open Patient EHR Chart
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleBedAction('Cleaning')}
              >
                Discharge & Send Bed for Sanitation
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleBedAction('Available')}
              >
                Mark Bed Available Directly
              </button>
            </div>
          ) : (
            <div>
              <form onSubmit={handleAssignPatient} style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label>Assign Inpatient to Bed {selectedBed.bedId}</label>
                  <select
                    className="form-control"
                    value={assignPatientId}
                    onChange={(e) => setAssignPatientId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Patient --</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.triageLevel} - {p.diagnosis})</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <UserPlus size={16} />
                  <span>Confirm Bed Assignment</span>
                </button>
              </form>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleBedAction('Available')}
                >
                  Set Available
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleBedAction('Cleaning')}
                >
                  Set Cleaning
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
