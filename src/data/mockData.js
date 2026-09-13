export const initialPatients = [
  {
    id: "PAT-1001",
    name: "Eleanor Vance",
    age: 48,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+1 (555) 234-5678",
    email: "eleanor.vance@example.com",
    address: "742 Evergreen Terrace, Springfield",
    emergencyContact: "Thomas Vance (Husband) - +1 (555) 998-1122",
    admissionDate: "2026-08-10",
    status: "Inpatient",
    triageLevel: "Critical",
    assignedDoctorId: "DOC-201",
    assignedDoctorName: "Dr. Sarah Jenkins",
    department: "Cardiology",
    room: "ICU-Bed 04",
    diagnosis: "Acute Coronary Syndrome, Hypertension",
    allergies: ["Penicillin", "Sulfa drugs"],
    vitals: {
      heartRate: 104,
      bp: "145/92",
      spO2: 95,
      temp: "37.8 °C",
      respiratoryRate: 22
    },
    vitalsHistory: [
      { time: "08:00 AM", heartRate: 110, bp: "150/95", spO2: 94 },
      { time: "12:00 PM", heartRate: 106, bp: "148/94", spO2: 95 },
      { time: "04:00 PM", heartRate: 104, bp: "145/92", spO2: 95 }
    ],
    prescriptions: [
      { drug: "Atorvastatin", dosage: "40mg", frequency: "Once daily at bedtime", duration: "30 Days" },
      { drug: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "Continuous" },
      { drug: "Metoprolol Succinate", dosage: "50mg", frequency: "Once daily", duration: "30 Days" }
    ],
    labReports: [
      { testName: "Troponin I", result: "2.4 ng/mL", status: "High", date: "2026-08-10" },
      { testName: "Lipid Panel", result: "Total Chol: 245 mg/dL", status: "Borderline", date: "2026-08-11" },
      { testName: "12-Lead ECG", result: "ST Elevation in V2-V4", status: "Critical", date: "2026-08-10" }
    ]
  },
  {
    id: "PAT-1002",
    name: "Marcus Thorne",
    age: 34,
    gender: "Male",
    bloodGroup: "A-",
    phone: "+1 (555) 876-5432",
    email: "marcus.thorne@example.com",
    address: "128 Beacon St, Boston",
    emergencyContact: "Clara Thorne (Sister) - +1 (555) 334-9988",
    admissionDate: "2026-08-12",
    status: "Inpatient",
    triageLevel: "Urgent",
    assignedDoctorId: "DOC-203",
    assignedDoctorName: "Dr. Robert Chen",
    department: "Orthopedics",
    room: "Ward B - Bed 12",
    diagnosis: "Comminuted Fracture Right Tibia (Post-OP)",
    allergies: ["Latex"],
    vitals: {
      heartRate: 78,
      bp: "120/80",
      spO2: 99,
      temp: "36.9 °C",
      respiratoryRate: 16
    },
    vitalsHistory: [
      { time: "08:00 AM", heartRate: 82, bp: "122/82", spO2: 98 },
      { time: "12:00 PM", heartRate: 80, bp: "120/80", spO2: 99 },
      { time: "04:00 PM", heartRate: 78, bp: "120/80", spO2: 99 }
    ],
    prescriptions: [
      { drug: "Enoxaparin", dosage: "40mg", frequency: "SubQ Subcutaneously once daily", duration: "14 Days" },
      { drug: "Acetaminophen", dosage: "1000mg", frequency: "Every 6 hours PRN Pain", duration: "7 Days" }
    ],
    labReports: [
      { testName: "Post-OP X-Ray Right Leg", result: "Internal Fixation Intact", status: "Normal", date: "2026-08-12" },
      { testName: "Complete Blood Count", result: "Hgb: 13.2 g/dL", status: "Normal", date: "2026-08-12" }
    ]
  },
  {
    id: "PAT-1003",
    name: "Sophia Martinez",
    age: 29,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+1 (555) 456-7890",
    email: "sophia.m@example.com",
    address: "55 Sunset Blvd, Los Angeles",
    emergencyContact: "Carlos Martinez (Father) - +1 (555) 776-2211",
    admissionDate: "2026-08-14",
    status: "Outpatient",
    triageLevel: "Routine",
    assignedDoctorId: "DOC-202",
    assignedDoctorName: "Dr. Emily Alpert",
    department: "Neurology",
    room: "Outpatient Clinic",
    diagnosis: "Chronic Migraine with Aura",
    allergies: ["None"],
    vitals: {
      heartRate: 72,
      bp: "115/75",
      spO2: 98,
      temp: "36.6 °C",
      respiratoryRate: 14
    },
    vitalsHistory: [
      { time: "09:30 AM", heartRate: 72, bp: "115/75", spO2: 98 }
    ],
    prescriptions: [
      { drug: "Sumatriptan", dosage: "50mg", frequency: "At onset of headache", duration: "PRN" },
      { drug: "Propranolol", dosage: "40mg", frequency: "Twice daily", duration: "60 Days" }
    ],
    labReports: [
      { testName: "Brain MRI", result: "Unremarkable, No structural lesions", status: "Normal", date: "2026-08-01" }
    ]
  },
  {
    id: "PAT-1004",
    name: "David K. Harrison",
    age: 62,
    gender: "Male",
    bloodGroup: "AB+",
    phone: "+1 (555) 678-1234",
    email: "dharrison@example.com",
    address: "404 Elm Street, Seattle",
    emergencyContact: "Linda Harrison (Wife) - +1 (555) 112-4433",
    admissionDate: "2026-08-14",
    status: "Inpatient",
    triageLevel: "Critical",
    assignedDoctorId: "DOC-204",
    assignedDoctorName: "Dr. Alistair Vance",
    department: "Pulmonology",
    room: "ICU-Bed 02",
    diagnosis: "Severe Acute Respiratory Failure, COPD Exacerbation",
    allergies: ["Codeine", "Ciprofloxacin"],
    vitals: {
      heartRate: 112,
      bp: "138/88",
      spO2: 91,
      temp: "38.2 °C",
      respiratoryRate: 28
    },
    vitalsHistory: [
      { time: "06:00 AM", heartRate: 118, bp: "142/90", spO2: 89 },
      { time: "10:00 AM", heartRate: 115, bp: "140/89", spO2: 90 },
      { time: "02:00 PM", heartRate: 112, bp: "138/88", spO2: 91 }
    ],
    prescriptions: [
      { drug: "Methylprednisolone", dosage: "40mg IV", frequency: "Every 8 hours", duration: "5 Days" },
      { drug: "Ipratropium/Albuterol", dosage: "Nebulizer solution", frequency: "Every 4 hours", duration: "7 Days" },
      { drug: "Azithromycin", dosage: "500mg IV", frequency: "Once daily", duration: "5 Days" }
    ],
    labReports: [
      { testName: "Arterial Blood Gas", result: "pH: 7.31, PaCO2: 58 mmHg, PaO2: 62 mmHg", status: "Critical", date: "2026-08-14" },
      { testName: "Chest X-Ray", result: "Bilateral Lower Lobe Infiltrates", status: "Abnormal", date: "2026-08-14" }
    ]
  },
  {
    id: "PAT-1005",
    name: "Amara Nwosu",
    age: 8,
    gender: "Female",
    bloodGroup: "O-",
    phone: "+1 (555) 901-2345",
    email: "parent.nwosu@example.com",
    address: "99 Maple Ave, Chicago",
    emergencyContact: "Nneka Nwosu (Mother) - +1 (555) 901-2345",
    admissionDate: "2026-08-13",
    status: "Inpatient",
    triageLevel: "Urgent",
    assignedDoctorId: "DOC-205",
    assignedDoctorName: "Dr. Maya Lin",
    department: "Pediatrics",
    room: "Peds Ward - Bed 03",
    diagnosis: "Acute Bronchiolitis, Moderate Dehydration",
    allergies: ["Peanuts"],
    vitals: {
      heartRate: 118,
      bp: "98/62",
      spO2: 96,
      temp: "37.5 °C",
      respiratoryRate: 26
    },
    vitalsHistory: [
      { time: "08:00 AM", heartRate: 124, bp: "96/60", spO2: 95 },
      { time: "01:00 PM", heartRate: 118, bp: "98/62", spO2: 96 }
    ],
    prescriptions: [
      { drug: "Saline Nasal Drops", dosage: "2 drops per nostril", frequency: "Before feeds", duration: "5 Days" },
      { drug: "Oral Rehydration Salt", dosage: "500 mL", frequency: "Ad libitum", duration: "3 Days" }
    ],
    labReports: [
      { testName: "RSV Antigen", result: "Positive", status: "Abnormal", date: "2026-08-13" }
    ]
  }
];

