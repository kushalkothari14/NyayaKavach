# NyayaKavach – An AI-Driven Secure Digital Document Management and Evidence-Integrity Platform for Legal and Investigation Documents

[![Problem Statement](https://img.shields.io/badge/SIH-PS--SIH26190-blue.svg)](https://www.sih.gov.in/)
[![Ministry](https://img.shields.io/badge/Ministry-Home%20Affairs%20(MHA)-orange.svg)](https://www.mha.gov.in/)
[![Compliance](https://img.shields.io/badge/Compliance-BSA%202023%20%7C%20Sec%2065B%20IT%20Act-green.svg)](#legal-compliance--evidentiary-standards)
[![Security](https://img.shields.io/badge/Security-Zero--Trust%20%7C%20AES--256--GCM-red.svg)](#core-architectural-pillars)

---

## 🏛️ Executive Summary

**NyayaKavach** (न्यायकवच) is an AI-driven, Zero-Trust, Blockchain-anchored digital document management and evidence-integrity platform engineered specifically for the Indian criminal justice ecosystem. 

It empowers **Law Enforcement Agencies (Police)**, **Forensic Science Laboratories (FSL)**, **Public Prosecutors**, and **Judicial Courts** to securely ingest, classify, redact, store, exchange, and legally verify sensitive investigation documents—including First Information Reports (FIRs), Case Diaries, Charge Sheets, Witness Statements, Forensic Reports, and Judgments.

NyayaKavach guarantees **100% evidentiary integrity**, automated bilingual processing, tamper-evident audit trails, and strict compliance with the **Bharatiya Sakshya Adhiniyam (BSA), 2023** and **Section 65B of the Indian Information Technology Act**.

---

## ⚡ Key Challenges Solved

| Challenge in Traditional Workflow | NyayaKavach Solution |
| :--- | :--- |
| **Tampering & Spoliation Risks**: Vulnerability of physical and digital records during inter-agency transit. | **Blockchain-Anchored Immutable Ledger**: Cryptographic SHA-256 Merkle proofs and Hyperledger Fabric audit trails. |
| **Chain-of-Custody Gaps**: Inability to verify who accessed, printed, or exported a record. | **Automated Chain-of-Custody Tracking**: Forensic-grade audit trail with dynamic biometric/watermark overlays. |
| **Manual PII Leakage**: Risk of exposing victim identities, undercover officers, and minors. | **Automated AI-Driven PII Redaction**: On-premise NER models redact Aadhaar, phone numbers, victim names in Hindi & English. |
| **Legal Admissibility Bottlenecks**: Lengthy manual generation of Section 65B IT Act / BSA certificates. | **Automated Electronic Evidence Certificates**: Cryptographically signed audit certificates generated instantly for court presentation. |
| **Unindexed Scanned Documents**: Hand-written or low-resolution scanned FIRs and panchnamas difficult to search. | **Multilingual OCR & Semantic Search**: Hybrid search (Elasticsearch + Milvus Vector DB) across English, Hindi, and regional scripts. |

---

## 🛡️ Core Architectural Pillars

### 1. Zero-Trust Storage & Sovereign Vault
* **Envelope Encryption**: Files encrypted at client/edge with AES-256-GCM; data keys rotated and protected via HSM / KMS.
* **Storage Independence**: Compatible with sovereign cloud storage (MinIO, AWS S3 / GovCloud) with WORM (Write Once, Read Many) policies.

### 2. Immutable Chain of Custody (Blockchain Audit Trail)
* Every document lifecycle event (Ingestion, Redaction, Viewing, Export, Handoff) is logged into an immutable consortium blockchain.
* Cryptographic Merkle verification guarantees mathematical proof of non-tampering.

### 3. AI-Powered Multilingual Intelligence
* **OCR Ingestion Engine**: Powered by PaddleOCR and LayoutLM for structured extraction from poor-quality scans and handwritten forms.
* **PII & Sensitive Data Redaction**: Automatic identification and redaction of sensitive identifiers in Hindi and English.
* **Hybrid Semantic Retrieval**: Full-text keyword search combined with vector embeddings (Milvus) for cross-case intelligence and legal precedent matching.

### 4. Legal Compliance & Evidentiary Standards
* Built from the ground up to comply with **Bharatiya Sakshya Adhiniyam (BSA), 2023** regulations on electronic evidence.
* Automated generation of cryptographically timestamped Section 65B IT Act admissibility certificates.

### 5. Multi-Agency Role-Based Access Control (RBAC & ABAC)
* Fine-grained compartmentalization across Police, Forensic Labs, Prosecution, and Judiciary.
* Dynamic viewer watermarking with viewer identity, timestamp, and IP preventing unauthorized physical capture or leaks.

---

## 💻 Codebase & File Structure

```text
├── index.html               # Interactive web application UI & prototype simulator
├── styles.css               # Design system, responsive layout, and dark/light UI styling
├── app.js                   # Client-side simulator (RBAC, Tamper detection, Blockchain ledger)
├── server.js                # Lightweight Node.js local development server
├── run_tunnel.sh            # Persistent public HTTPS tunnel utility script
├── build_full_pitch_pdf.py  # Python script to generate 3-page solution brief PDF
├── build_clean_pdf.py       # Python script to generate 2-page technical architecture PDF
├── generate_pdf.html        # Clean HTML template for PDF generation and printing
├── make_pdf.js              # Pure JavaScript PDF builder utility
├── .gitignore               # Excludes caches, temporary files, and OS artifacts
└── README.md                # System documentation and setup guide
```

---

## 🚀 Running the NyayaKavach Prototype

### 1. Start the Local Web Application
Start the Node.js server (zero external dependencies required):
```bash
node server.js
```
The prototype will be live at:
```text
http://localhost:3001/
```

### 2. Features in the Simulator
* **Multi-Agency Role Switcher**: Test views for Investigating Officer (Police), Forensic Expert (FSL), Public Prosecutor, Magistrate/Judge, and Defense Counsel.
* **Tamper Detection Simulation**: Trigger simulated file tampering to see real-time cryptographic hash verification failure against the blockchain audit trail.
* **Redaction Controls**: Toggle AI-driven PII redaction of sensitive witnesses, victim identifiers, and case-sensitive data.
* **Blockchain Transaction Ledger**: Inspect cryptographic transaction IDs, actors, timestamps, and Merkle tree roots.

### 3. Generate Documentation PDFs
```bash
# Generate the 3-page presentation document
python3 build_full_pitch_pdf.py

# Generate the 2-page technical solution document
python3 build_clean_pdf.py

# Generate PDF via Node.js
node make_pdf.js
```

---

## 📜 Legal & Compliance Framework

* **Bharatiya Sakshya Adhiniyam (BSA) 2023** – Electronic Records Admissibility
* **Indian Information Technology Act, 2000** – Section 65B Electronic Evidence Certification
* **Zero-Trust Security Guidelines** – National Informatics Centre (NIC) & CERT-In aligned standards
