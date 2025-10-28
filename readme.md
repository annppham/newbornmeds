# Newborn Medications & Vaccinations – Patient Teaching App

## Overview
This is a simple, interactive web app built with **HTML, CSS, and JavaScript** designed for **patient teaching** about newborn preventive treatments: **Hepatitis B vaccine**, **Vitamin K injection**, and **Erythromycin eye ointment**. It provides educational content, a short self-assessment quiz, and a care checklist for families.

The app is optimized for new parents — lightweight, mobile-friendly, and visually designed with soft pastel tones for a welcoming and calming experience.

---

## Features
- **Information Page**: Easy-to-read explanations of each newborn medication/vaccine, why they’re recommended, and what to expect.
- **Interactive Quiz**: Simple multiple-choice questions with instant feedback and score calculation.
- **Checklist Page**: Lets users mark discussion items, document consent, record administration times, and add notes. Data is stored locally in the browser.
- **Bright Parent-Friendly Design**: Soft cream and pastel blues/greens with high readability and touch-friendly buttons.

---

## File Structure
```
newborn-teaching-app/
│
├── index.html          # Main app file
├── style.css           # (Optional) Stylesheet if you separate CSS
├── script.js           # (Optional) JavaScript if you separate scripts
└── README.md           # This documentation file
```

> The app works fully self-contained as a single HTML file or can be split into multiple files for cleaner maintenance.

---

## Setup Instructions
1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/<your-username>/newborn-teaching-app.git
   ```
2. **Open** `index.html` directly in your web browser.
3. No server or dependencies are required — it’s pure front-end code.

---

## How to Customize
- Edit the **information content** inside the `<section id="tab-info">` to match your hospital or clinic’s language.
- Adjust **quiz questions** and correct answers inside the `<section id="tab-quiz">`.
- Add or remove checklist items under `<section id="tab-checklist">`.
- Modify colors in the `:root` section of CSS for different themes.

---

## Deployment (GitHub Pages)
You can host this app easily for free using GitHub Pages:
1. Push your repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder.
4. Click **Save**.
5. Your app will be available at:
   ```
   https://<your-username>.github.io/newborn-teaching-app/
   ```

---

## Accessibility & Safety
- All text meets WCAG contrast guidelines for readability.
- Educational only — not a substitute for professional medical advice.
- Local data storage only (no network or server communication).

---

## License
This project is licensed under the **MIT License** — you’re free to use, modify, and distribute it with attribution.

---

## Author
Created with ❤️ for healthcare educators and new parents.

---
**Disclaimer:** This tool is for informational purposes only and not a replacement for medical consultation. Always follow your healthcare provider’s guidance.

