# 🍼 Newborn Medications & Vaccinations — Patient Teaching App

A bright, parent-friendly web app for patient teaching on standard newborn preventive treatments: **Hepatitis B vaccine**, **Vitamin K injection**, and **Erythromycin eye ointment**.

Includes three main sections:
- 🧾 **Information** — easy-to-read explanations of each medication and vaccine
- 🧠 **Quiz** — short self-assessment to check understanding
- ✅ **Checklist** — save or download your own care discussion notes

This project is written entirely in **vanilla HTML, CSS, and JavaScript**, designed for simple hosting on **GitHub Pages**.

---

## 🌈 Features
- Mobile‑friendly responsive layout
- No frameworks required — runs directly in browser
- Data persistence using `localStorage`
- Downloadable text summary of checklist
- Accessibility-friendly markup with keyboard navigation
- CSS‑only tab routing (`:target`) for reliability even without JavaScript

---

## 📁 Folder structure
```
newbornmeds/
├── index.html       # main app
├── style.css        # bright parent-friendly styles
├── script.js        # quiz and checklist logic
└── README.md        # documentation (this file)
```

---

## 🚀 How to publish on GitHub Pages

1. **Create a repository** on GitHub (example: `newbornmeds`).
2. **Upload** `index.html`, `style.css`, `script.js`, and `README.md` to the **root** (not inside folders).
3. Go to **Settings → Pages → Build and deployment**:
   - Source → `Deploy from a branch`
   - Branch → `main`
   - Folder → `/ (root)`
4. Click **Save**, then wait ~1 minute.
5. Visit your site at:
   ```
   https://<your-username>.github.io/newbornmeds/
   ```

---

## 🧩 Troubleshooting

| Issue | Cause | Fix |
|-------|--------|-----|
| The site only shows the README | You opened the repo view, not the Page | Visit the GitHub Pages URL, not the repo URL |
| Tabs don’t switch | Check `style.css` includes the `:target` rules and sections don’t have `hidden` | Ensure files are uploaded correctly |
| Checklist not saving | Browser storage blocked | Enable cookies/localStorage in your browser |
| Changes not showing | Cache from previous deploy | Hard refresh (`Ctrl+Shift+R`) or clear site cache |

---

## 💡 Credits
Developed by **Phuong‑Anh Pham** for patient education at the Patricia A. Chin School of Nursing, California State University, Los Angeles.

Content references:
- CDC (2024). *Immunization Schedules and Guidelines.*
- American Academy of Pediatrics (2023). *Vitamin K and Newborn Prophylaxis.*

---

### 🩵 License
This project is released under the MIT License. You’re free to use, modify, and share it for educational purposes.

