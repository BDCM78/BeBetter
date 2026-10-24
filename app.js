
"use strict";

const goalOptions = document.querySelector("#goal-options");
const goalForm = document.querySelector("#goal-form");
const customGoal = document.querySelector("#custom-goal");
const goalResult = document.querySelector("#goal-result");

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
  description.style.marginBottom = "0";

  const encouragement = document.createElement("p");
  encouragement.textContent =
    "Pas besoin d'être parfait. Un petit pas compte déjà.";
  encouragement.style.marginBottom = "0";

  goalResult.append(title, description, encouragement);
  goalResult.hidden = false;
}

if (goalOptions) {
  goalOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-goal]");

    if (!button) return;

    showGoal(button.dataset.goal);
  });
}

if (goalForm && customGoal) {
  goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showGoal(customGoal.value);
  });
}

console.info("BeBetter : interface initialisée.");
