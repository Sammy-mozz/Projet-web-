// ================================== Beaucoup d'aide de chatgpt et ytb ========================================//

// =======================
// Gestion du panier
// =======================
const panierBody = document.getElementById("panier-body");
const sousTotalEl = document.getElementById("sous-total");
const totalEl = document.getElementById("total");
const fraisLivraison = 5.0;

// Fonction pour mettre à jour les totaux
function updateTotals() {
  let sousTotal = 0;
  document.querySelectorAll("#panier-body tr").forEach(tr => {
    const prix = parseFloat(tr.dataset.price);
    const quantite = parseInt(tr.querySelector(".quantite").value);
    const totalLigne = prix * quantite;
    tr.querySelector(".total-ligne").textContent = totalLigne.toFixed(2) + " €";
    sousTotal += totalLigne;
  });

  sousTotalEl.textContent = sousTotal.toFixed(2) + " €";
  totalEl.textContent = (sousTotal + fraisLivraison).toFixed(2) + " €";
}

// =======================
// Supprimer un article
// =======================
function setupSupprimer() {
  document.querySelectorAll(".supprimer").forEach(btn => {
    btn.addEventListener("click", e => {
      const tr = e.target.closest("tr");
      const nomProduit = tr.querySelector("td:nth-child(2)").textContent;

      // Remettre l'article dans les suggestions
      const suggestion = Array.from(document.querySelectorAll(".suggestion-item")).find(
        item => item.dataset.name === nomProduit
      );
      if (suggestion) {
        suggestion.classList.remove("cachée");
      }

      tr.remove();
      updateTotals();
    });
  });
}

// =======================
// Changement quantité
// =======================
function setupQuantites() {
  document.querySelectorAll(".quantite").forEach(input => {
    input.addEventListener("change", updateTotals);
  });
}

// =======================
// Ajouter un article depuis les suggestions
// =======================
function setupAjouter() {
  document.querySelectorAll(".ajouter").forEach(btn => {
    btn.addEventListener("click", e => {
      const item = e.target.closest(".suggestion-item");

      // Créer une ligne dans le panier
      const tr = document.createElement("tr");
      tr.dataset.price = item.dataset.price;
      tr.innerHTML = `
        <td class="produit">
          <img src="${item.dataset.img}" alt="${item.dataset.name}" class="panier-image">
        </td>
        <td>${item.dataset.name}</td>
        <td class="prix">${parseFloat(item.dataset.price).toFixed(2)} €</td>
        <td><input type="number" min="1" max="10" value="1" class="quantite"></td>
        <td class="total-ligne">${parseFloat(item.dataset.price).toFixed(2)} €</td>
        <td><button class="supprimer"><i class="fa-solid fa-trash"></i></button></td>
      `;
      panierBody.appendChild(tr);

      // Retirer l'article de la suggestion
      item.classList.add("cachée");

      // Reconfigurer les événements
      setupSupprimer();
      setupQuantites();
      updateTotals();
    });
  });
}

// =======================
// Toggle suggestions cachées
// =======================
const toggleBtn = document.getElementById("toggle-suggestions");
const suggestionsGrid = document.getElementById("suggestions-grid");
toggleBtn.addEventListener("click", () => {
  const hiddenItems = suggestionsGrid.querySelectorAll(".cachée");
  hiddenItems.forEach(item => item.classList.toggle("cachée"));

  // Changer l'icône flèche haut/bas
  const icon = toggleBtn.querySelector("i");
  icon.classList.toggle("fa-chevron-down");
  icon.classList.toggle("fa-chevron-up");
});

// =======================
// Initialisation
// =======================
setupSupprimer();
setupQuantites();
setupAjouter();
updateTotals();





