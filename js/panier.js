// ================================== Beaucoup d'aide de chatgpt et ytb ========================================//

// =========================
// 🎯 GESTION DU PANIER
// =========================
// Sélecteurs principaux
const panierBody = document.querySelector('#panier-body');
const sousTotalEl = document.querySelector('#sous-total');
const livraisonEl = document.querySelector('#livraison');
const totalEl = document.querySelector('#total');
const suggestionsGrid = document.querySelector('#suggestions-grid');
const fraisLivraison = 5.00;

// ----------------------------
// 🧮 Fonction pour recalculer les totaux
// ----------------------------
function majTotaux() {
  let sousTotal = 0;

  document.querySelectorAll('#panier-body tr').forEach((ligne) => {
    const prix = parseFloat(ligne.dataset.price);
    const quantite = parseInt(ligne.querySelector('.quantite').value);
    const totalLigne = prix * quantite;
    ligne.querySelector('.total-ligne').textContent = totalLigne.toFixed(2) + ' €';
    sousTotal += totalLigne;
  });

  sousTotalEl.textContent = sousTotal.toFixed(2) + ' €';
  const total = sousTotal + fraisLivraison;
  totalEl.textContent = total.toFixed(2) + ' €';
}

// ----------------------------
// 🗑️ Fonction pour supprimer un article
// ----------------------------
function supprimerArticle(bouton) {
  const ligne = bouton.closest('tr');
  const nom = ligne.querySelector('td:nth-child(2)').textContent.trim();
  const img = ligne.querySelector('img').getAttribute('src');
  const prix = ligne.dataset.price;

  // Supprimer du panier
  ligne.remove();
  majTotaux();

  // 🔁 Réafficher l'article dans les suggestions
  const suggestionExistante = Array.from(suggestionsGrid.children).find(item => {
    return item.dataset.img === img;
  });

  if (suggestionExistante) {
    suggestionExistante.classList.remove('cachée');
  } else {
    // Si l’article vient d’être ajouté manuellement, on le recrée
    const nouvelItem = document.createElement('div');
    nouvelItem.classList.add('suggestion-item');
    nouvelItem.dataset.name = nom;
    nouvelItem.dataset.price = prix;
    nouvelItem.dataset.img = img;

    nouvelItem.innerHTML = `
      <img src="${img}" alt="${nom}">
      <h3>${nom}</h3>
      <p>Prix : <strong>${parseFloat(prix).toFixed(2)} €</strong></p>
      <button class="ajouter">Ajouter au panier</button>
    `;
    suggestionsGrid.appendChild(nouvelItem);
  }
}

// ----------------------------
// ➕ Fonction pour ajouter un article
// ----------------------------
function ajouterArticle(item) {
  const nom = item.dataset.name;
  const prix = parseFloat(item.dataset.price);
  const img = item.dataset.img;

  // Vérifie si déjà dans le panier
  const dejaDansPanier = Array.from(document.querySelectorAll('#panier-body tr')).some(
    ligne => ligne.querySelector('img').getAttribute('src') === img
  );

  if (dejaDansPanier) return; // évite les doublons

  // Créer la ligne du tableau
  const nouvelleLigne = document.createElement('tr');
  nouvelleLigne.dataset.price = prix;
  nouvelleLigne.innerHTML = `
    <td class="produit">
      <img src="${img}" alt="${nom}" class="panier-image">
    </td>
    <td>${nom}</td>
    <td class="prix">${prix.toFixed(2)} €</td>
    <td><input type="number" min="1" max="10" value="1" class="quantite"></td>
    <td class="total-ligne">${prix.toFixed(2)} €</td>
    <td><button class="supprimer"><i class="fa-solid fa-trash"></i></button></td>
  `;

  panierBody.appendChild(nouvelleLigne);

  // Cache la suggestion correspondante
  item.classList.add('cachée');

  majTotaux();
}

// ----------------------------
// 📦 GESTION DES ÉVÉNEMENTS
// ----------------------------

// Quantité modifiée
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('quantite')) {
    majTotaux();
  }
});

// Suppression d’un article
document.addEventListener('click', (e) => {
  if (e.target.closest('.supprimer')) {
    supprimerArticle(e.target.closest('.supprimer'));
  }
});

// Ajout d’un article depuis les suggestions
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('ajouter')) {
    ajouterArticle(e.target.closest('.suggestion-item'));
  }
});

// ----------------------------
// 🧮 Initialisation
// ----------------------------
majTotaux();

// ----------------------------
// 🔽 Flèche d’affichage des suggestions
// ----------------------------
const fleche = document.querySelector('#toggle-suggestions');
fleche.addEventListener('click', () => {
  suggestionsGrid.classList.toggle('visible');
  fleche.classList.toggle('active');
});

  // --- Afficher / cacher les suggestions du bas ---
const toggleBtn = document.getElementById('toggle-suggestions');
const suggestionsGrid = document.getElementById('suggestions-grid');

toggleBtn.addEventListener('click', () => {
  const hiddenItems = suggestionsGrid.querySelectorAll('.cachée');
  hiddenItems.forEach(item => item.classList.remove('cachée')); // on les affiche
});



