import os

def create_pitch_pdf(filename):
    pdf_content = []
    
    # 1. Header
    pdf_content.append(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    body = []
    
    # Obj 1: Catalog
    body.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    
    # Obj 2: Pages Tree
    body.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >>\nendobj\n")
    
    # Obj 6: Font Helvetica
    body.append(b"6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n")
    
    # Obj 7: Font Helvetica-Bold
    body.append(b"7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n")
    
    # PAGE 1 STREAM: INTRODUCTION & SYSTEM OVERVIEW
    p1_text = """BT
/F7 18 Tf
40 800 Td
(NyayaKavach - Project Overview & Solution Brief) Tj
ET
BT
/F6 10 Tf
40 782 Td
(Problem Statement PS-SIH26190 | Ministry of Home Affairs) Tj
ET
BT
/F7 12 Tf
40 755 Td
(1. Introduction) Tj
ET
BT
/F6 9.5 Tf
40 738 Td
(NyayaKavach is an AI-driven, Zero-Trust, Blockchain-anchored Digital Document Management) Tj
0 -13 Td
(System engineered specifically for the Indian criminal justice ecosystem. It enables law) Tj
0 -13 Td
(enforcement agencies, forensic science laboratories (FSL), prosecutors, and courts to securely) Tj
0 -13 Td
(store, organize, retrieve, share, and digitally verify sensitive legal and investigation documents) Tj
0 -13 Td
((FIRs, Charge Sheets, Witness Statements, Forensic Reports, Court Judgments).) Tj
ET
BT
/F7 12 Tf
40 655 Td
(2. What Are We Trying to Make?) Tj
ET
BT
/F6 9.5 Tf
40 638 Td
(We are creating a legally binding, tamper-proof, intelligent digital evidence pipeline that solves:) Tj
0 -13 Td
(  - Paper & Digital Silos: Replaces lost paper records with digital searchability.) Tj
0 -13 Td
(  - Evidence Tampering: Prevents unauthorized edits and backdating using SHA-256 hashes.) Tj
0 -13 Td
(  - PII & Witness Leaks: Auto-redacts victim identities and sensitive witness statements.) Tj
0 -13 Td
(  - Judicial Delays: Automates Bharatiya Sakshya Adhiniyam (BSA) 2023 Sec 65B compliance.) Tj
ET
BT
/F7 12 Tf
40 555 Td
(3. Entire System Flow (Step-by-Step)) Tj
ET
BT
/F6 9 Tf
40 538 Td
(Step 1: Document Ingestion - Mobile scan at crime scene or web upload at Police Station.) Tj
0 -13 Td
(Step 2: AI OCR & PII Redaction - PaddleOCR extracts text; LayoutLM auto-redacts victim PII.) Tj
0 -13 Td
(Step 3: Encrypted Storage - AES-256 envelope encryption saved to MinIO Sovereign Cloud.) Tj
0 -13 Td
(Step 4: Blockchain Anchoring - eSigned & SHA-256 hash anchored to Hyperledger Fabric.) Tj
0 -13 Td
(Step 5: Judicial Admissibility - Real-time hash check + 1-Click BSA 2023 Sec 65B Certificate.) Tj
ET
BT
/F7 12 Tf
40 450 Td
(4. Recommended Technology Stack) Tj
ET
BT
/F6 9 Tf
40 433 Td
(Frontend: React.js, TailwindCSS, PDF.js, Flutter Mobile App) Tj
0 -13 Td
(Backend: Node.js (Fastify), Go API Gateway, Python FastAPI AI Microservices) Tj
0 -13 Td
(AI Engines: PaddleOCR, LayoutLM, Llama-3 NLP (Multi-Lingual OCR & PII Redaction)) Tj
0 -13 Td
(Storage & Crypto: MinIO Cloud Vault (AES-256-GCM), Keycloak IAM, Aadhaar eSign) Tj
0 -13 Td
(Ledger: Hyperledger Fabric Consortium Blockchain (Tamper-Proof Audit Trail)) Tj
ET
"""
    st1 = p1_text.encode('latin1')
    body.append(f"8 0 obj\n<< /Length {len(st1)} >>\nstream\n".encode('latin1') + st1 + b"\nendstream\nendobj\n")
    body.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F6 6 0 R /F7 7 0 R >> >> /Contents 8 0 R >>\nendobj\n")

    # PAGE 2 STREAM: EXISTING SYSTEMS VS NYAYAKAVACH
    p2_text = """BT
/F7 18 Tf
40 800 Td
(Existing Systems vs. NyayaKavach) Tj
ET
BT
/F6 10 Tf
40 782 Td
(Comparative Analysis for SIH Poster Presentation) Tj
ET
BT
/F7 12 Tf
40 750 Td
(Comparative Matrix) Tj
ET
BT
/F7 10 Tf
40 725 Td
(Feature / Metric                 Existing Systems (CCTNS / e-Courts)      NyayaKavach) Tj
ET
BT
/F6 9 Tf
40 705 Td
(CCTNS Integration              Tracks police records; lacks blockchain.   Fully integrated + Hyperledger Fabric.) Tj
0 -14 Td
(e-Courts Portal               Manages case lists; no raw evidence chain.  End-to-end Police -> FSL -> Court chain.) Tj
0 -14 Td
(Tamper Prevention             Vulnerable to admin edits; no crypto logs. 0% Tamper risk via SHA-256 hash checks.) Tj
0 -14 Td
(PII Protection                 Manual blacking out (prone to errors).    Automated AI LayoutLM PII Redaction.) Tj
0 -14 Td
(BSA 2023 / 65B Compliance      Manual paper filing; severe delays.        1-Click Automated e-Certificate.) Tj
0 -14 Td
(Dynamic Watermarking          None; vulnerable to screenshot leaks.     Overlays Viewer ID, IP & Timestamp.) Tj
ET
BT
/F7 12 Tf
40 600 Td
(Key Differentiators & Competitive Advantage) Tj
ET
BT
/F6 9 Tf
40 583 Td
(1. Complete Chain of Custody: Connects Police Stations, FSL Labs, Prosecutors & Courts.) Tj
0 -14 Td
(2. Instant Cryptographic Verification: Real-time validation against Hyperledger Blockchain.) Tj
0 -14 Td
(3. Automated BSA 2023 Compliance: Generates Section 63/65B certificates automatically.) Tj
0 -14 Td
(4. Zero-Knowledge Proof Evidence: Court verifies document integrity without decrypting file.) Tj
ET
"""
    st2 = p2_text.encode('latin1')
    body.append(f"9 0 obj\n<< /Length {len(st2)} >>\nstream\n".encode('latin1') + st2 + b"\nendstream\nendobj\n")
    body.append(b"4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F6 6 0 R /F7 7 0 R >> >> /Contents 9 0 R >>\nendobj\n")

    # PAGE 3 STREAM: POSTER PRESENTATION SCRIPT
    p3_text = """BT
/F7 18 Tf
40 800 Td
(Poster Competition Presentation Script) Tj
ET
BT
/F6 10 Tf
40 782 Td
(Word-for-Word 3-Minute Pitch Script for Hackathon Judges) Tj
ET
BT
/F7 11 Tf
40 750 Td
([0:00 - 0:30] The Hook & Problem) Tj
ET
BT
/F6 8.5 Tf
40 735 Td
("Good day judges. In our legal system, justice is frequently delayed due to document handling.) Tj
0 -12 Td
(Today, millions of FIRs and forensic reports exist as physical paper or unencrypted files,) Tj
0 -12 Td
(causing lost records, evidence tampering, and victim identity leaks. NyayaKavach solves this.") Tj
ET
BT
/F7 11 Tf
40 685 Td
([0:30 - 1:15] What is NyayaKavach?) Tj
ET
BT
/F6 8.5 Tf
40 670 Td
("NyayaKavach is a Sovereign, AI-Powered, Zero-Trust Legal Vault anchored on Blockchain.) Tj
0 -12 Td
(It creates an immutable chain-of-custody connecting Police, FSL Labs, Prosecutors & Courts.") Tj
ET
BT
/F7 11 Tf
40 620 Td
([1:15 - 2:00] Technical Flow & Architecture) Tj
ET
BT
/F6 8.5 Tf
40 605 Td
("1. Ingestion & AI: PaddleOCR digitizes multi-lingual text; LayoutLM auto-redacts victim PII.) Tj
0 -12 Td
( 2. Vault & Blockchain: Encrypted with AES-256 and anchored to Hyperledger Fabric Blockchain.) Tj
0 -12 Td
( 3. Court Access: Judge performs real-time hash check & generates BSA 2023 Sec 65B Certificate.") Tj
ET
BT
/F7 11 Tf
40 555 Td
([2:00 - 2:30] Why We Outperform Existing Systems) Tj
ET
BT
/F6 8.5 Tf
40 540 Td
("CCTNS and e-Courts do not provide tamper-proof evidence custody. NyayaKavach guarantees) Tj
0 -12 Td
(zero tampering via SHA-256 hash validation and automates legal evidence compliance.") Tj
ET
BT
/F7 11 Tf
40 490 Td
([2:30 - 3:00] Conclusion & Impact Metrics) Tf
ET
BT
/F6 8.5 Tf
40 475 Td
("NyayaKavach delivers 80% faster search, 100% tamper prevention, and 90% paperless transition.) Tj
0 -12 Td
(Thank you, and we are open for your questions!") Tj
ET
"""
    st3 = p3_text.encode('latin1')
    body.append(f"10 0 obj\n<< /Length {len(st3)} >>\nstream\n".encode('latin1') + st3 + b"\nendstream\nendobj\n")
    body.append(b"5 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F6 6 0 R /F7 7 0 R >> >> /Contents 10 0 R >>\nendobj\n")

    # Calculate offsets
    offsets = {}
    current_offset = len(pdf_content[0])
    for obj_bytes in body:
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
        
    print(f"Pitch PDF successfully generated at {filename} ({os.path.getsize(filename)} bytes)")

ws_pdf = "/Users/kushalkothari/Downloads/f1-predictor/Avishkar/NyayaKavach_Poster_Presentation_and_Overview.pdf"
brain_pdf = "/Users/kushalkothari/.gemini/antigravity/brain/dc72526c-dbd0-4086-ace3-d47d8ef457ef/NyayaKavach_Poster_Presentation_and_Overview.pdf"

create_pitch_pdf(ws_pdf)
import shutil
shutil.copyfile(ws_pdf, brain_pdf)