export const initialDoctors = [
  {
    id: "DOC-201",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiology",
    department: "Cardiology & Vascular",
    qualification: "MD, FACC (Harvard Medical School)",
    experience: "14 Years",
    status: "On Duty",
    activePatients: 8,
    todayAppointments: 6,
    rating: 4.9,
    email: "s.jenkins@ravimedical.org",
    phone: "+1 (555) 019-2831",
    room: "Suite 302 - Heart Center",
    avatarColor: "#3b82f6"
  },
  {
    id: "DOC-202",
    name: "Dr. Emily Alpert",
    specialty: "Neurology",
    department: "Neurology & Brain Sciences",
    qualification: "MD, PhD (Johns Hopkins)",
    experience: "11 Years",
    status: "In Surgery",
    activePatients: 5,
    todayAppointments: 4,
    rating: 4.8,
    email: "e.alpert@ravimedical.org",
    phone: "+1 (555) 019-4455",
    room: "Suite 410 - Neuro Tower",
    avatarColor: "#8b5cf6"
  },
  {
    id: "DOC-203",
    name: "Dr. Robert Chen",
    specialty: "Orthopedic Surgery",
    department: "Orthopedics & Trauma",
    qualification: "MD, FAAOS (Stanford)",
    experience: "16 Years",
    status: "On Duty",
    activePatients: 11,
    todayAppointments: 8,
    rating: 4.95,
    email: "r.chen@ravimedical.org",
    phone: "+1 (555) 019-8812",
    room: "Suite 204 - Ortho Clinic",
    avatarColor: "#10b981"
  },
  {
    id: "DOC-204",
    name: "Dr. Alistair Vance",
    specialty: "Pulmonology & Critical Care",
    department: "ICU / Pulmonology",
    qualification: "MD, FCCP (Yale Medicine)",
    experience: "18 Years",
    status: "On Duty",
    activePatients: 14,
    todayAppointments: 3,
    rating: 4.9,
    email: "a.vance@ravimedical.org",
    phone: "+1 (555) 019-3377",
    room: "ICU Command Desk",
    avatarColor: "#ef4444"
  },
  {
    id: "DOC-205",
    name: "Dr. Maya Lin",
    specialty: "Pediatrics",
    department: "Pediatrics & Child Health",
    qualification: "MD, FAAP (UCSF)",
    experience: "9 Years",
    status: "On Break",
    activePatients: 7,
    todayAppointments: 7,
    rating: 4.85,
    email: "m.lin@ravimedical.org",
    phone: "+1 (555) 019-6633",
    room: "Suite 105 - Children's Wing",
    avatarColor: "#f59e0b"
  },
  {
    id: "DOC-206",
    name: "Dr. Jonathan Reyes",
    specialty: "Emergency Medicine",
    department: "Emergency Department",
    qualification: "MD, FACEP (Columbia)",
    experience: "12 Years",
    status: "On Duty",
    activePatients: 15,
    todayAppointments: 12,
    rating: 4.92,
    email: "j.reyes@ravimedical.org",
    phone: "+1 (555) 019-9900",
    room: "ER Desk 1",
    avatarColor: "#ec4899"
  }
];

