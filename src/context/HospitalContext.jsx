import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialWards,
  initialPharmacy,
  initialInvoices,
  initialActivityLog
} from '../data/mockData';

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('aegis_theme') || 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Persistent States
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('aegis_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('aegis_doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('aegis_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [wards, setWards] = useState(() => {
    const saved = localStorage.getItem('aegis_wards');
    return saved ? JSON.parse(saved) : initialWards;
  });

  const [pharmacy, setPharmacy] = useState(() => {
    const saved = localStorage.getItem('aegis_pharmacy');
    return saved ? JSON.parse(saved) : initialPharmacy;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('aegis_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem('aegis_activity_log');
    return saved ? JSON.parse(saved) : initialActivityLog;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('aegis_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => { localStorage.setItem('aegis_patients', JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem('aegis_doctors', JSON.stringify(doctors)); }, [doctors]);
  useEffect(() => { localStorage.setItem('aegis_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('aegis_wards', JSON.stringify(wards)); }, [wards]);
  useEffect(() => { localStorage.setItem('aegis_pharmacy', JSON.stringify(pharmacy)); }, [pharmacy]);
  useEffect(() => { localStorage.setItem('aegis_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('aegis_activity_log', JSON.stringify(activityLog)); }, [activityLog]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addLog = (type, title, description, level = 'info') => {
    const newLog = {
      id: Date.now(),
      type,
      title,
      description,
      time: 'Just now',
      level
    };
    setActivityLog(prev => [newLog, ...prev]);
  };

  // Patient Handlers
  const addPatient = (newPatientData) => {
    const id = `PAT-${1000 + patients.length + 1}`;
    const patientObj = {
      id,
      ...newPatientData,
      admissionDate: new Date().toISOString().split('T')[0],
      vitalsHistory: [
        { time: 'Initial Intake', ...newPatientData.vitals }
      ],
      prescriptions: newPatientData.prescriptions || [],
      labReports: newPatientData.labReports || []
    };
    setPatients(prev => [patientObj, ...prev]);
    addLog('admission', 'New Patient Intake', `Registered ${patientObj.name} (${patientObj.triageLevel})`, patientObj.triageLevel === 'Critical' ? 'critical' : 'info');
    return id;
  };

  const updatePatient = (id, updatedFields) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addLog('patient', 'Patient Record Updated', `Updated medical records for ${id}`, 'info');
  };

  // Appointment Handlers
  const addAppointment = (appointmentData) => {
    const id = `APT-${500 + appointments.length + 1}`;
    const newAppt = {
      id,
      ...appointmentData,
      status: 'Confirmed'
    };
    setAppointments(prev => [newAppt, ...prev]);
    addLog('appointment', 'New Appointment Scheduled', `${newAppt.patientName} with ${newAppt.doctorName} on ${newAppt.date}`, 'info');
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    addLog('appointment', 'Appointment Status Changed', `Appointment ${id} set to ${status}`, 'info');
  };

  // Doctor Handlers
  const updateDoctorStatus = (doctorId, newStatus) => {
    setDoctors(prev => prev.map(d => d.id === doctorId ? { ...d, status: newStatus } : d));
    addLog('doctor', 'Doctor Status Toggled', `Doctor ${doctorId} status updated to ${newStatus}`, 'info');
  };

  // Ward & Bed Handlers
  const assignPatientToBed = (wardId, bedId, patientId, patientName, condition, ventilator = false) => {
    setWards(prev => prev.map(ward => {
      if (ward.id === wardId) {
        const updatedBeds = ward.beds.map(bed => {
          if (bed.bedId === bedId) {
            return {
              ...bed,
              status: 'Occupied',
              patientId,
              patientName,
              condition: condition || 'Stable',
              ventilator
            };
          }
          return bed;
        });
        const occupiedCount = updatedBeds.filter(b => b.status === 'Occupied').length;
        return { ...ward, beds: updatedBeds, occupiedBeds: occupiedCount };
      }
      return ward;
    }));
    addLog('bed', 'Bed Assigned', `Assigned ${patientName} to ${bedId}`, 'info');
  };

  const updateBedStatus = (wardId, bedId, status) => {
    setWards(prev => prev.map(ward => {
      if (ward.id === wardId) {
        const updatedBeds = ward.beds.map(bed => {
          if (bed.bedId === bedId) {
            return {
              ...bed,
              status,
              patientId: status === 'Available' || status === 'Cleaning' ? null : bed.patientId,
              patientName: status === 'Available' || status === 'Cleaning' ? null : bed.patientName,
              condition: status === 'Available' || status === 'Cleaning' ? null : bed.condition
            };
          }
          return bed;
        });
        const occupiedCount = updatedBeds.filter(b => b.status === 'Occupied').length;
        return { ...ward, beds: updatedBeds, occupiedBeds: occupiedCount };
      }
      return ward;
    }));
    addLog('bed', 'Bed Status Updated', `Bed ${bedId} status updated to ${status}`, 'info');
  };

  // Pharmacy Handlers
  const addMedicine = (medData) => {
    const id = `MED-${800 + pharmacy.length + 1}`;
    const newMed = {
      id,
      ...medData,
      status: medData.stockLevel <= medData.minThreshold ? 'Low Stock' : 'In Stock'
    };
    setPharmacy(prev => [newMed, ...prev]);
    addLog('pharmacy', 'New Medication Added', `Added ${newMed.name} to pharmacy inventory`, 'info');
  };

  const dispenseMedicine = (medId, quantity, patientName) => {
    setPharmacy(prev => prev.map(med => {
      if (med.id === medId) {
        const newStock = Math.max(0, med.stockLevel - quantity);
        let status = 'In Stock';
        if (newStock === 0) status = 'Out of Stock';
        else if (newStock <= med.minThreshold) status = 'Low Stock';

        return { ...med, stockLevel: newStock, status };
      }
      return med;
    }));
    addLog('pharmacy', 'Medication Dispensed', `Dispensed ${quantity} units of ${medId} for ${patientName}`, 'info');
  };

  const restockMedicine = (medId, quantity) => {
    setPharmacy(prev => prev.map(med => {
      if (med.id === medId) {
        const newStock = med.stockLevel + quantity;
        const status = newStock > med.minThreshold ? 'In Stock' : 'Low Stock';
        return { ...med, stockLevel: newStock, status };
      }
      return med;
    }));
    addLog('pharmacy', 'Medication Restocked', `Added ${quantity} units to ${medId}`, 'success');
  };

  // Billing Handlers
  const addInvoice = (invoiceData) => {
    const id = `INV-${9000 + invoices.length + 1}`;
    const newInv = {
      id,
      ...invoiceData,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: 'Pending'
    };
    setInvoices(prev => [newInv, ...prev]);
    addLog('billing', 'Invoice Generated', `Generated invoice ${id} for ${newInv.patientName} ($${newInv.totalAmount})`, 'info');
  };

  const payInvoice = (id, paymentMethod) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, paymentStatus: 'Paid', paymentMethod } : inv));
    addLog('billing', 'Invoice Settled', `Invoice ${id} paid via ${paymentMethod}`, 'success');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setPatients(initialPatients);
    setDoctors(initialDoctors);
    setAppointments(initialAppointments);
    setWards(initialWards);
    setPharmacy(initialPharmacy);
    setInvoices(initialInvoices);
    setActivityLog(initialActivityLog);
    localStorage.clear();
    addLog('system', 'System Demo Data Reset', 'All clinical tables reverted to baseline demo state.', 'warning');
  };

  return (
    <HospitalContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        selectedPatientId,
        setSelectedPatientId,
        patients,
        doctors,
        appointments,
        wards,
        pharmacy,
        invoices,
        activityLog,
        addPatient,
        updatePatient,
        addAppointment,
        updateAppointmentStatus,
        updateDoctorStatus,
        assignPatientToBed,
        updateBedStatus,
        addMedicine,
        dispenseMedicine,
        restockMedicine,
        addInvoice,
        payInvoice,
        resetDemoData
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
