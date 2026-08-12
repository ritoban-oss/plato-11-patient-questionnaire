# PLATO-11 Patient Questionnaire App

Digital version of the Patient-Reported Longitudinal Assessment Tool for OSA — 11 Item (PLATO-11).  
© AASM, 2024 · United States/English

---

## Setup

Same process as the DISE Variability Study app:

1. Open your Google Sheet → **Extensions → Apps Script**
2. Paste `apps-script.gs`, save, deploy as Web App (Execute as Me, Anyone)
3. Copy the `/exec` URL into `config.js` → `SCRIPT_URL`
4. Push to GitHub, enable Pages

Health check: opening the `/exec` URL in a browser should return `{"status":"ready","message":"PLATO-11 collector is active."}`.

---

## What the Sheet records

Each patient submission creates one row in the **PLATO-11 Responses** tab with the following columns:

| Column | Description |
|---|---|
| Timestamp | ISO 8601 datetime of submission |
| First Name / Last Name | Patient-entered name |
| A1–A8 Score | Numeric 0–4 per item (0=Never, 4=Always) |
| A1–A8 Label | Word label (Never/Rarely/Sometimes/Often/Always) |
| Section A Total | Sum of A1–A8 (range 0–32; higher = worse daytime symptoms) |
| B1–B2 Score | Numeric 0–4 per item |
| B1–B2 Label | Word label |
| Section B Total | Sum of B1–B2 (range 0–8; higher = worse night symptoms) |
| Sleep Quality (0–10) | Section C score (higher = better — note inverted direction) |

---

## Items

**Section A** — Daytime symptoms (past 7 days)
1. I felt tired
2. I felt sleepy
3. I felt exhausted
4. I felt irritable
5. I had morning headaches
6. I nodded off in the middle of participating in an activity
7. I nodded off when I was sitting quietly
8. It was difficult for me to concentrate

**Section B** — Night-time symptoms (past 7 nights)
1. I was told that I snored
2. I had difficulty staying asleep

**Section C** — Overall sleep quality (0–10 scale, 0=Poor, 10=Excellent)
