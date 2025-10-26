document.addEventListener("DOMContentLoaded", () => {
  const panierBody = document.getElementById("panier-body");
  const sousTotalEl = document.getElementById("sous-total");
  const totalEl = document.getElementById("total");
  const livraisonEl = document.getElementById("livraison");
  const suggestions = document.querySelectorAll(".ajouter");
  const fleche = document.getElementById("toggle-suggestions");
  const cachees = document.querySelectorAll(".cachée");
  let suggestionsOuvertes = false;

  // Actualisation des totaux //
  function majTotaux() {
    let sousTotal = 0;
    document.querySelectorAll("#panier-body tr").forEach(row => {
      const price = parseFloat(row.dataset.price);
      const qty = parseInt(row.querySelector(".quantite").value);
      const totalLigne = price * qty;
      row.querySelector(".total-ligne").textContent = totalLigne.toFixed(2) + " €";
      sousTotal += totalLigne;
    });
    sousTotalEl.textContent = sousTotal.toFixed(2) + " €";
    const livraison = parseFloat(livraisonEl.textContent.replace("€", "")) || 0;
    totalEl.textContent = (sousTotal + livraison).toFixed(2) + " €";
  }

  majTotaux();

  // Changement de quantité //
  panierBody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantite")) majTotaux();
  });

  // Suppression d’un article //
  panierBody.addEventListener("click", (e) => {
    if (e.target.closest(".supprimer")) {
      e.target.closest("tr").remove();
      majTotaux();
    }
  });

  // Ajout depuis suggestions //
  suggestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const name = item.dataset.name;
      const price = parseFloat(item.dataset.price);
      const img = item.dataset.img;

      const newRow = document.createElement("tr");
      newRow.dataset.price = price;
      newRow.innerHTML = `
        <td class="produit"><img src="${img}" alt="${name}" class="panier-image"></td>
        <td>${name}</td>
        <td class="prix">${price.toFixed(2)} €</td>
        <td><input type="number" min="1" value="1" class="quantite"></td>
        <td class="total-ligne">${price.toFixed(2)} €</td>
        <td><button class="supprimer"><i class="fa-solid fa-trash"></i></button></td>
      `;
      panierBody.appendChild(newRow);
      majTotaux();
    });
  });

  // Afficher / cacher les suggestions du bas //
  fleche.addEventListener("click", () => {
    suggestionsOuvertes = !suggestionsOuvertes;
    cachees.forEach(el => {
      el.style.display = suggestionsOuvertes ? "block" : "none";
    });
    fleche.innerHTML = suggestionsOuvertes
      ? '<i class="fa-solid fa-chevron-up"></i>'
      : '<i class="fa-solid fa-chevron-down"></i>';
  });
});
