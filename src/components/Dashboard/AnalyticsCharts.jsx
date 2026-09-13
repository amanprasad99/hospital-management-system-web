import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const admissionData = [
  { day: 'Mon', admissions: 14, discharges: 10, emergency: 6 },
  { day: 'Tue', admissions: 22, discharges: 16, emergency: 9 },
  { day: 'Wed', admissions: 18, discharges: 15, emergency: 7 },
  { day: 'Thu', admissions: 29, discharges: 21, emergency: 12 },
  { day: 'Fri', admissions: 34, discharges: 25, emergency: 15 },
  { day: 'Sat', admissions: 26, discharges: 20, emergency: 11 },
  { day: 'Sun', admissions: 30, discharges: 22, emergency: 14 }
];

const departmentData = [
  { dept: 'Cardiology', patients: 28, beds: 35 },
  { dept: 'Orthopedics', patients: 22, beds: 25 },
  { dept: 'Neurology', patients: 18, beds: 20 },
  { dept: 'ICU / Critical', patients: 16, beds: 18 },
  { dept: 'Pediatrics', patients: 14, beds: 20 },
  { dept: 'Pulmonology', patients: 19, beds: 22 }
];

export const AnalyticsCharts = () => {
  return (
    <div className="grid-equal-2" style={{ marginBottom: '1.5rem' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Weekly Patient Flow</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Admissions, Discharges & ER Queue</span>
          </div>
          <span className="badge badge-routine">Real-time Stream</span>
        </div>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={admissionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAdmit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorER" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="admissions" name="Admissions" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAdmit)" />
              <Area type="monotone" dataKey="emergency" name="Emergency Intake" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorER)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Department Bed Workload</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Active Patients vs Total Bed Capacity</span>
          </div>
          <span className="badge badge-success">92% Capacity</span>
        </div>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="dept" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
              <Bar dataKey="patients" name="Active Patients" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="beds" name="Total Bed Capacity" fill="#10b981" radius={[4, 4, 0, 0]} opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