export const initialAppointments = [
  {
    id: "APT-501",
    patientId: "PAT-1003",
    patientName: "Sophia Martinez",
    doctorId: "DOC-202",
    doctorName: "Dr. Emily Alpert",
    department: "Neurology",
    date: "2026-08-15",
    time: "09:30 AM",
    type: "Follow-up",
    triage: "Routine",
    status: "Confirmed",
    notes: "Review MRI results and check migraine frequency"
  },
  {
    id: "APT-502",
    patientId: "PAT-1006",
    patientName: "Ethan Brooks",
    doctorId: "DOC-201",
    doctorName: "Dr. Sarah Jenkins",
    department: "Cardiology",
    date: "2026-08-15",
    time: "10:30 AM",
    type: "Consultation",
    triage: "Urgent",
    status: "In-Progress",
    notes: "Post-exercise palpitation assessment"
  },
  {
    id: "APT-503",
    patientId: "PAT-1007",
    patientName: "Olivia Taylor",
    doctorId: "DOC-203",
    doctorName: "Dr. Robert Chen",
    department: "Orthopedics",
    date: "2026-08-15",
    time: "11:15 AM",
    type: "Post-Op Check",
    triage: "Routine",
    status: "Scheduled",
    notes: "Knee arthroscopy 4-week recovery evaluation"
  },
  {
    id: "APT-504",
    patientId: "PAT-1008",
    patientName: "James O'Connor",
    doctorId: "DOC-205",
    doctorName: "Dr. Maya Lin",
    department: "Pediatrics",
    date: "2026-08-15",
    time: "02:00 PM",
    type: "Vaccination",
    triage: "Routine",
    status: "Scheduled",
    notes: "Annual wellness checkup and boosters"
  },
  {
    id: "APT-505",
    patientId: "PAT-1009",
    patientName: "Rachel Green",
    doctorId: "DOC-206",
    doctorName: "Dr. Jonathan Reyes",
    department: "Emergency Medicine",
    date: "2026-08-15",
    time: "03:45 PM",
    type: "Emergency Triage",
    triage: "Critical",
    status: "Confirmed",
    notes: "Acute abdominal pain with localized tenderness"
  }
];

