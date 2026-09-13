import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import { Heart, Activity, Thermometer, Wind, ShieldAlert, Pill, FileText, Plus, Check } from 'lucide-react';

export const PatientDetailModal = ({ patientId, onClose }) => {
  const { patients, updatePatient } = useHospital();
  const patient = patients.find(p => p.id === patientId);

  const [activeTab, setActiveTab] = useState('vitals');
  const [showAddRx, setShowAddRx] = useState(false);
  const [newRx, setNewRx] = useState({ drug: '', dosage: '', frequency: '', duration: '' });

  if (!patient) return null;

  const handleAddRx = (e) => {
    e.preventDefault();
    if (!newRx.drug || !newRx.dosage) return;
    const updatedPrescriptions = [...(patient.prescriptions || []), newRx];
    updatePatient(patient.id, { prescriptions: updatedPrescriptions });
    setNewRx({ drug: '', dosage: '', frequency: '', duration: '' });
    setShowAddRx(false);
  };

  return (
    <Modal isOpen={!!patientId} onClose={onClose} title={`EHR Chart: ${patient.name} (${patient.id})`} maxWidth="800px">
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{patient.name}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {patient.age} yrs • {patient.gender} • Blood Group: <strong style={{ color: 'var(--primary-blue)' }}>{patient.bloodGroup}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            📞 {patient.phone} | ✉️ {patient.email}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emergency Contact</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{patient.emergencyContact}</div>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem' }}>
            <span className={`badge ${patient.triageLevel === 'Critical' ? 'badge-critical' : patient.triageLevel === 'Urgent' ? 'badge-urgent' : 'badge-routine'}`}>
              {patient.triageLevel} Triage
            </span>
            <span className="badge badge-muted">{patient.status} ({patient.room})</span>
          </div>
        </div>

        <div style={{ width: '100%', pt: '0.5rem', borderTop: '1px dashed var(--border-color)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={16} color="#ef4444" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Known Allergies:</span>
          <span style={{ fontSize: '0.8rem', color: '#f87171' }}>
            {patient.allergies?.length ? patient.allergies.join(', ') : 'No known drug allergies (NKDA)'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem', gap: '0.5rem' }}>
        {['vitals', 'prescriptions', 'labReports'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.6rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--primary-blue)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'vitals' ? 'Vitals Monitor' : tab === 'prescriptions' ? 'Prescriptions & Rx' : 'Lab Diagnostics'}
          </button>
        ))}
      </div>

      {activeTab === 'vitals' && (
        <div>
          <div className="grid-4" style={{ marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <Heart size={18} color="#ef4444" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Heart Rate</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{patient.vitals.heartRate} bpm</div>
            </div>
            <div style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <Activity size={18} color="#3b82f6" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Blood Pressure</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{patient.vitals.bp}</div>
            </div>
            <div style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <Wind size={18} color="#10b981" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SpO2 Saturation</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{patient.vitals.spO2}%</div>
            </div>
            <div style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <Thermometer size={18} color="#f59e0b" style={{ margin: '0 auto 0.25rem' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Body Temp</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{patient.vitals.temp}</div>
            </div>
          </div>

          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Recent Clinical Telemetry Log</h4>
          <div className="table-responsive">
            <table className="custom-table" style={{ fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Heart Rate</th>
                  <th>Blood Pressure</th>
                  <th>SpO2</th>
                </tr>
              </thead>
              <tbody>
                {patient.vitalsHistory?.map((vh, i) => (
                  <tr key={i}>
                    <td>{vh.time}</td>
                    <td style={{ color: vh.heartRate > 100 ? '#ef4444' : 'inherit' }}>{vh.heartRate} bpm</td>
                    <td>{vh.bp}</td>
                    <td style={{ color: vh.spO2 < 93 ? '#ef4444' : 'inherit' }}>{vh.spO2}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'prescriptions' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem' }}>Active Medical Prescriptions</h4>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowAddRx(!showAddRx)}>
              <Plus size={14} />
              <span>Add Medication</span>
            </button>
          </div>

          {showAddRx && (
            <form onSubmit={handleAddRx} style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
              <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Medication Name (e.g. Lisinopril)"
                  className="form-control"
                  value={newRx.drug}
                  onChange={(e) => setNewRx({ ...newRx, drug: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 10mg)"
                  className="form-control"
                  value={newRx.dosage}
                  onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                  required
                />
              </div>
              <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Frequency (e.g. Twice daily after meals)"
                  className="form-control"
                  value={newRx.frequency}
                  onChange={(e) => setNewRx({ ...newRx, frequency: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. 14 Days)"
                  className="form-control"
                  value={newRx.duration}
                  onChange={(e) => setNewRx({ ...newRx, duration: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                <Check size={14} />
                <span>Save to Prescription</span>
              </button>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {patient.prescriptions?.map((rx, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Pill size={18} color="var(--primary-cyan)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{rx.drug} <span style={{ color: 'var(--primary-blue)' }}>({rx.dosage})</span></div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>{rx.frequency}</div>
                  </div>
                </div>
                <span className="badge badge-routine">{rx.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'labReports' && (
        <div>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Diagnostic & Lab Test Results</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {patient.labReports?.map((report, idx) => (
              <div key={idx} style={{ padding: '0.85rem 1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--primary-purple)" />
                    <span>{report.testName}</span>
                  </div>
                  <span className={`badge ${report.status === 'Critical' ? 'badge-critical' : report.status === 'Abnormal' || report.status === 'High' ? 'badge-warning' : 'badge-success'}`}>
                    {report.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  Result: <strong>{report.result}</strong>
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Ordered / Recorded on: {report.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};
