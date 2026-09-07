import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import { UserPlus, ShieldAlert, Heart } from 'lucide-react';

export const NewPatientModal = ({ isOpen, onClose }) => {
  const { doctors, addPatient } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    status: 'Inpatient',
    triageLevel: 'Routine',
    department: 'Cardiology',
    assignedDoctorId: doctors[0]?.id || '',
    room: 'Ward A - Bed 01',
    diagnosis: '',
    allergies: '',
    vitals: {
      heartRate: 75,
      bp: '120/80',
      spO2: 98,
      temp: '37.0 °C',
      respiratoryRate: 16
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignedDoc = doctors.find(d => d.id === formData.assignedDoctorId);

    const newPatient = {
      ...formData,
      age: parseInt(formData.age, 10) || 30,
      assignedDoctorName: assignedDoc ? assignedDoc.name : 'Dr. Duty Physician',
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : ['None']
    };

    addPatient(newPatient);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Patient Registration & Triage Intake" maxWidth="750px">
      <form onSubmit={handleSubmit}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-blue)', marginBottom: '0.75rem' }}>
          1. Patient Demographics & Contact
        </div>
        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Full Patient Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Johnathan Miller"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Age *</label>
              <input
                type="number"
                className="form-control"
                placeholder="45"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Gender</label>
              <select
                className="form-control"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Blood Group</label>
              <select
                className="form-control"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Emergency Contact Person & Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Spouse / Relative - Phone"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            />
          </div>
        </div>

        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-blue)', margin: '1rem 0 0.75rem' }}>
          2. Clinical Triage & Assignment
        </div>

        <div className="grid-4" style={{ gap: '0.75rem' }}>
          <div className="form-group">
            <label>Care Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Inpatient">Inpatient</option>
              <option value="Outpatient">Outpatient</option>
              <option value="Emergency">Emergency Intake</option>
            </select>
          </div>

          <div className="form-group">
            <label>Triage Urgency</label>
            <select
              className="form-control"
              value={formData.triageLevel}
              onChange={(e) => setFormData({ ...formData, triageLevel: e.target.value })}
              style={{ fontWeight: 600, color: formData.triageLevel === 'Critical' ? '#ef4444' : formData.triageLevel === 'Urgent' ? '#f59e0b' : 'inherit' }}
            >
              <option value="Routine">Routine (Green)</option>
              <option value="Urgent">Urgent (Yellow)</option>
              <option value="Critical">Critical (Red)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="form-control"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="ICU / Pulmonology">ICU / Pulmonology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="form-group">
            <label>Attending Physician</label>
            <select
              className="form-control"
              value={formData.assignedDoctorId}
              onChange={(e) => setFormData({ ...formData, assignedDoctorId: e.target.value })}
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Primary Diagnosis / Chief Complaint *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Chest discomfort, hypertension, shortness of breath"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Room / Ward Assignment</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. ICU Bed 04 or Ward B Bed 10"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Allergies (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Penicillin, Latex, Sulfa drugs"
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <UserPlus size={16} />
            <span>Complete Intake Registration</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
