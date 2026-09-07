import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import { Plus } from 'lucide-react';

export const AddMedicineModal = ({ isOpen, onClose }) => {
  const { addMedicine } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Cardiovascular',
    dosageForm: 'Tablet (10mg)',
    stockLevel: 100,
    minThreshold: 30,
    unitPrice: 2.50,
    batchNo: `BAT-${Math.floor(1000 + Math.random() * 9000)}`,
    expiryDate: '2028-12-31',
    supplier: 'PharmaDirect Ltd'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine({
      ...formData,
      stockLevel: parseInt(formData.stockLevel, 10) || 50,
      minThreshold: parseInt(formData.minThreshold, 10) || 20,
      unitPrice: parseFloat(formData.unitPrice) || 1.0
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Medication Stock" maxWidth="600px">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Medication / Generic Name *</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Omeprazole"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Analgesics & Antipyretics">Analgesics & Antipyretics</option>
              <option value="Anticoagulants">Anticoagulants</option>
              <option value="Anesthetics">Anesthetics</option>
              <option value="Beta Blockers">Beta Blockers</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dosage Form & Strength</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Capsule 20mg"
              value={formData.dosageForm}
              onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Initial Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              value={formData.stockLevel}
              onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Low Stock Warning Threshold</label>
            <input
              type="number"
              className="form-control"
              value={formData.minThreshold}
              onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label>Unit Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Expiration Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Supplier / Manufacturer</label>
          <input
            type="text"
            className="form-control"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            <Plus size={16} />
            <span>Add Stock Item</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
