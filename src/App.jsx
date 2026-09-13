import React, { useState } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/Dashboard/DashboardView';
import { PatientList } from './components/Patients/PatientList';
import { PatientDetailModal } from './components/Patients/PatientDetailModal';
import { NewPatientModal } from './components/Patients/NewPatientModal';
import { DoctorDirectory } from './components/Doctors/DoctorDirectory';
import { AppointmentCalendar } from './components/Appointments/AppointmentCalendar';
import { BookAppointmentModal } from './components/Appointments/BookAppointmentModal';
import { BedMap } from './components/Wards/BedMap';
import { PharmacyInventory } from './components/Pharmacy/PharmacyInventory';
import { AddMedicineModal } from './components/Pharmacy/AddMedicineModal';
import { DispenseModal } from './components/Pharmacy/DispenseModal';
import { BillingManager } from './components/Billing/BillingManager';
import { NewInvoiceModal } from './components/Billing/NewInvoiceModal';
import { InvoiceReceiptModal } from './components/Billing/InvoiceReceiptModal';
import { MediAIAssistant } from './components/AI/MediAIAssistant';

const AppContent = () => {
  const { activeTab, selectedPatientId, setSelectedPatientId } = useHospital();

  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewApptOpen, setIsNewApptOpen] = useState(false);
  const [isAddMedOpen, setIsAddMedOpen] = useState(false);
  const [isDispenseOpen, setIsDispenseOpen] = useState(false);
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleSelectPatient = (id) => {
    setSelectedPatientId(id);
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-wrapper">
        <Header
          onOpenNewPatient={() => setIsNewPatientOpen(true)}
          onOpenNewAppt={() => setIsNewApptOpen(true)}
        />

        <main className="content-body">
          {activeTab === 'dashboard' && (
            <DashboardView onSelectPatient={handleSelectPatient} />
          )}

          {activeTab === 'patients' && (
            <PatientList
              onSelectPatient={handleSelectPatient}
              onOpenNewPatient={() => setIsNewPatientOpen(true)}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorDirectory
              onOpenNewAppt={() => setIsNewApptOpen(true)}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentCalendar
              onOpenNewAppt={() => setIsNewApptOpen(true)}
            />
          )}

          {activeTab === 'wards' && (
            <BedMap onSelectPatient={handleSelectPatient} />
          )}

          {activeTab === 'pharmacy' && (
            <PharmacyInventory
              onOpenAddMedicine={() => setIsAddMedOpen(true)}
              onOpenDispense={() => setIsDispenseOpen(true)}
            />
          )}

          {activeTab === 'billing' && (
            <BillingManager
              onOpenNewInvoice={() => setIsNewInvoiceOpen(true)}
              onSelectInvoice={(inv) => setSelectedInvoice(inv)}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <MediAIAssistant />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewPatientModal
        isOpen={isNewPatientOpen}
        onClose={() => setIsNewPatientOpen(false)}
      />

      <PatientDetailModal
        patientId={selectedPatientId}
        onClose={() => setSelectedPatientId(null)}
      />

      <BookAppointmentModal
        isOpen={isNewApptOpen}
        onClose={() => setIsNewApptOpen(false)}
      />

      <AddMedicineModal
        isOpen={isAddMedOpen}
        onClose={() => setIsAddMedOpen(false)}
      />

      <DispenseModal
        isOpen={isDispenseOpen}
        onClose={() => setIsDispenseOpen(false)}
      />

      <NewInvoiceModal
        isOpen={isNewInvoiceOpen}
        onClose={() => setIsNewInvoiceOpen(false)}
      />

      <InvoiceReceiptModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <AppContent />
    </HospitalProvider>
  );
}
