import React, { useState } from 'react';
import { Pill, Plus, AlertTriangle, RefreshCw, CheckCircle, Package } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const PharmacyInventory = ({ onOpenAddMedicine, onOpenDispense }) => {
  const { pharmacy, restockMedicine, searchQuery } = useHospital();
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(pharmacy.map(p => p.category))];

  const filteredPharmacy = pharmacy.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchNo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock': return <span className="badge badge-success">In Stock</span>;
      case 'Low Stock': return <span className="badge badge-warning">Low Stock</span>;
      case 'Critical Low': return <span className="badge badge-critical">Critical Low</span>;
      default: return <span className="badge badge-muted">Out of Stock</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Pharmacy & Medical Supplies Inventory</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Drug inventory tracker, batch numbers, automatic low-stock alerts, and e-prescriptions.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onOpenDispense}>
            <Pill size={16} color="var(--primary-cyan)" />
            <span>Dispense Rx</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenAddMedicine}>
            <Plus size={18} />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Drug Name & Dosage Form</th>
                <th>Category</th>
                <th>Batch & Expiry</th>
                <th>Stock Level</th>
                <th>Unit Price</th>
                <th>Supplier</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPharmacy.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No medications found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPharmacy.map(med => (
                  <tr key={med.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>{med.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{med.dosageForm} ({med.id})</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem' }}>{med.category}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{med.batchNo}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Exp: {med.expiryDate}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: med.stockLevel <= med.minThreshold ? '#ef4444' : 'inherit' }}>
                        {med.stockLevel} units
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Min threshold: {med.minThreshold}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>${med.unitPrice.toFixed(2)}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{med.supplier}</span>
                    </td>
                    <td>{getStatusBadge(med.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => restockMedicine(med.id, 50)}
                        title="Add +50 units to stock"
                      >
                        <RefreshCw size={12} />
                        <span>Restock (+50)</span>
                      </button>
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
