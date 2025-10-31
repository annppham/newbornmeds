// Newborn Meds & Vaccines – App logic
(function(){
  // --- Simple tab router ---
  const tabs = ["info", "quiz", "checklist"]; // identifiers

  function showTab(name){
    tabs.forEach(t => {
      const sec = document.getElementById(`tab-${t}`);
      const btn = document.querySelector(`.tabbtn[data-tab="${t}"]`);
      if(!sec || !btn) return;
      if(t===name){
        sec.removeAttribute('hidden');
        btn.setAttribute('aria-current','page');
      } else {
        sec.setAttribute('hidden','');
        btn.removeAttribute('aria-current');
      }
    });
    try { localStorage.setItem('nv-tab', name); } catch(e){}
  }

  function initTabs(){
    const tabButtons = document.querySelectorAll('.tabbtn');
    tabButtons.forEach(btn => btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-tab');
      // No hash updates to avoid jumping; just show the section.
      showTab(name);
    }));

    const fromHash = (location.hash || '').replace('#','');
    const saved = (function(){ try{return localStorage.getItem('nv-tab');}catch(e){return null;} })();
    const start = tabs.includes(fromHash) ? fromHash : (tabs.includes(saved) ? saved : 'info');
    showTab(start);
  }

// --- Quiz logic ---
function initQuiz(){
  const quizForm = document.getElementById('quiz-form');
  const quizResults = document.getElementById('quiz-results');
  if(!quizForm) return;

  function gradeQuiz(){
    const questions = Array.from(document.querySelectorAll('.q'));
    let correctCount = 0;
    const explanationsSummary = [];

    questions.forEach((box, i) => {
      const correctValue = box.getAttribute('data-answer'); // e.g. "a", "b", "c"
      const name = `q${i+1}`;
      const chosenInput = quizForm.querySelector(`input[name="${name}"]:checked`);
      const allChoices = Array.from(box.querySelectorAll('.choices label'));
      const explanation = box.querySelector('.explanation');

      // Clear old states first
      allChoices.forEach(label => {
        label.classList.remove('correct-choice','wrong-choice','user-choice');
      });

      // Highlight correct answer
      const correctInput = box.querySelector(`input[name="${name}"][value="${correctValue}"]`);
      if (correctInput && correctInput.parentElement) {
        correctInput.parentElement.classList.add('correct-choice');
      }

      // If the user picked something
      if (chosenInput) {
        // Mark the user's picked choice
        chosenInput.parentElement.classList.add('user-choice');

        // Check if correct
        const isCorrect = chosenInput.value === correctValue;
        if (isCorrect) {
          correctCount++;
        } else {
          // mark the user's choice as wrong if it's not the correct one
          chosenInput.parentElement.classList.add('wrong-choice');
        }

        explanationsSummary.push({
          number: i+1,
          status: isCorrect ? 'correct' : 'incorrect'
        });
      } else {
        // unanswered
        explanationsSummary.push({
          number: i+1,
          status: 'no answer'
        });
      }

      // Reveal explanation text under each question
      if (explanation) {
        explanation.hidden = false;
      }
    });

    const total = questions.length;
    const pct = Math.round((correctCount/total)*100);

    // Show overall results
    if (quizResults){
      quizResults.hidden = false;
      quizResults.innerHTML = `
        <div class="score-badge"><strong>Score:</strong> ${correctCount}/${total} (${pct}%)</div>
        <div class="per-question-status">
          ${explanationsSummary.map(e => `Q${e.number}: ${e.status}`).join(' • ')}
        </div>
      `;
      // scroll result badge into view
      quizResults.scrollIntoView({behavior:'smooth', block:'center'});
    }
  }

  quizForm.addEventListener('submit', e => {
    e.preventDefault();
    gradeQuiz();
  });

  const resetBtn = document.getElementById('resetQuiz');
  if(resetBtn){
    resetBtn.addEventListener('click', () => {
      // clear form
      quizForm.reset();

      // hide all explanations
      document.querySelectorAll('.explanation').forEach(exp => {
        exp.hidden = true;
      });

      // clear all highlight classes
      document.querySelectorAll('.choices label').forEach(label => {
        label.classList.remove('correct-choice','wrong-choice','user-choice');
      });

      // hide results box
      if (quizResults){
        quizResults.hidden = true;
        quizResults.innerHTML = '';
      }
    });
  }
}


  // --- Checklist persistence ---
  function initChecklist(){
    const STORAGE_KEY = 'nv-checklist-v1';
    const saveBtn = document.getElementById('saveChecklist');
    const dlBtn = document.getElementById('downloadChecklist');
    const clearBtn = document.getElementById('clearChecklist');

    function loadChecklist(){
      try{
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        document.querySelectorAll('[data-key]').forEach(el => {
          const key = el.getAttribute('data-key');
          if(el.type === 'checkbox') el.checked = !!saved[key];
          else if(el.type === 'datetime-local' || el.tagName === 'TEXTAREA' || el.type === 'text') el.value = saved[key] || '';
        });
      }catch(err){ console.warn('No saved checklist', err); }
    }

    function saveChecklist(){
      const data = {};
      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if(el.type === 'checkbox') data[key] = el.checked;
        else if(el.type === 'datetime-local' || el.tagName === 'TEXTAREA' || el.type === 'text') data[key] = el.value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      const s = document.getElementById('saveStatus');
      if(s){ s.textContent = 'Saved to this browser.'; setTimeout(()=> s.textContent = '', 2500); }
      return data;
    }

    function downloadChecklist(){
      const data = saveChecklist();
      const blob = new Blob([
        'Newborn Medications & Vaccinations Checklist\n',
        '-----------------------------------------\n',
        `Info reviewed: ${data.infoReviewed ? 'Yes' : 'No'}\n`,
        `Questions answered: ${data.questionsAnswered ? 'Yes' : 'No'}\n`,
        `Consent documented: ${data.consentDocumented ? 'Yes' : 'No'}\n`,
        `HepB given: ${data.hepbGiven ? 'Yes' : 'No'} ${data.hepbDateTime? '('+data.hepbDateTime+')':''}\n`,
        `Vitamin K given: ${data.vitkGiven ? 'Yes' : 'No'} ${data.vitkDateTime? '('+data.vitkDateTime+')':''}\n`,
        `Erythromycin applied: ${data.eryGiven ? 'Yes' : 'No'} ${data.eryDateTime? '('+data.eryDateTime+')':''}\n`,
        `Notes: ${data.notes || ''}\n`
      ], {type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'newborn-meds-checklist.txt';
      document.body.appendChild(a); a.click();
      setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 0);
    }

    loadChecklist();
    if(saveBtn) saveBtn.addEventListener('click', saveChecklist);
    if(dlBtn) dlBtn.addEventListener('click', downloadChecklist);
    if(clearBtn) clearBtn.addEventListener('click', () => {
      if(confirm('Clear saved checklist from this browser?')){
        localStorage.removeItem(STORAGE_KEY);
        document.querySelectorAll('[data-key]').forEach(el => {
          if(el.type === 'checkbox') el.checked = false;
          else if(el.type === 'datetime-local' || el.tagName === 'TEXTAREA' || el.type === 'text') el.value = '';
        });
        const s = document.getElementById('saveStatus'); if(s){ s.textContent = 'Cleared.'; setTimeout(()=> s.textContent = '', 2000); }
      }
    });
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initQuiz();
    initChecklist();
  });
})();
