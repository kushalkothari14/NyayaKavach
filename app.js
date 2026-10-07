// NyayaKavach Application Logic & System Simulator

// Mock Sample Legal Documents Dataset
const sampleDocs = {
  fir: {
    type: "First Information Report (FIR)",
    caseId: "FIR-2026-DL-8849",
    sections: "BNS Section 304, Section 316 / Arms Act 25",
    station: "Connaught Place PS, New Delhi",
    piiStatus: "Victim & Informant Identity Auto-Redacted",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    header: "FORM NO. 1 - FIRST INFORMATION REPORT",
    subHeader: "(Under Section 173 Bharatiya Nagarik Suraksha Sanhita, 2023)",
    summary: "On 04/09/2026 at approximately 13:15 hours, officers responded to a reported incident near Block-C Connaught Place. Physical evidence recovered includes one 9mm cartridge casing and scanned ledger notes.",
    redactedText: "[REDACTED WITNESS STATEMENT - ACCESSIBLE ONLY TO INVESTIGATING OFFICER & PROSECUTION]",
    unredactedText: "Witness Statements: Witness Ramesh Kumar identified suspect vehicle DL-01-AB-1234 exiting location at 13:20 hrs.",
    fslRef: "FSL-DEL-2026-9912. Digital evidence seized and cryptographically hashed on-site."
  },
  fsl: {
    type: "Forensic Ballistics & Chemical Report",
    caseId: "FSL-2026-DL-9912",
    sections: "Bharatiya Sakshya Adhiniyam Sec 45 / Arms Act",
    station: "Central Forensic Science Lab (CFSL), Delhi",
    piiStatus: "FSL Expert Digital Signature Certified",
    hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    header: "EXPERT FORENSIC BALLISTICS & TRACE ANALYSIS",
    subHeader: "(Certified under Sec 329 Bharatiya Nagarik Suraksha Sanhita, 2023)",
    summary: "Microscopic analysis of 9mm cartridge casing #FSL-9912 confirms match with seized firearm #AR-9012. Striation marks exhibit identical lands and grooves.",
    redactedText: "[REDACTED DNA PROFILING MATCH - CONFIDENTIAL RESTRICTED TO COURT & IO]",
    unredactedText: "DNA Match Analysis: Epithelial DNA recovered from trigger assembly matches Accused Profile ID #DB-8819 (99.98% probability).",
    fslRef: "Chain of Custody ID: FSL-COC-2026-0041."
  },
  chargesheet: {
    type: "Final Investigation Charge Sheet",
    caseId: "CS-2026-DL-0402",
    sections: "BNS 304 (Culpable Homicide), 316, 61 (Criminal Conspiracy)",
    station: "Special Cell, Delhi Police",
    piiStatus: "Charge Sheet Sealed for Judicial Review",
    hash: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
    header: "FINAL CHARGE SHEET UNDER BNS SEC 193",
    subHeader: "(In the Court of Chief Metropolitan Magistrate, Patiala House)",
    summary: "Investigation complete against Accused #1 and Accused #2. Prima facie evidence established through FSL report, call data records (CDR), and CCTV footage.",
    redactedText: "[REDACTED PROTECTED WITNESS LIST (SECTION 84 BNS)]",
    unredactedText: "Protected Witnesses: Witness A & Witness B statements recorded under BNS Sec 183 before Magistrate.",
    fslRef: "Submitted with 14 Annexures and SHA-256 Evidence Manifest."
  }
};

let currentDocKey = "fir";
let currentRole = "judge";
let isTampered = false;