export const initialWards = [
  {
    id: "WARD-ICU",
    name: "Intensive Care Unit (ICU)",
    floor: "3rd Floor - Wing A",
    headDoctor: "Dr. Alistair Vance",
    totalBeds: 10,
    occupiedBeds: 7,
    beds: [
      { bedId: "ICU-01", patientName: "Arthur Pendelton", patientId: "PAT-991", status: "Occupied", condition: "Critical", ventilator: true },
      { bedId: "ICU-02", patientName: "David K. Harrison", patientId: "PAT-1004", status: "Occupied", condition: "Critical", ventilator: true },
      { bedId: "ICU-03", patientName: "Helen Mirren", patientId: "PAT-994", status: "Occupied", condition: "Stable", ventilator: false },
      { bedId: "ICU-04", patientName: "Eleanor Vance", patientId: "PAT-1001", status: "Occupied", condition: "Critical", ventilator: false },
      { bedId: "ICU-05", patientName: null, patientId: null, status: "Cleaning", condition: null, ventilator: false },
      { bedId: "ICU-06", patientName: null, patientId: null, status: "Available", condition: null, ventilator: false },
      { bedId: "ICU-07", patientName: "Victor Stone", patientId: "PAT-998", status: "Occupied", condition: "Critical", ventilator: true },
      { bedId: "ICU-08", patientName: null, patientId: null, status: "Available", condition: null, ventilator: false },
      { bedId: "ICU-09", patientName: "Grace Hopper", patientId: "PAT-999", status: "Occupied", condition: "Stable", ventilator: false },
      { bedId: "ICU-10", patientName: "Alan Turing", patientId: "PAT-1000", status: "Occupied", condition: "Critical", ventilator: true }
    ]
  },
  {
    id: "WARD-ORTHO",
    name: "Orthopedics & Trauma Ward",
    floor: "2nd Floor - Wing B",
    headDoctor: "Dr. Robert Chen",
    totalBeds: 12,
    occupiedBeds: 8,
    beds: [
      { bedId: "ORT-01", patientName: "Marcus Thorne", patientId: "PAT-1002", status: "Occupied", condition: "Recovering", ventilator: false },
      { bedId: "ORT-02", patientName: "Bruce Wayne", patientId: "PAT-982", status: "Occupied", condition: "Stable", ventilator: false },
      { bedId: "ORT-03", patientName: null, patientId: null, status: "Available", condition: null, ventilator: false },
      { bedId: "ORT-04", patientName: null, patientId: null, status: "Available", condition: null, ventilator: false },
      { bedId: "ORT-05", patientName: "Diana Prince", patientId: "PAT-985", status: "Occupied", condition: "Stable", ventilator: false },
      { bedId: "ORT-06", patientName: null, patientId: null, status: "Cleaning", condition: null, ventilator: false }
    ]
  },
  {
    id: "WARD-PEDS",
    name: "Pediatric Care Pavilion",
    floor: "1st Floor - Wing C",
    headDoctor: "Dr. Maya Lin",
    totalBeds: 8,
    occupiedBeds: 4,
    beds: [
      { bedId: "PED-01", patientName: "Amara Nwosu", patientId: "PAT-1005", status: "Occupied", condition: "Stable", ventilator: false },
      { bedId: "PED-02", patientName: "Leo Fitz", patientId: "PAT-971", status: "Occupied", condition: "Recovering", ventilator: false },
      { bedId: "PED-03", patientName: null, patientId: null, status: "Available", condition: null, ventilator: false },
      { bedId: "PED-04", patientName: null, patientId: null, status: "Available", condition: null, ventilator: false }
    ]
  }
];

