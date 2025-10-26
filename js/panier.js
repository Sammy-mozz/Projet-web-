document.addEventListener("DOMContentLoaded", () => {

  const panier = document.querySelector(".panier");
  const suggestionsContainer = document.querySelector(".suggestions");
  const resumeSousTotal = document.querySelector(".panier-resume p strong");
  const resumeTotal = document.querySelector(".panier-resume p:last-of-type strong");
  const fraisLivraison = 5.00;

  // 🔄 Met à jour les totaux du panier
  function majTotal() {
    let total = 0;
    const items = document.querySelectorAll(".panier-item");

    items.forEach(item => {
      const prixUnitaire = parseFloat(item.dataset.price);
      const quantite = parseInt(item.querySelector("input[type='number']").value);
      const totalProduit = prixUnitaire * quantite;
      item.querySelector(".total-produit").textContent = totalProduit.toFixed(2) + " €";
      total += totalProduit;
    });

    resumeSousTotal.textContent = total.toFixed(2) + " €";
    resumeTotal.textContent = (total + fraisLivraison).toFixed(2) + " €";
  }

  // 🗑️ Supprimer un article (avec animation + retour dans les suggestions)
  function supprimerArticle(e) {
    const item = e.target.closest(".panier-item");
    if (!item) return;

    const nomProduit = item.querySelector("h2").textContent;
    const imageSrc = item.querySelector("img").src;
    const prix = parseFloat(item.dataset.price);

    // Animation de suppression
    item.classList.add("supprimer-animation");
    setTimeout(() => {
      item.remove();
      majTotal();

      // 🔙 Recréer le produit dans les suggestions
      const nouvelleSuggestion = document.createElement("div");
      nouvelleSuggestion.classList.add("suggestion-item");
      nouvelleSuggestion.dataset.price = prix;
      nouvelleSuggestion.innerHTML = `
        <img src="${imageSrc}" alt="${nomProduit}" class="suggestion-image">
        <h3>${nomProduit}</h3>
        <p>Prix : <strong>${prix.toFixed(2)} €</strong></p>
        <button class="ajouter">Ajouter au panier</button>
      `;

      suggestionsContainer.appendChild(nouvelleSuggestion);
      // Réactiver le bouton
      nouvelleSuggestion.querySelector(".ajouter").addEventListener("click", ajouterAuPanier);

    }, 400);
  }

  // ➕ Ajouter un article depuis les suggestions
  function ajouterAuPanier(e) {
    const suggestion = e.target.closest(".suggestion-item");
    if (!suggestion) return;

    const nomProduit = suggestion.querySelector("h3").textContent;
    const imageSrc = suggestion.querySelector("img").src;
    const prix = parseFloat(suggestion.dataset.price);

    const nouveauProduit = document.createElement("div");
    nouveauProduit.classList.add("panier-item", "ajouter-animation");
    nouveauProduit.dataset.price = prix;

    nouveauProduit.innerHTML = `
      <img src="${imageSrc}" alt="${nomProduit}" class="panier-image">
      <div class="panier-details">
        <h2>${nomProduit}</h2>
        <p>Description rapide du produit ajouté.</p>
        <p>Prix unitaire : <strong>${prix.toFixed(2)} €</strong></p>
        <label>Quantité :</label>
        <input type="number" value="1" min="1">
        <p>Total : <strong class="total-produit">${prix.toFixed(2)} €</strong></p>
        <button class="supprimer" title="Supprimer l’article">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    panier.appendChild(nouveauProduit);

    // Active les événements du nouveau produit
    nouveauProduit.querySelector(".supprimer").addEventListener("click", supprimerArticle);
    nouveauProduit.querySelector("input").addEventListener("input", majTotal);

    // 🧨 Supprime le produit de la liste des suggestions
    suggestion.remove();

    majTotal();
  }

  // Activation initiale des événements
  document.querySelectorAll(".supprimer").forEach(btn => {
    btn.addEventListener("click", supprimerArticle);
  });

  document.querySelectorAll(".panier-item input[type='number']").forEach(input => {
    input.addEventListener("input", majTotal);
  });

  document.querySelectorAll(".ajouter").forEach(btn => {
    btn.addEventListener("click", ajouterAuPanier);
  });

  majTotal();
});
