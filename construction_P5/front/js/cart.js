// On récupère les informations dans le localStorage
let panier = JSON.parse(localStorage.getItem("produit"));

//SI tu as bien des informations qui sont dans le localStorage, alors tu peux lancer la fonction
const AFFICHAGEPANIER = async () => {
if (panier) {
    await panier;
}

cart__items.innerHTML = panier.map((produit) => `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.name}</h2>
                    <p>Couleur : ${produit.couleur}</p>
                    <p>Prix : ${produit.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" ${produit._id}>Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
`).join("");
}

AFFICHAGEPANIER();

//Ajout ou suppression des éléments du panier de manière dynamique
const MODIFQUANTITE  = async () => {
  await AFFICHAGEPANIER;
  const SELECTITEM = document.querySelectorAll(".itemQuantity");


//On utilise la boucle each car on a besoin de modifier directement le tableau de produitStorage  
  SELECTITEM.forEach((SELECTITEM) => {
    SELECTITEM.addEventListener("change", (panierTableau) => {
// boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur    
    let panier = JSON.parse(localStorage.getItem("produit"));  
    for (produit of panier)
      if (
        produit._id == panier._id &&
        produit.couleur == panier.couleur
      ) 
      return(
        produit.quantité = panierTableau.value,
        localStorage.setItem("produit", JSON.stringify(panier))
      )
    }); 
  });
  
}

MODIFQUANTITE();

 
 
