import os

def create_valid_pdf(filename):
    # PDF specification compliant 2-page document
    pdf_content = []
    
    # 1. Header
    pdf_content.append(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    
    body = []
    
    # Obj 1: Catalog
    body.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    
    # Obj 2: Pages Tree
    body.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n")
    
    # Obj 5: Font Helvetica
    body.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n")
    
    # Obj 6: Font Helvetica-Bold
    body.append(b"6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n")
    
    # Page 1 Stream Content
    page1_text = """BT
/F6 18 Tf
40 800 Td
(NyayaKavach - Technical Architecture & Solution) Tj
ET
BT
/F5 10 Tf
40 782 Td
(PS-SIH26190 | Ministry of Home Affairs | Secure Document Vault) Tj
ET
BT
/F6 12 Tf
40 755 Td
(1. Executive Summary & Problem Alignment) Tj
ET
BT
/F5 9.5 Tf
40 738 Td
(Law enforcement agencies, courts, and forensic labs handle massive volumes of sensitive) Tj
0 -13 Td
(records (FIRs, Charge Sheets, Witness Statements, Forensic Reports). NyayaKavach provides an) Tj
0 -13 Td
(AI-driven, Zero-Trust, Blockchain-anchored digital vault providing 100% tamper proofing,) Tj
0 -13 Td
(automated metadata indexing, and BSA 2023 / Sec 65B IT Act legal compliance.) Tj
ET
BT
/F6 12 Tf
40 665 Td
(2. Recommended Tech Stack Selection) Tj
ET
BT
/F5 9 Tf
40 648 Td
(Frontend & UI: React.js, TailwindCSS, PDF.js, Flutter (Field Mobile Scan App)) Tj
0 -13 Td
(Backend API: Node.js (Fastify), Go (API Gateway), Python FastAPI (AI Microservices)) Tj
0 -13 Td
(AI & Digitization: PaddleOCR, LayoutLM, Llama-3 Legal NLP (Hindi/English PII Redaction)) Tj
0 -13 Td
(Search Engine: Elasticsearch & Milvus Vector DB (Hybrid Semantic Search)) Tj
0 -13 Td
(Encrypted Vault: MinIO / AWS S3 Sovereign Cloud (AES-256-GCM Envelope Encryption)) Tj
0 -13 Td
(Audit Ledger: Hyperledger Fabric Consortium Blockchain (SHA-256 Merkle Hash Log)) Tj
0 -13 Td
(eSign & PKI: CDAC eSign, Aadhaar eKYC, X.509 PKI Certificates) Tj
ET
BT
/F6 12 Tf
40 535 Td
(3. High-Level Architecture Topology) Tj
ET
BT
/F5 8.5 Tf
40 518 Td
([Clients: Police, FSL, Prosecutor, Court] -> [Security Gateway: WAF + Keycloak IAM + ABAC Engine]) Tj
0 -13 Td
(  -> [Microservices: API Gateway + AI OCR + Elasticsearch + eSign Service]) Tj
0 -13 Td
(  -> [Data Layer: PostgreSQL Metadata + MinIO AES-256 Vault + Hyperledger Fabric Ledger]) Tj
ET
BT
/F6 12 Tf
40 455 Td
(4. Technical Workflow & Data Lifecycle) Tj
ET
BT
/F5 9 Tf
40 438 Td
(1. Ingestion: Scan FIR/Forensics -> AI OCR extracts metadata & auto-redacts victim PII.) Tj
0 -13 Td
(2. Encryption: Client-side AES-256-GCM envelope encryption -> Save to MinIO Storage.) Tj
0 -13 Td
(3. Blockchain Anchoring: SHA-256 Hash + Officer ID + Timestamp -> Hyperledger Fabric Ledger.) Tj
0 -13 Td
(4. Zero-Trust Access: Role-Based Access Control (ABAC) with Dynamic Viewer Watermarking.) Tj
0 -13 Td
(5. Judicial Admissibility: Real-time SHA-256 verification + 1-Click BSA 2023 Sec 65B Certificate.) Tj
ET
"""
    stream1_bytes = page1_text.encode('latin1')
    body.append(f"7 0 obj\n<< /Length {len(stream1_bytes)} >>\nstream\n".encode('latin1') + stream1_bytes + b"\nendstream\nendobj\n")
    
    # Obj 3: Page 1
    body.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F5 5 0 R /F6 6 0 R >> >> /Contents 7 0 R >>\nendobj\n")
    
    # Page 2 Stream Content (Poster Grid)
    page2_text = """BT
/F6 18 Tf
40 800 Td
(SIH Poster Content & Grid Layout) Tj
ET
BT
/F5 10 Tf
40 782 Td
(Problem Statement ID: PS-SIH26190 | Ministry of Home Affairs) Tj
ET
BT
/F6 11 Tf
40 750 Td
(PANEL 1: Problem Statement & Bottlenecks) Tj
ET
BT
/F5 9 Tf
40 735 Td
(- Physical & digital fragmentation across police stations, forensic labs, and courts.) Tj
0 -13 Td
(- Tampering and backdating risks due to lack of cryptographic audit logs.) Tj
0 -13 Td
(- PII exposure of protected witnesses and victims.) Tj
0 -13 Td
(- Delays in judicial proceedings and inter-departmental transfers.) Tj
ET
BT
/F6 11 Tf
40 660 Td
(PANEL 2: Proposed Solution (NyayaKavach)) Tj
ET
BT
/F5 9 Tf
40 645 Td
(- Sovereign digital vault for criminal justice document lifecycle.) Tj
0 -13 Td
(- Hyperledger Fabric blockchain ledger providing 100% tamper proof auditability.) Tj
0 -13 Td
(- AI multi-lingual OCR & automated victim PII redaction.) Tj
0 -13 Td
(- Fine-grained Attribute-Based Access Control (ABAC) with dynamic watermarking.) Tj
ET
BT
/F6 11 Tf
40 570 Td
(PANEL 3 & 4: Innovations & Legal Compliance) Tj
ET
BT
/F5 9 Tf
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
/F6 11 Tf
40 480 Td
(PANEL 5 & 6: Measurable Impact Metrics) Tj
ET
BT
/F6 13 Tf
40 455 Td
(80% Faster Search   |   100% Tamper Proof   |   90% Paperless Transition) Tj
ET
BT
/F5 9 Tf
40 425 Td
(NyayaKavach Project Proposal - Smart India Hackathon (SIH) 2026) Tj
ET
"""
    stream2_bytes = page2_text.encode('latin1')
    body.append(f"8 0 obj\n<< /Length {len(stream2_bytes)} >>\nstream\n".encode('latin1') + stream2_bytes + b"\nendstream\nendobj\n")
    
    # Obj 4: Page 2
    body.append(b"4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F5 5 0 R /F6 6 0 R >> >> /Contents 8 0 R >>\nendobj\n")
    
    # Calculate byte offsets
    offsets = {}
    current_offset = len(pdf_content[0])
    
    for obj_bytes in body:
        # extract obj number
        obj_num = int(obj_bytes.split(b" ")[0])
        offsets[obj_num] = current_offset
        current_offset += len(obj_bytes)
        pdf_content.append(obj_bytes)
        
    start_xref = current_offset
    max_obj = max(offsets.keys())
    
    xref_str = f"xref\n0 {max_obj + 1}\n0000000000 65535 f \n"
    for i in range(1, max_obj + 1):
        xref_str += f"{offsets[i]:010d} 00000 n \n"
        
    trailer_str = f"trailer\n<< /Size {max_obj + 1} /Root 1 0 R >>\nstartxref\n{start_xref}\n%%EOF\n"
    
    pdf_content.append(xref_str.encode('latin1'))
    pdf_content.append(trailer_str.encode('latin1'))
    
    with open(filename, "wb") as f:
        f.write(b"".join(pdf_content))
        
    print(f"Valid PDF written to {filename} ({os.path.getsize(filename)} bytes)")

ws_pdf = "/Users/kushalkothari/Downloads/f1-predictor/Avishkar/NyayaKavach_SIH26190_Solution_and_Poster.pdf"
brain_pdf = "/Users/kushalkothari/.gemini/antigravity/brain/dc72526c-dbd0-4086-ace3-d47d8ef457ef/NyayaKavach_SIH26190_Solution_and_Poster.pdf"

create_valid_pdf(ws_pdf)
import shutil
shutil.copyfile(ws_pdf, brain_pdf)
