import React, { useState } from 'react';
import { Modal } from '../Modal';
import { useHospital } from '../../context/HospitalContext';
import { Plus, Trash2, Check } from 'lucide-react';

export const NewInvoiceModal = ({ isOpen, onClose }) => {
  const { patients, addInvoice } = useHospital();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('BlueCross Health Insurance');
  const [discount, setDiscount] = useState(500);

  const [items, setItems] = useState([
    { description: 'Inpatient Consultation & Care', amount: 500.00 },
    { description: 'Diagnostic Lab Tests & Vitals Telemetry', amount: 250.00 }
  ]);

  const selectedPatient = patients.find(p => p.id === patientId);

  const addItem = () => {
    setItems([...items, { description: 'Medication / Room Charge', amount: 150.00 }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const netTotal = Math.max(0, subtotal - parseFloat(discount || 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    addInvoice({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      items,
      subtotal,
      taxInsuranceDiscount: -parseFloat(discount || 0),
      totalAmount: netTotal,
      paymentMethod,
      notes: 'Generated via Hospital Management System Billing Console'
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Patient Billing Invoice" maxWidth="650px">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Patient *</label>
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
          <label>Insurance / Payment Provider</label>
          <input
            type="text"
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="e.g. Medicare / Self-Pay Credit Card"
          />
        </div>

        <div style={{ margin: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Itemized Charges Breakdown</label>
            <button type="button" className="btn btn-secondary btn-sm" onClick={addItem}>
              <Plus size={14} />
              <span>Add Line Item</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-control"
                  style={{ flex: 2 }}
                  placeholder="Service / Medication Description"
                  value={item.description}
                  onChange={(e) => updateItem(idx, 'description', e.target.value)}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  style={{ flex: 1 }}
                  placeholder="Amount ($)"
                  value={item.amount}
                  onChange={(e) => updateItem(idx, 'amount', e.target.value)}
                  required
                />
                {items.length > 1 && (
                  <button type="button" className="icon-btn" onClick={() => removeItem(idx)} style={{ width: '36px', height: '36px' }}>
                    <Trash2 size={14} color="#ef4444" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: '1rem 0' }}>
          <div className="grid-2" style={{ gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Subtotal:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>${subtotal.toFixed(2)}</div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Insurance Discount / Co-Pay Deduction ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Net Patient Payable:</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
              ${netTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            <Check size={16} />
            <span>Generate & Issue Invoice</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
