import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import { Calendar, Clock, Check } from 'lucide-react';

export const BookAppointmentModal = ({ isOpen, onClose }) => {
  const { patients, doctors, addAppointment } = useHospital();

  const [formData, setFormData] = useState({
    patientId: patients[0]?.id || '',
    patientName: patients[0]?.name || '',
    doctorId: doctors[0]?.id || '',
    department: 'Cardiology',
    date: new Date().toISOString().split('T')[0],
    time: '09:30 AM',
    type: 'Consultation',
    triage: 'Routine',
    notes: ''
  });

  const handlePatientSelect = (e) => {
    const selectedId = e.target.value;
    const selectedPat = patients.find(p => p.id === selectedId);
    setFormData(prev => ({
      ...prev,
      patientId: selectedId,
      patientName: selectedPat ? selectedPat.name : 'Walk-in Patient'
    }));
  };

  const handleDoctorSelect = (e) => {
    const selectedId = e.target.value;
    const selectedDoc = doctors.find(d => d.id === selectedId);
    setFormData(prev => ({
      ...prev,
      doctorId: selectedId,
      department: selectedDoc ? selectedDoc.specialty : prev.department
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDoc = doctors.find(d => d.id === formData.doctorId);

    addAppointment({
      ...formData,
      doctorName: selectedDoc ? selectedDoc.name : 'Dr. Specialist'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Doctor Consultation Appointment" maxWidth="600px">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Patient *</label>
          <select
            className="form-control"
            value={formData.patientId}
            onChange={handlePatientSelect}
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.id} - {p.status})</option>
            ))}
          </select>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Assigned Doctor *</label>
            <select
              className="form-control"
              value={formData.doctorId}
              onChange={handleDoctorSelect}
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Consultation Type</label>
            <select
              className="form-control"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Consultation">Initial Consultation</option>
              <option value="Follow-up">Follow-up Review</option>
              <option value="Post-Op Check">Post-Op Checkup</option>
              <option value="Diagnostic Review">Diagnostic / Lab Review</option>
              <option value="Emergency Triage">Emergency Triage</option>
            </select>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot *</label>
            <select
              className="form-control"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            >
              {['08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'].map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Triage Priority Level</label>
            <select
              className="form-control"
              value={formData.triage}
              onChange={(e) => setFormData({ ...formData, triage: e.target.value })}
            >
              <option value="Routine">Routine</option>
              <option value="Urgent">Urgent Priority</option>
              <option value="Critical">Critical Emergency</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              value={formData.department}
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label>Reason for Visit / Clinical Notes</label>
          <textarea
            className="form-control"
            placeholder="Describe symptoms or clinical objective..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Check size={16} />
            <span>Confirm Booking</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
