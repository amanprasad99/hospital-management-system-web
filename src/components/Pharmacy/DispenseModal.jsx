import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import { Pill, Check } from 'lucide-react';

export const DispenseModal = ({ isOpen, onClose }) => {
  const { pharmacy, patients, dispenseMedicine } = useHospital();

  const [medId, setMedId] = useState(pharmacy[0]?.id || '');
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const selectedMed = pharmacy.find(m => m.id === medId);
  const selectedPatient = patients.find(p => p.id === patientId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medId || !quantity) return;
    dispenseMedicine(medId, parseInt(quantity, 10), selectedPatient ? selectedPatient.name : 'Walk-in');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dispense Prescription Medication" maxWidth="500px">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Medication to Dispense *</label>
          <select
            className="form-control"
            value={medId}
            onChange={(e) => setMedId(e.target.value)}
          >
            {pharmacy.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.dosageForm}) - Stock: {m.stockLevel} units
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Patient</label>
          <select
            className="form-control"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity Units to Dispense</label>
          <input
            type="number"
            min="1"
            max={selectedMed?.stockLevel || 100}
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        {selectedMed && (
          <div style={{ background: 'var(--bg-input)', padding: '0.85rem', borderRadius: 'var(--radius-md)', margin: '1rem 0', fontSize: '0.825rem' }}>
            <div>Total Charge: <strong style={{ color: 'var(--primary-blue)' }}>${(selectedMed.unitPrice * quantity).toFixed(2)}</strong></div>
            <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>Batch: {selectedMed.batchNo} • Unit Price: ${selectedMed.unitPrice.toFixed(2)}</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            <Check size={16} />
            <span>Confirm Dispensation</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
