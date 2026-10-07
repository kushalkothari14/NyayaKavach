const fs = require('fs');
const path = require('path');

// Simple Pure JS PDF Generator
class PDFWriter {
  constructor() {
    this.objects = [];
    this.offsets = [];
    this.pages = [];
  }

  addObject(content) {
    const id = this.objects.length + 1;
    this.objects.push({ id, content });
    return id;
  }

  buildPDF(outputFile) {
    let pdf = '%PDF-1.4\n';

    const fontRegularId = this.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    const fontBoldId = this.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

    const pageObjIds = [];

    // Page 1 Content
    const page1Text = `
BT
/F2 20 Tf
40 800 Td
(NyayaKavach - Technical Solution & Architecture) Tj
ET
BT
/F1 10 Tf
40 780 Td
(PS-SIH26190 | Ministry of Home Affairs | Secure Document Management System) Tj
ET
BT
/F2 13 Tf
40 750 Td
(1. Executive Summary & Problem Statement) Tj
ET
BT
/F1 9.5 Tf
40 730 Td
(Law enforcement agencies, courts, and forensic labs handle massive volumes of sensitive legal) Tj
0 -14 Td
(and investigation records (FIRs, Charge Sheets, Witness Statements, Forensic Reports).) Tj
0 -14 Td
(NyayaKavach provides an AI-driven, Zero-Trust, Blockchain-anchored digital vault ensuring) Tj
0 -14 Td
(100% tamper proofing, automated indexing, and Bharatiya Sakshya Adhiniyam (BSA) 2023 compliance.) Tj
ET
BT
/F2 13 Tf
40 650 Td
(2. Recommended Tech Stack Selection) Tj
ET
BT
/F1 9 Tf
40 630 Td
(Frontend & UI: React.js, TailwindCSS, PDF.js, Flutter (Field Mobile Scan App)) Tj
0 -14 Td
(Backend & API: Node.js (Fastify), Go (API Gateway), Python FastAPI (AI Services)) Tj
0 -14 Td
(AI & Digitization: PaddleOCR, LayoutLM, Llama-3 Legal NLP (Hindi/English PII Redaction)) Tj
0 -14 Td
(Search Engine: Elasticsearch & Milvus Vector DB (Hybrid Semantic Search)) Tj
0 -14 Td
(Encrypted Storage: MinIO / AWS S3 Sovereign Cloud (AES-256-GCM Envelope Encryption)) Tj
0 -14 Td
(Audit Ledger: Hyperledger Fabric Consortium Blockchain (SHA-256 Merkle Hash Log)) Tj
0 -14 Td
(eSign & PKI: CDAC eSign, Aadhaar eKYC, X.509 PKI Certificates) Tj
ET
BT
/F2 13 Tf
40 500 Td
(3. High-Level Architecture Topology) Tj
ET
BT
/F1 8.5 Tf
40 480 Td
([Clients: Police, FSL, Prosecutor, Court] -> [Security Gateway: WAF + Keycloak IAM + ABAC Engine]) Tj
0 -14 Td
( -> [Microservices: API Gateway + AI OCR + Elasticsearch + eSign Service]) Tj
0 -14 Td
( -> [Data Layer: PostgreSQL Metadata + MinIO AES-256 Vault + Hyperledger Fabric Ledger]) Tj
ET
BT
/F2 13 Tf
40 410 Td
(4. Data Lifecycle & Workflow) Tj
ET
BT
/F1 9 Tf
40 390 Td
(1. Ingestion: Scan FIR/Forensics -> AI OCR extracts metadata & auto-redacts victim PII.) Tj
0 -14 Td
(2. Encryption: Client-side AES-256-GCM envelope encryption -> Save to MinIO Cloud Storage.) Tj
0 -14 Td
(3. Blockchain Anchoring: SHA-256 Hash + Officer ID + Timestamp -> Hyperledger Fabric Ledger.) Tj
0 -14 Td
(4. Zero-Trust Access: Role-Based Access Control (ABAC) with Dynamic Viewer Watermarking.) Tj
0 -14 Td
(5. Judicial Admissibility: Real-time SHA-256 verification + 1-Click BSA 2023 Sec 65B Certificate.) Tj
ET
`;
    const content1Id = this.addObject(`<< /Length ${page1Text.length} >>\nstream${page1Text}\nendstream`);
    const page1Id = this.addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${content1Id} 0 R >>`);
    pageObjIds.push(page1Id);

    // Page 2 Content (SIH Poster Grid)
    const page2Text = `
BT
/F2 20 Tf
40 800 Td
(SIH Poster Content & Layout Grid) Tj
ET
BT
/F1 10 Tf
40 780 Td
(Problem Statement ID: PS-SIH26190 | Ministry of Home Affairs) Tj
ET
BT
/F2 12 Tf
40 740 Td
(PANEL 1: Problem Statement & Bottlenecks) Tj
ET
BT
/F1 9 Tf
40 725 Td
(- Physical & digital fragmentation across police stations, forensic labs, and courts.) Tj
0 -13 Td
(- Tampering and backdating risks due to lack of cryptographic audit logs.) Tj
0 -13 Td
(- PII exposure of protected witnesses and victims.) Tj
0 -13 Td
(- Delays in judicial proceedings and inter-departmental transfers.) Tj
ET
BT
/F2 12 Tf
40 655 Td
(PANEL 2: Proposed Solution (NyayaKavach)) Tj
ET
BT
/F1 9 Tf
40 640 Td
(- Sovereign digital vault for criminal justice document lifecycle.) Tj
0 -13 Td
(- Hyperledger Fabric blockchain ledger providing 100% tamper proof auditability.) Tj
0 -13 Td
(- AI multi-lingual OCR & automated victim PII redaction.) Tj
0 -13 Td
(- Fine-grained Attribute-Based Access Control (ABAC) with dynamic watermarking.) Tj
ET
BT
/F2 12 Tf
40 570 Td
(PANEL 3 & 4: Innovations & Legal Compliance) Tj
ET
BT
/F1 9 Tf
40 555 Td
(- 1-Click BSA 2023 Sec 63 / Sec 65B Electronic Evidence Certificate Generator.) Tj
0 -13 Td
(- Dynamic Forensic Watermarking overlaying User ID, IP, and Timestamp.) Tj
0 -13 Td
(- ICJS (Inter-operable Criminal Justice System) standardized REST/gRPC API bridge.) Tj
0 -13 Td
(- Zero-Knowledge Evidence Verification for sealed court records.) Tj
ET
BT
/F2 12 Tf
40 485 Td
(PANEL 5 & 6: Measurable Impact Metrics) Tj
ET
BT
/F2 14 Tf
40 455 Td
(80% Faster Search   |   100% Tamper Proof   |   90% Paperless Transition) Tj
ET
BT
/F1 9 Tf
40 425 Td
(NyayaKavach Project Proposal - Smart India Hackathon (SIH) 2026) Tj
ET
`;
    const content2Id = this.addObject(`<< /Length ${page2Text.length} >>\nstream${page2Text}\nendstream`);
    const page2Id = this.addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${content2Id} 0 R >>`);
    pageObjIds.push(page2Id);

