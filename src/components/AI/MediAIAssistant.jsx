import React, { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, ShieldCheck, FileText, CheckCircle2, Stethoscope, Pill } from 'lucide-react';
import { clinicalKnowledge } from '../../data/mockData';

export const MediAIAssistant = () => {
  const [activeModule, setActiveModule] = useState('triage');

  // Symptom Triage State
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [triageResult, setTriageResult] = useState(null);

  // Note Summarizer State
  const [rawNotes, setRawNotes] = useState('48yo female presented with sudden chest pressure radiating down left arm, accompanied by cold sweats and nausea for 35 minutes. History of hyperlipidemia.');
  const [summaryResult, setSummaryResult] = useState(null);

  // Interaction Checker State
  const [drugA, setDrugA] = useState('Aspirin 81mg');
  const [drugB, setDrugB] = useState('Warfarin 5mg');
  const [interactionResult, setInteractionResult] = useState(null);

  const symptomList = [
    'Substernal Chest Pain', 'Radiation to Arm / Jaw', 'Shortness of Breath (Dyspnea)',
    'Sudden Unilateral Weakness', 'High Fever (>38.5°C)', 'Severe Throbbing Headache',
    'Acute Abdominal Tenderness', 'Productive Wheezing Cough'
  ];

  const toggleSymptom = (sym) => {
    setSelectedSymptoms(prev =>
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const handleRunTriage = () => {
    if (selectedSymptoms.includes('Substernal Chest Pain') || selectedSymptoms.includes('Radiation to Arm / Jaw') || selectedSymptoms.includes('Sudden Unilateral Weakness')) {
      setTriageResult({
        urgency: 'EMERGENCY (Level 1 STAT)',
        badgeClass: 'badge-critical',
        condition: 'Possible Acute Coronary Syndrome (ACS) / Cerebrovascular Event',
        protocol: 'Immediate 12-lead ECG, STAT Cardiology/Stroke Team activation, Oxygen telemetry, Continuous SpO2 monitor, Troponin assay.'
      });
    } else if (selectedSymptoms.includes('Shortness of Breath (Dyspnea)') || selectedSymptoms.includes('Acute Abdominal Tenderness')) {
      setTriageResult({
        urgency: 'URGENT (Level 2 High Priority)',
        badgeClass: 'badge-urgent',
        condition: 'Respiratory Distress / Acute Abdomen',
        protocol: 'Vitals intake, ABG/Nebulizers, Fast-track ER Bed assignment, Abdominal Ultrasound.'
      });
    } else {
      setTriageResult({
        urgency: 'ROUTINE / SEMI-URGENT (Level 4)',
        badgeClass: 'badge-routine',
        condition: 'Non-life threatening Symptomatic Presentation',
        protocol: 'Outpatient specialist consultation, Oral hydrations, Standard lab workup.'
      });
    }
  };

  const handleSummarizeNotes = () => {
    setSummaryResult({
      subjective: '48-year-old female complaining of acute retrosternal chest pressure and diaphoresis.',
      objective: 'Alert, diaphoretic. Vitals: HR 104, BP 145/92, SpO2 95% on room air.',
      assessment: 'Acute Coronary Syndrome (ACS) / Suspected STEMI/NSTEMI.',
      plan: '1. STAT 12-Lead ECG\n2. Chewed Aspirin 325mg\n3. High-sensitivity Troponin I\n4. Cardiology Consult',
      icd10: ['I20.9 (Angina pectoris, unspecified)', 'I21.9 (Acute myocardial infarction)', 'R07.9 (Chest pain, unspecified)']
    });
  };

  const handleCheckInteraction = () => {
    if ((drugA.includes('Aspirin') || drugA.includes('Enoxaparin')) && (drugB.includes('Warfarin') || drugB.includes('Heparin'))) {
      setInteractionResult({
        severity: 'HIGH RISK (Major Contraindication)',
        badgeClass: 'badge-critical',
        details: 'Concomitant administration of oral anticoagulants and NSAIDs/antiplatelets significantly elevates severe gastrointestinal and systemic hemorrhage risks.'
      });
    } else {
      setInteractionResult({
        severity: 'LOW / NO KNOWN INTERACTION',
        badgeClass: 'badge-success',
        details: 'No major cytochrome P450 or antiplatelet synergistic toxicity identified between these two agents.'
      });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Bot size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>MediAI Clinical Decision Support Assistant</h2>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              AI triage calculator, clinical note S.O.A.P summarizer, and drug interaction engine.
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setActiveModule('triage')}
            className={`btn ${activeModule === 'triage' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Stethoscope size={16} />
            <span>AI Symptom Triage</span>
          </button>
          <button
            onClick={() => setActiveModule('notes')}
            className={`btn ${activeModule === 'notes' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <FileText size={16} />
            <span>Note Summarizer & ICD-10</span>
          </button>
          <button
            onClick={() => setActiveModule('interaction')}
            className={`btn ${activeModule === 'interaction' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Pill size={16} />
            <span>Drug Interaction Checker</span>
          </button>
        </div>
      </div>

      {activeModule === 'triage' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--primary-purple)" />
            <span>Multi-Symptom Triage Calculator</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Select patient reported symptoms to compute emergency acuity levels and clinical response protocols.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {symptomList.map(sym => {
              const isSelected = selectedSymptoms.includes(sym);
              return (
                <button
                  key={sym}
                  onClick={() => toggleSymptom(sym)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--gradient-brand)' : 'var(--bg-input)',
                    color: isSelected ? 'white' : 'var(--text-primary)',
                    border: isSelected ? 'none' : '1px solid var(--border-color)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {sym}
                </button>
              );
            })}
          </div>

          <button className="btn btn-primary" onClick={handleRunTriage} disabled={selectedSymptoms.length === 0}>
            <Sparkles size={16} />
            <span>Compute Triage Recommendation</span>
          </button>

          {triageResult && (
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className={`badge ${triageResult.badgeClass}`}>{triageResult.urgency}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidence Score: 98.2%</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.5rem 0' }}>
                {triageResult.condition}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary-blue)' }}>
                <strong>Recommended Clinical Protocol:</strong> {triageResult.protocol}
              </div>
            </div>
          )}
        </div>
      )}

      {activeModule === 'notes' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Unstructured Clinical Note &rarr; S.O.A.P Structurer
          </h3>

          <div className="form-group">
            <label>Raw Physician / Nurse Dictation</label>
            <textarea
              className="form-control"
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              style={{ minHeight: '110px' }}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSummarizeNotes}>
            <Sparkles size={16} />
            <span>Generate S.O.A.P & Suggest ICD-10 Codes</span>
          </button>

          {summaryResult && (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '0.25rem' }}>Subjective (S)</div>
                <p style={{ fontSize: '0.85rem' }}>{summaryResult.subjective}</p>
              </div>

              <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-purple)', marginBottom: '0.25rem' }}>Objective (O)</div>
                <p style={{ fontSize: '0.85rem' }}>{summaryResult.objective}</p>
              </div>

              <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-emerald)', marginBottom: '0.25rem' }}>Assessment & Plan (A/P)</div>
                <pre style={{ fontSize: '0.85rem', fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{summaryResult.plan}</pre>
              </div>

              <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div style={{ fontWeight: 700, color: '#c084fc', marginBottom: '0.5rem' }}>Suggested ICD-10 Diagnosis Billing Codes</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {summaryResult.icd10.map((code, i) => (
                    <span key={i} className="badge badge-routine" style={{ background: 'var(--bg-surface)' }}>{code}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeModule === 'interaction' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Pharmacological Drug Interaction Safety Checker
          </h3>

          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label>Drug A</label>
              <input
                type="text"
                className="form-control"
                value={drugA}
                onChange={(e) => setDrugA(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Drug B</label>
              <input
                type="text"
                className="form-control"
                value={drugB}
                onChange={(e) => setDrugB(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleCheckInteraction}>
            <ShieldCheck size={16} />
            <span>Run Contraindication Screen</span>
          </button>

          {interactionResult && (
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-lg)' }}>
              <div className={`badge ${interactionResult.badgeClass}`} style={{ marginBottom: '0.5rem' }}>
                {interactionResult.severity}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                {interactionResult.details}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
