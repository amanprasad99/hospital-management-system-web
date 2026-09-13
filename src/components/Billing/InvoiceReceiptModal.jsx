import React from 'react';
import { Modal } from '../Modal';
import { Printer, Activity, CheckCircle2 } from 'lucide-react';

export const InvoiceReceiptModal = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={!!invoice} onClose={onClose} title={`Hospital Official Invoice Receipt: ${invoice.id}`} maxWidth="680px">
      <div className="printable-receipt" style={{ background: '#fff', color: '#111827', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb' }}>
              <Activity size={24} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Ravi Medical Hospital</h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem' }}>
              100 Healthcare Boulevard, Main Wing • Emergency Hotline: (555) 911-RAVI
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>INVOICE</span>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{invoice.id}</div>
            <div style={{ fontSize: '0.775rem', color: '#6b7280' }}>Date: {invoice.date}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Billed To Patient</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.1rem' }}>{invoice.patientName}</div>
            <div style={{ color: '#4b5563' }}>Patient ID: {invoice.patientId}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Payment Method</div>
            <div style={{ fontWeight: 700, marginTop: '0.1rem' }}>{invoice.paymentMethod}</div>
            <div style={{ color: invoice.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b', fontWeight: 700, marginTop: '0.2rem' }}>
              Status: {invoice.paymentStatus.toUpperCase()}
            </div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #d1d5db', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem 0', color: '#4b5563' }}>Service Description</th>
              <th style={{ padding: '0.5rem 0', textAlign: 'right', color: '#4b5563' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.65rem 0', color: '#1f2937' }}>{item.description}</td>
                <td style={{ padding: '0.65rem 0', textAlign: 'right', fontWeight: 600 }}>${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px' }}>
            <span style={{ color: '#6b7280' }}>Subtotal:</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', color: '#059669' }}>
            <span>Insurance Deduction:</span>
            <span>-${Math.abs(invoice.taxInsuranceDiscount).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '220px', fontSize: '1.15rem', fontWeight: 800, borderTop: '1px solid #d1d5db', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
            <span>Net Total:</span>
            <span style={{ color: '#2563eb' }}>${invoice.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>
          Thank you for trusting Ravi Medical Hospital with your clinical care.
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Printer size={16} />
          <span>Print / Export PDF</span>
        </button>
      </div>
    </Modal>
  );
};
