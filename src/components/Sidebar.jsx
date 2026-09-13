import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Bed,
  Pill,
  Receipt,
  Bot,
  RotateCcw,
  Activity
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    patients,
    appointments,
    pharmacy,
    resetDemoData
  } = useHospital();

  const urgentPatientsCount = patients.filter(p => p.triageLevel === 'Critical').length;
  const todayApptsCount = appointments.filter(a => a.status === 'Confirmed' || a.status === 'In-Progress').length;
  const lowStockCount = pharmacy.filter(p => p.status === 'Low Stock' || p.status === 'Critical Low').length;

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients (EHR)', icon: Users, badge: urgentPatientsCount ? `${urgentPatientsCount} Crit` : null, badgeColor: 'bg-rose' },
    { id: 'doctors', label: 'Doctors & Specialists', icon: UserCheck },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: todayApptsCount ? `${todayApptsCount}` : null },
    { id: 'wards', label: 'Wards & Bed Map', icon: Bed },
    { id: 'pharmacy', label: 'Pharmacy & Stock', icon: Pill, badge: lowStockCount ? `${lowStockCount} Low` : null, badgeColor: 'bg-amber' },
    { id: 'billing', label: 'Billing & Invoices', icon: Receipt },
    { id: 'ai-assistant', label: 'MediAI Triage Assistant', icon: Bot, highlight: true }
  ];

  return (
    <aside className="sidebar">
      <div className="brand-logo">
        <div className="brand-icon">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="brand-title" style={{ fontSize: '1.1rem' }}>Ravi Medical</h1>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Hospital Management
          </span>
        </div>
      </div>

      <nav className="nav-group">
        {navItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={item.highlight ? { border: '1px solid rgba(139, 92, 246, 0.4)', background: isActive ? undefined : 'rgba(139, 92, 246, 0.08)' } : {}}
            >
              <IconComponent size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-badge" style={item.badgeColor === 'bg-rose' ? { background: '#ef4444' } : item.badgeColor === 'bg-amber' ? { background: '#f59e0b' } : undefined}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <button
          onClick={resetDemoData}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
          title="Reset sample patients, appointments & pharmacy data"
        >
          <RotateCcw size={14} />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
