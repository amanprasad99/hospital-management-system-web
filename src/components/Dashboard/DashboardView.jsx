import React from 'react';
import { MetricsGrid } from './MetricsGrid';
import { AnalyticsCharts } from './AnalyticsCharts';
import { ActivityFeed } from './ActivityFeed';

export const DashboardView = ({ onSelectPatient }) => {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Hospital Executive Overview</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Real-time telemetry, bed allocation, department workload, and emergency alerts.
          </span>
        </div>
      </div>

      <MetricsGrid />
      <AnalyticsCharts />
      <ActivityFeed onSelectPatient={onSelectPatient} />
    </div>
  );
};