// Initial Blockchain Audit Ledger Dataset
let ledgerData = [
  {
    txId: "0x8f19a...91a2",
    time: "2026-09-09 21:15:10",
    docId: "FIR-2026-DL-8849",
    action: "INGEST & eSIGN",
    actor: "IO_CP_Station (Police)",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "VALID"
  },
  {
    txId: "0x9c41b...33e4",
    time: "2026-09-09 21:40:22",
    docId: "FSL-2026-DL-9912",
    action: "FORENSIC UPLOAD",
    actor: "CFSL_Expert_Dr_Sharma",
    hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    status: "VALID"
  },
  {
    txId: "0xa117f...88c9",
    time: "2026-09-09 22:02:05",
    docId: "FIR-2026-DL-8849",
    action: "JUDICIAL REVIEW",
    actor: "Magistrate_PatialaHouse",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "VALID"
  }
];

// Initialize Dashboard on Load
document.addEventListener("DOMContentLoaded", () => {
  renderLedger();
  updateRolePermissions();
});

// Switch Tab Navigation
function switchTab(tabId) {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));

  document.getElementById(`tab-${tabId}`).classList.add("active");
  document.getElementById(`view-${tabId}`).classList.add("active");
}

// Load Pre-defined Sample Document
function loadSampleDoc(key) {
  currentDocKey = key;
  isTampered = false;

  document.querySelectorAll(".sample-btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  simulateIngestProgress();
}

// Simulate AI Ingestion & Progress Bar Animation
function simulateIngestProgress() {
  const progressBox = document.getElementById("ingest-progress");
  const progressFill = document.getElementById("progress-fill");
  const progressStatus = document.getElementById("progress-status");

  progressBox.style.display = "block";
  progressFill.style.width = "0%";
  progressStatus.innerText = "Extracting document layout via PaddleOCR...";

  setTimeout(() => {
    progressFill.style.width = "45%";
    progressStatus.innerText = "Parsing BNS/IPC sections & identifying sensitive PII...";
  }, 400);

  setTimeout(() => {
    progressFill.style.width = "85%";
    progressStatus.innerText = "Computing SHA-256 Envelope Hash Digest...";
  }, 800);

  setTimeout(() => {
    progressFill.style.width = "100%";
    progressStatus.innerText = "Ingestion Complete!";
    setTimeout(() => {
      progressBox.style.display = "none";
      updateDocMetadata();
      renderDocumentPaper();
    }, 300);
  }, 1200);
}

// File Upload Handlers & Web Crypto SHA-256 Computation
function triggerFileUpload() {
  document.getElementById("file-input").click();
}

async function handleFileSelect(e) {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    
    // Read file bytes and compute SHA-256 hash using Web Crypto API
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Register uploaded document dynamically
    const customKey = "custom_" + Date.now();
    sampleDocs[customKey] = {
      type: `Uploaded File (${file.name})`,
      caseId: `UPLOAD-${Math.floor(1000 + Math.random() * 9000)}`,
      sections: "BNS Evidence Audit / Section 63",
      station: "Uploaded Document Registry",
      piiStatus: "PII Auto-Scanned & Validated",
      hash: hashHex,
      header: file.name.toUpperCase(),
      subHeader: "(Uploaded Digital Evidence Document)",
      summary: `File "${file.name}" uploaded (Size: ${(file.size / 1024).toFixed(2)} KB). Cryptographically hashed and indexed.`,
      redactedText: "[REDACTED CONFIDENTIAL ATTACHMENT]",
      unredactedText: `Attachment Details: SHA-256 verified fingerprint (${hashHex.substring(0, 16)}...).`,
      fslRef: `Uploaded file size: ${file.size} bytes.`
    };

    currentDocKey = customKey;
    isTampered = false;
    simulateIngestProgress();
  }
}

// Update Metadata Display Panel
function updateDocMetadata() {
  const doc = sampleDocs[currentDocKey];
  document.getElementById("m-type").innerText = doc.type;
  document.getElementById("m-case").innerText = doc.caseId;
  document.getElementById("m-sections").innerText = doc.sections;
  document.getElementById("m-station").innerText = doc.station;
  document.getElementById("m-pii").innerHTML = `<i data-lucide="eye-off"></i> ${doc.piiStatus}`;
  document.getElementById("m-hash").innerText = isTampered ? "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" : doc.hash;

  if (window.lucide) lucide.createIcons();
}

