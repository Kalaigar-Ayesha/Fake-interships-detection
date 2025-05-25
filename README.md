# 🕵️‍♀️ Fake Internship Detector (MERN + TypeScript)

An AI-powered platform that detects potentially fake internship certificates or claims using natural language processing and validation logic. Built with the MERN stack and TypeScript, this tool helps employers, recruiters, and academic institutions verify internship experiences with confidence.


## 🧠 Features

- 📄 Upload internship certificate (PDF/Image) or enter internship details manually
- 🧠 AI validation using OpenAI API (GPT)
- 🏢 Company existence and domain relevance check
- 🧑‍🏫 Mentor verification (email/name consistency)
- 📊 AI-powered fraud score (0–100) with result labeling:
  - ✅ Likely Genuine
  - ⚠️ Suspicious
  - ❌ Likely Fake
- 📝 Downloadable PDF verification report
- 🔐 Secure user authentication (Login/Signup)
- 🧾 User dashboard with saved reports

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🔐 JWT-based Auth (via Axios)

### Backend
- 🟦 Node.js + Express (TypeScript)
- 🧠 OpenAI API Integration
- 🧾 PDFKit / Puppeteer for PDF generation
- 🗃️ MongoDB + Mongoose

---

