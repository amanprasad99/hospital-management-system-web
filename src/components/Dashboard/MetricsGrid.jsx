import React from 'react';
import { Users, Bed, Calendar, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const MetricsGrid = () => {
  const { patients, wards, appointments, invoices } = useHospital();

  const totalPatients = patients.length;
  const inpatients = patients.filter(p => p.status === 'Inpatient').length;
  const criticalCount = patients.filter(p => p.triageLevel === 'Critical').length;

  // Bed metrics
  let totalBeds = 0;
  let occupiedBeds = 0;
  wards.forEach(w => {
    totalBeds += w.totalBeds;
    occupiedBeds += w.occupiedBeds;
  });
  const occupancyPercentage = Math.round((occupiedBeds / (totalBeds || 1)) * 100);

  // Today's appointments
  const todayCount = appointments.filter(a => a.status === 'Confirmed' || a.status === 'In-Progress').length;

  // Revenue total
  const totalRevenue = invoices
    .filter(i => i.paymentStatus === 'Paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const metrics = [
    {
      title: 'Active Inpatients',
      value: inpatients,
      subtext: `${criticalCount} Critical ICU Patients`,
      icon: Users,
      color: 'var(--primary-blue)',
      trend: '+12% vs last week'
    },
    {
      title: 'Ward Bed Occupancy',
      value: `${occupancyPercentage}%`,
      subtext: `${occupiedBeds} / ${totalBeds} Beds Occupied`,
      icon: Bed,
      color: 'var(--primary-purple)',
      trend: 'Capacity Stable'
    },
    {
      title: 'Today Appointments',
      value: todayCount,
      subtext: `${appointments.length} Total Registered`,
      icon: Calendar,
      color: 'var(--primary-emerald)',
      trend: '8 Active Clinics'
    },
    {
      title: 'Daily Revenue Settled',
      value: `$${totalRevenue.toLocaleString()}`,
      subtext: 'Includes Insurance & Cash',
      icon: DollarSign,
      color: 'var(--primary-cyan)',
      trend: '+8.4% Revenue Growth'
    }
  ];

  return (
    <div className="grid-4">
      {metrics.map((m, idx) => {
        const IconComponent = m.icon;
        return (
          <div key={idx} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '70px', height: '70px', borderRadius: '50%', background: m.color, opacity: 0.1, blur: '20px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{m.title}</span>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: `${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                <IconComponent size={20} />
              </div>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>
              {m.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              <span>{m.subtext}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: 'var(--primary-emerald)', fontWeight: 600 }}>
                <TrendingUp size={12} />
                {m.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