export const initialPharmacy = [
  {
    id: "MED-801",
    name: "Atorvastatin Calcium",
    category: "Cardiovascular",
    dosageForm: "Tablet (20mg)",
    stockLevel: 420,
    minThreshold: 100,
    unitPrice: 1.50,
    batchNo: "ATV-2026-X8",
    expiryDate: "2028-04-15",
    supplier: "Pfizer Global",
    status: "In Stock"
  },
  {
    id: "MED-802",
    name: "Amoxicillin / Clavulanate",
    category: "Antibiotics",
    dosageForm: "Cap 875mg/125mg",
    stockLevel: 45,
    minThreshold: 80,
    unitPrice: 3.20,
    batchNo: "AMX-2026-09",
    expiryDate: "2027-01-20",
    supplier: "Sandoz Pharma",
    status: "Low Stock"
  },
  {
    id: "MED-803",
    name: "Enoxaparin Sodium Injection",
    category: "Anticoagulants",
    dosageForm: "Prefilled Syringe 40mg/0.4mL",
    stockLevel: 18,
    minThreshold: 50,
    unitPrice: 18.50,
    batchNo: "ENX-2026-F1",
    expiryDate: "2026-11-30",
    supplier: "Sanofi",
    status: "Low Stock"
  },
  {
    id: "MED-804",
    name: "Metoprolol Succinate ER",
    category: "Beta Blockers",
    dosageForm: "Tablet (50mg)",
    stockLevel: 650,
    minThreshold: 150,
    unitPrice: 0.95,
    batchNo: "MET-2026-V3",
    expiryDate: "2028-09-10",
    supplier: "AstraZeneca",
    status: "In Stock"
  },
  {
    id: "MED-805",
    name: "Propofol Emulsion 1%",
    category: "Anesthetics",
    dosageForm: "Vial 20mL",
    stockLevel: 8,
    minThreshold: 25,
    unitPrice: 42.00,
    batchNo: "PRO-2026-Z2",
    expiryDate: "2026-09-15",
    supplier: "Fresenius Kabi",
    status: "Critical Low"
  },
  {
    id: "MED-806",
    name: "Acetaminophen IV (Ofirmev)",
    category: "Analgesics & Antipyretics",
    dosageForm: "Vial 1000mg/100mL",
    stockLevel: 210,
    minThreshold: 60,
    unitPrice: 12.00,
    batchNo: "ACT-2026-M4",
    expiryDate: "2027-12-01",
    supplier: "Mallinckrodt",
    status: "In Stock"
  }
];

