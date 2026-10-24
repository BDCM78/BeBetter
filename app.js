```javascript
"use strict";

// Objectifs quotidiens
const goalOptions = document.querySelector("#goal-options");
const goalForm = document.querySelector("#goal-form");
const customGoal = document.querySelector("#custom-goal");
const goalResult = document.querySelector("#goal-result");

// Préférences de filtrage
const filterForm = document.querySelector("#filter-form");
const filterResult = document.querySelector("#filter-result");
const categoryInputs = document.querySelectorAll(
  'input[name="filter-category"]'
);

const STORAGE_KEY = "bebetter-filter-preferences";

function showGoal(goal) {
  const cleanGoal = goal.trim();

  if (!cleanGoal || cleanGoal.length > 120) {
    goalResult.hidden = false;
    goalResult.textContent =
      "Choisis un objectif court, qui te semble réalisable aujourd'hui.";
    return;
  }

  goalResult.replaceChildren();

  const title = document.createElement("strong");
  title.textContent = "Ton petit objectif du jour";

  const description = document.createElement("p");
  description.textContent = cleanGoal;

  const encouragement = document.createElement("p");
  encouragement.textContent =
    "Pas besoin d'être parfait. Un petit pas compte déjà.";

  goalResult.append(title, description, encouragement);
  goalResult.hidden = false;
}

if (goalOptions && goalResult) {
  goalOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-goal]");
    if (!button) return;
    showGoal(button.dataset.goal);
  });
}

if (goalForm && customGoal && goalResult) {
  goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showGoal(customGoal.value);
  });
}

// Charger les préférences déjà enregistrées
function loadPreferences() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const categories = JSON.parse(saved);

    if (!Array.isArray(categories)) return;

    categoryInputs.forEach((input) => {
      input.checked = categories.includes(input.value);
    });
  } catch (error) {
    console.warn("Impossible de charger les préférences.", error);
  }
}

// Enregistrer les préférences choisies
if (filterForm && filterResult) {
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedCategories = Array.from(categoryInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selectedCategories)
      );

      filterResult.textContent =
        "Tes préférences ont été enregistrées sur ce navigateur. " +
        "Les sites ne sont pas encore bloqués.";
      filterResult.hidden = false;
    } catch (error) {
      filterResult.textContent =
        "Enregistrement impossible dans ce navigateur.";
      filterResult.hidden = false;
    }
  });
}

loadPreferences();

console.info("BeBetter : interface initialisée.");
```
