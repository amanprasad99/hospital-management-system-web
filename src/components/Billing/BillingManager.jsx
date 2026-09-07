import React, { useState } from 'react';
import { Receipt, Plus, DollarSign, CheckCircle2, FileText, Printer } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const BillingManager = ({ onOpenNewInvoice, onSelectInvoice }) => {
  const { invoices, payInvoice, searchQuery } = useHospital();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inv.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalSettled = invoices
    .filter(i => i.paymentStatus === 'Paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const totalPending = invoices
    .filter(i => i.paymentStatus === 'Pending')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Billing, Invoicing & Insurance Management</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Patient billing accounts, itemized hospital charges, insurance coverage, and receipts.
          </span>
        </div>

        <button className="btn btn-primary" onClick={onOpenNewInvoice}>
          <Plus size={18} />
          <span>Generate New Invoice</span>
        </button>
      </div>

      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Revenue Settled</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-emerald)' }}>
            ${totalSettled.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pending Outstanding Balances</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
            ${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Invoices Issued</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{invoices.length}</div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Insurance Claim Ratio</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-blue)' }}>78.4%</div>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Filter Status:</span>
          {['All', 'Paid', 'Pending'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice ID & Date</th>
                <th>Patient Name</th>
                <th>Payment Method / Insurance</th>
                <th>Subtotal</th>
                <th>Insurance Discount</th>
                <th>Net Payable</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No invoices found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{inv.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inv.date}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inv.patientName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {inv.patientId}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem' }}>{inv.paymentMethod}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>${inv.subtotal.toFixed(2)}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#10b981' }}>
                        -${Math.abs(inv.taxInsuranceDiscount).toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>${inv.totalAmount.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className={`badge ${inv.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        {inv.paymentStatus === 'Pending' && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => payInvoice(inv.id, 'Credit Card')}
                          >
                            <CheckCircle2 size={14} color="#10b981" />
                            <span>Settle Pay</span>
                          </button>
                        )}
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onSelectInvoice(inv)}
                        >
                          <FileText size={14} />
                          <span>Receipt</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