export const initialInvoices = [
  {
    id: "INV-9001",
    patientId: "PAT-1001",
    patientName: "Eleanor Vance",
    date: "2026-08-14",
    dueDate: "2026-08-28",
    items: [
      { description: "ICU Room Charge (4 Days @ $1,500/day)", amount: 6000.00 },
      { description: "12-Lead ECG Diagnostic Suite", amount: 350.00 },
      { description: "Troponin I Serial Testing", amount: 480.00 },
      { description: "Cardiovascular IV Medications & Infusions", amount: 820.00 }
    ],
    subtotal: 7650.00,
    taxInsuranceDiscount: -4500.00,
    totalAmount: 3150.00,
    paymentStatus: "Pending",
    paymentMethod: "BlueCross Health Insurance",
    notes: "Pre-approved by insurance provider #BC-99410"
  },
  {
    id: "INV-9002",
    patientId: "PAT-1002",
    patientName: "Marcus Thorne",
    date: "2026-08-13",
    dueDate: "2026-08-27",
    items: [
      { description: "Orthopedic Surgery & OR Theater Fee", amount: 8500.00 },
      { description: "Orthopedic Surgical Hardware & Fixation", amount: 3200.00 },
      { description: "Ward B Inpatient Stay (2 Days)", amount: 1200.00 },
      { description: "Post-Op Physical Therapy Session 1", amount: 250.00 }
    ],
    subtotal: 13150.00,
    taxInsuranceDiscount: -10500.00,
    totalAmount: 2650.00,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (Visa ending 4821)",
    notes: "Payment settled in full at discharge desk"
  },
  {
    id: "INV-9003",
    patientId: "PAT-1003",
    patientName: "Sophia Martinez",
    date: "2026-08-14",
    dueDate: "2026-08-21",
    items: [
      { description: "Neurology Specialist Outpatient Consultation", amount: 280.00 },
      { description: "Sumatriptan & Propranolol Pharmacy Dispensation", amount: 95.00 }
    ],
    subtotal: 375.00,
    taxInsuranceDiscount: -200.00,
    totalAmount: 175.00,
    paymentStatus: "Paid",
    paymentMethod: "Apple Pay",
    notes: "Co-pay collected at appointment checkout"
  }
];

export const initialActivityLog = [
  { id: 1, type: "admission", title: "New ICU Admission", description: "Eleanor Vance admitted to ICU Bed 04 under Dr. Sarah Jenkins", time: "10 mins ago", level: "critical" },
  { id: 2, type: "pharmacy", title: "Pharmacy Dispense Alert", description: "Enoxaparin stock dropped below minimum threshold (18 remaining)", time: "25 mins ago", level: "warning" },
  { id: 3, type: "appointment", title: "Appointment Checked-In", description: "Sophia Martinez checked in for Neurology consultation", time: "45 mins ago", level: "info" },
  { id: 4, type: "billing", title: "Invoice Paid", description: "Invoice #INV-9002 ($2,650.00) paid by Marcus Thorne", time: "1 hour ago", level: "success" },
  { id: 5, type: "bed", title: "Bed Status Updated", description: "Bed ORT-06 moved to Cleaning status post-discharge", time: "2 hours ago", level: "info" }
];

export const clinicalKnowledge = {
  symptoms: [
    {
      condition: "Acute Coronary Syndrome (ACS) / Myocardial Infarction",
      keySymptoms: ["Chest Pain / Pressure", "Substernal Radiation to Left Arm", "Diaphoresis", "Shortness of Breath"],
      urgency: "Emergency (Level 1)",
      triageProtocol: "Immediate 12-lead ECG, Oxygen if SpO2 < 90%, Aspirin 325mg chewable, STAT Cardiology Consult, Troponin I assay."
    },
    {
      condition: "COPD Exacerbation / Respiratory Distress",
      keySymptoms: ["Wheezing", "Dyspnea", "Productive Cough", "Use of Accessory Respiratory Muscles"],
      urgency: "Urgent to Critical (Level 2)",
      triageProtocol: "Continuous SpO2 monitoring, Bronchodilator nebulizers (Albuterol/Ipratropium), IV Corticosteroids, ABG evaluation."
    },
    {
      condition: "Symptomatic Acute Migraine Aura",
      keySymptoms: ["Unilateral Throbbing Head Pain", "Photophobia", "Visual Scotoma", "Nausea"],
      urgency: "Routine / Urgent (Level 4)",
      triageProtocol: "Quiet dark room, Oral or SubQ Triptans, Antiemetics, Hydration, Neuro assessment."
    }
  ]
};