// Change Active User Role & Update Permission Matrix
function changeUserRole() {
  currentRole = document.getElementById("user-role-select").value;
  updateRolePermissions();
  renderDocumentPaper();
}

function updateRolePermissions() {
  const accessBadge = document.getElementById("access-badge");
  const roleBadge = document.getElementById("role-badge");

  const roleLabels = {
    police: "Investigating Officer (Police)",
    fsl: "Forensic Expert (FSL)",
    prosecutor: "Public Prosecutor",
    judge: "Magistrate / Judge",
    defense: "Defense Counsel"
  };

  roleBadge.innerText = `Role: ${roleLabels[currentRole]}`;

  if (currentRole === "defense" && currentDocKey === "fsl") {
    accessBadge.className = "badge badge-warning";
    accessBadge.innerText = "Permission: Redacted Restricted";
  } else {
    accessBadge.className = "badge badge-success";
    accessBadge.innerText = "Permission: Granted";
  }

  // Update Dynamic Watermark Overlay
  const watermark = document.getElementById("watermark");
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  watermark.innerText = `RESTRICTED COPY • ACCESS BY: ${currentRole.toUpperCase()}_USER • IP: 10.240.12.${Math.floor(Math.random()*90 + 10)} • ${timestamp}`;
}

// Render Document Paper Preview
function renderDocumentPaper() {
  const doc = sampleDocs[currentDocKey];
  const paper = document.getElementById("doc-paper-content");

  let redactedContent = doc.redactedText;
  if (currentRole === "police" || currentRole === "prosecutor" || currentRole === "judge") {
    redactedContent = `<span style="color:#059669; font-weight:bold;">[UNREDACTED FOR ${currentRole.toUpperCase()}]: ${doc.unredactedText}</span>`;
  }

  paper.innerHTML = `
    <div class="doc-header-stamp">
      <h2>${doc.header}</h2>
      <p>${doc.subHeader}</p>
    </div>
    <hr style="margin: 12px 0; border:0; border-top:1px solid #cbd5e1;">
    <div class="doc-content-body">
      <p><strong>Case Reference:</strong> ${doc.caseId} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Authority:</strong> ${doc.station}</p>
      <p><strong>Acts & Sections:</strong> ${doc.sections}</p>
      <hr style="margin: 10px 0; border:0; border-top:1px dashed #cbd5e1;">
      <p><strong>Summary:</strong> ${doc.summary}</p>
      <div class="redacted-block">${redactedContent}</div>
      <p style="margin-top:10px;"><strong>Reference Notes:</strong> ${doc.fslRef}</p>
    </div>
    <div class="doc-footer-stamp">
      <div class="stamp-box">
        <i data-lucide="check-circle-2" class="stamp-icon"></i>
        <span>DIGITALLY SIGNED & eSEALED<br><small>Aadhaar eSign Certificate ID: CDAC-PKI-98412</small></span>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// Anchor Current Hash to Hyperledger Blockchain Ledger
function anchorToBlockchain() {
  const doc = sampleDocs[currentDocKey];
  const randomTx = "0x" + Math.random().toString(16).substr(2, 8) + "..." + Math.random().toString(16).substr(2, 4);
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  ledgerData.unshift({
    txId: randomTx,
    time: now,
    docId: doc.caseId,
    action: "MANUAL ANCHOR",
    actor: `${currentRole.toUpperCase()}_OFFICER`,
    hash: doc.hash,
    status: "VALID"
  });

  renderLedger();
  alert(`Document Hash ${doc.hash.substring(0, 16)}... anchored to Hyperledger Fabric with TxID: ${randomTx}`);
}

// Simulate Tamper Attack Test
function simulateTamper() {
  isTampered = true;
  const doc = sampleDocs[currentDocKey];
  const tamperedHash = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const randomTx = "0xTAMPERED_" + Math.random().toString(16).substr(2, 6);
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  document.getElementById("m-hash").innerText = tamperedHash;
  document.getElementById("m-hash").style.color = "#ef4444";

  // Show Red Alert Banner
  document.getElementById("security-alert-banner").style.display = "flex";

  ledgerData.unshift({
    txId: randomTx,
    time: now,
    docId: doc.caseId,
    action: "UNAUTHORIZED MODIFICATION DETECTED",
    actor: "MALICIOUS_ATTACKER",
    hash: tamperedHash,
    status: "TAMPERED"
  });

  renderLedger();
}

function dismissAlert() {
  document.getElementById("security-alert-banner").style.display = "none";
}

// Filter Blockchain Audit Ledger
function filterLedger() {
  const query = document.getElementById("ledger-search").value.toLowerCase();
  renderLedger(query);
}

// Render Blockchain Ledger Table
function renderLedger(filterQuery = "") {
  const tbody = document.getElementById("ledger-rows");
  tbody.innerHTML = "";

  const filtered = ledgerData.filter(row => {
    if (!filterQuery) return true;
    return row.txId.toLowerCase().includes(filterQuery) ||
           row.docId.toLowerCase().includes(filterQuery) ||
           row.actor.toLowerCase().includes(filterQuery) ||
           row.action.toLowerCase().includes(filterQuery);
  });

  filtered.forEach(row => {
    const isError = row.status === "TAMPERED";
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><code>${row.txId}</code></td>
      <td>${row.time}</td>
      <td><strong>${row.docId}</strong></td>
      <td><span class="badge ${isError ? 'badge-danger' : 'badge-outline'}">${row.action}</span></td>
      <td>${row.actor}</td>
      <td><code>${row.hash.substring(0, 24)}...</code></td>
      <td>
        <span class="badge ${isError ? 'badge-danger' : 'badge-success'}">
          ${isError ? '🚨 TAMPER ALERT' : '✓ VERIFIED MATCH'}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// BSA 2023 Sec 65B Modal Generator
function generateSec65B() {
  const doc = sampleDocs[currentDocKey];
  const modal = document.getElementById("cert-modal");
  const modalContent = document.getElementById("modal-content");
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  modalContent.innerHTML = `
    <div style="font-family: var(--font-sans); color: #f1f5f9; line-height: 1.6;">
      <h4 style="color: var(--primary); text-align: center; margin-bottom: 12px;">CERTIFICATE UNDER SECTION 63 OF BHARATIYA SAKSHYA ADHINIYAM, 2023</h4>
      <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">(Admissibility of Electronic Records - Formerly Sec 65B Indian Evidence Act 1872)</p>
      <hr style="border:0; border-top:1px solid var(--border-color); margin: 12px 0;">
      
      <p>I, <strong>System Administrator / Officer (${currentRole.toUpperCase()})</strong>, certify the following regarding document <strong>${doc.caseId}</strong>:</p>
      
      <ul style="margin: 12px 0 12px 20px; font-size: 0.85rem;">
        <li><strong>Document Name / Type:</strong> ${doc.type}</li>
        <li><strong>Issuing Authority / Station:</strong> ${doc.station}</li>
        <li><strong>SHA-256 Cryptographic Hash:</strong> <code>${doc.hash}</code></li>
        <li><strong>Computer Device ID:</strong> <code>NYAYAKAVACH-NODE-04 (10.240.12.89)</code></li>
        <li><strong>Verification Timestamp:</strong> ${now} UTC</li>
        <li><strong>Ledger Integrity Verification:</strong> ${isTampered ? '<strong style="color:#ef4444;">FAILED - TAMPER DETECTED</strong>' : '<strong style="color:#10b981;">PASSED - UNTAMPERED & AUTHENTIC</strong>'}</li>
      </ul>

      <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 0.8rem;">
        <p>This electronic output was produced by the computer system during the period over which the computer was used regularly to store and process information for official criminal investigation purposes.</p>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("cert-modal").style.display = "none";
}