    // Root Catalog & Pages Tree
    const pagesTreeId = 2; // Fixed ID 2 for pages tree
    const catalogId = 1;   // Fixed ID 1 for catalog

    const catalogObj = `<< /Type /Catalog /Pages ${pagesTreeId} 0 R >>`;
    const pagesTreeObj = `<< /Type /Pages /Kids [${pageObjIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pageObjIds.length} >>`;

    // Re-assign object 1 and 2
    let pdfBody = '%PDF-1.4\n';
    const xrefs = [0];

    const writeObj = (id, str) => {
      xrefs[id] = pdfBody.length;
      pdfBody += `${id} 0 obj\n${str}\nendobj\n`;
    };

    writeObj(catalogId, catalogObj);
    writeObj(pagesTreeId, pagesTreeObj);

    this.objects.forEach(obj => {
      writeObj(obj.id, obj.content);
    });

    const startXref = pdfBody.length;
    pdfBody += `xref\n0 ${xrefs.length}\n0000000000 65535 f \n`;
    for (let i = 1; i < xrefs.length; i++) {
      const offset = String(xrefs[i]).padStart(10, '0');
      pdfBody += `${offset} 00000 n \n`;
    }

    pdfBody += `trailer\n<< /Size ${xrefs.length} /Root ${catalogId} 0 R >>\nstartxref\n${startXref}\n%%EOF`;

    fs.writeFileSync(outputFile, pdfBody);
    console.log(`PDF successfully created at: ${outputFile} (${fs.statSync(outputFile).size} bytes)`);
  }
}

const writer = new PDFWriter();
const targetWorkspacePDF = '/Users/kushalkothari/Downloads/f1-predictor/Avishkar/NyayaKavach_SIH26190_Solution_and_Poster.pdf';
const targetBrainPDF = '/Users/kushalkothari/.gemini/antigravity/brain/dc72526c-dbd0-4086-ace3-d47d8ef457ef/NyayaKavach_SIH26190_Solution_and_Poster.pdf';

writer.buildPDF(targetWorkspacePDF);
fs.copyFileSync(targetWorkspacePDF, targetBrainPDF);
