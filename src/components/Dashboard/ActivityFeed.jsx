import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Info, Pill, UserPlus } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const ActivityFeed = ({ onSelectPatient }) => {
  const { activityLog, patients } = useHospital();

  const getLogIcon = (type) => {
    switch (type) {
      case 'admission': return <UserPlus size={16} color="#ef4444" />;
      case 'pharmacy': return <Pill size={16} color="#f59e0b" />;
      case 'billing': return <CheckCircle size={16} color="#10b981" />;
      default: return <Info size={16} color="#3b82f6" />;
    }
  };

  const criticalPatients = patients.filter(p => p.triageLevel === 'Critical');

  return (
    <div className="grid-2">
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--primary-blue)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Live Hospital Activity Feed</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated real-time</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {activityLog.slice(0, 5).map(log => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ padding: '0.4rem', borderRadius: '50%', background: 'var(--bg-surface)', marginTop: '2px' }}>
                {getLogIcon(log.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{log.title}</span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{log.time}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {log.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertTriangle size={18} color="#ef4444" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Critical Care Alerts</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {criticalPatients.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No critical alerts at present. All ICU units stable.
            </div>
          ) : (
            criticalPatients.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectPatient(p.id)}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171' }}>{p.name}</span>
                  <span className="badge badge-critical">{p.room}</span>
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  <strong>Diagnosis:</strong> {p.diagnosis}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  <span>HR: <strong style={{ color: '#ef4444' }}>{p.vitals.heartRate} bpm</strong></span>
                  <span>BP: <strong>{p.vitals.bp}</strong></span>
                  <span>SpO2: <strong style={{ color: p.vitals.spO2 < 93 ? '#ef4444' : 'inherit' }}>{p.vitals.spO2}%</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
