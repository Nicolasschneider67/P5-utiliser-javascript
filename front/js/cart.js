// On récupère les informations dans le localStorage
let panier = JSON.parse(localStorage.getItem("produit"));


//Affichage des produits selectionnés dans la page panier
const AFFICHAGEPANIER = async () => {
  let panier = JSON.parse(localStorage.getItem("produit"))
if (panier) {
    await panier;
}

//Nous récupérons les informations de l'API afin de définir le prix du produit en fonction de l'APi et pas du localStorage
  await fetch(`http://localhost:3000/api/products/`)
  .then((rep) => rep.json())
  .then((promise) => {
      canapProduit = promise;
  }) 

//Le prix dans le localStorage correspondra toujours au prix dans l'API, par mesure de sécurité
canapProduit.forEach((variable) => {
  for(let i in panier){
    if(panier[i]._id == variable._id)
    {
      panier[i].price = variable.price,
 
cart__items.innerHTML = panier.map((produit) => `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.name}</h2>
                    <p>Couleur : ${produit.couleur}</p>
                    <span class= ".cart__price .cart__price p" id= "prix">  ${produit.price}€ </span>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}" data-color="${produit.couleur}" data-id="${produit._id}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${produit._id}" data-color="${produit.couleur}" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
`).join("");
};     
    };
    
  });
  SUPPRIMERPANIER();
  MODIFQUANTITE();
  TOTALPRODUIT();
};

AFFICHAGEPANIER();



//Modification des éléments du panier de manière dynamique
const MODIFQUANTITE  = async () => {
  await AFFICHAGEPANIER;
  const SELECTITEM = document.querySelectorAll(".itemQuantity");

  SELECTITEM.forEach((MODIFITEM) => {  
    MODIFITEM.addEventListener("change", () => {
    let panier = JSON.parse(localStorage.getItem("produit"));  

//On utilise cette boucle pour récupérer l'ID et le couleur sur le bouton selectionné
    for ( let i in panier ){
      if (
        panier[i]._id == MODIFITEM.dataset.id &&
        panier[i].couleur == MODIFITEM.dataset.color 
      ) 
      return(
        panier[i].quantite = MODIFITEM.value,
        localStorage.setItem("produit", JSON.stringify(panier)),
        window.location.href="cart.html"       
      )};
      return JSON.parse(localStorage.getItem("produit"))
    }); 
  });
};



//Fonction pour supprimer un produit dans le panier
const SUPPRIMERPANIER = async () => {
  await AFFICHAGEPANIER;
  let corbeille = document.querySelectorAll(".deleteItem");

  corbeille.forEach((produitCorbeille) => {
    produitCorbeille.addEventListener("click", () => {
let panier = JSON.parse(localStorage.getItem("produit"));  
let totalPanierSupprimer = panier.length;
//Cette première condition supprime tout simplement le localStorage s'il n'y a qu'1 élément
if (
  totalPanierSupprimer == 1
)
return (
  localStorage.removeItem("produit"),
  window.location.href="cart.html"
);

else {
  for(let i in panier) {
  if(
    totalPanierSupprimer > 1
  )//On garde les éléments qui sont différents par la méthode filtre
  return (
  panierRemove = panier.filter(
     (el) => el._id !== produitCorbeille.dataset.id ||
             el.couleur !== produitCorbeille.dataset.color),
  localStorage.setItem("produit", JSON.stringify(panierRemove)),
  window.location.href="cart.html"
  )}
      }
    }
  )}
)}



//Fonction pour afficher le prix total du panier
const TOTALPRODUIT = async (AFFICHAGEPANIER, SUPPRIMERPANIER, MODIFQUANTITE) => {
 await AFFICHAGEPANIER
 await SUPPRIMERPANIER
 await MODIFQUANTITE
 
//On définit une variable pour la totalité des produits. On lui donne 0 auquel on ajoute les produits du localStorage
let totalArticle = 0;
let prixArticle = 0;
let prixTotal = 0;

let panier = JSON.parse(localStorage.getItem("produit")); 
  for (let article of panier) {
totalArticle += JSON.parse(article.quantite);
prixArticle =  JSON.parse(article.quantite) * JSON.parse(article.price);
prixTotal += prixArticle
  }

document.getElementById("totalQuantity").textContent = totalArticle;
document.getElementById("totalPrice").textContent = prixTotal;
}
 




//Formulaire de contact
let valeurPrenom, valeurNom, valeurAdresse, valeurVille, valeurEmail;
const INFOCLIENTS = [];
const PRENOM = document.getElementById("firstName");

PRENOM.addEventListener("input", () => {
  valeurPrenom;
  if (PRENOM.value.length == 0)
  return (
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom", 
    valeurPrenom = null,
    localStorage.removeItem("firstName")
    )   
    
    else if (PRENOM.value.length < 2 || PRENOM.value.length > 20 )
        return (
          document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom",
          valeurPrenom = null,
          localStorage.removeItem("firstName")
        ) 
//Comme reggex nous tolérons des minuscules/Majuscules, des espaces entre les mots et une chaine de caractère entre 2 et 20 mots
      if (PRENOM.value.match(/^[a-z A-Z]{2,20}$/))
      return (
        document.getElementById("firstNameErrorMsg").innerHTML = "",
        valeurPrenom = PRENOM.value,
        localStorage.setItem("firstName", document.getElementById("firstName").value)
      )
//On dit que si c'est différent de ces conditions
      if (!PRENOM.value.match(/^[a-z A-Z]{2,20}$/) && PRENOM.value.length > 2 || PRENOM.value.length < 20)
      return(
        document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom sans chiffres ni caractères spéciaux ni accents",
        valeurPrenom = null,
        localStorage.removeItem("firstName")
        )    
});
 


const NOM = document.getElementById("lastName");
NOM.addEventListener("input", () => {
  valeurNom;
  if (NOM.value.length == 0)
  return (
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom de famille", 
    valeurNom = null,
    localStorage.removeItem("lastName")
    )   
    
    else if (NOM.value.length < 2 || NOM.value.length > 25 )
        return (
          document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom de famille",
          valeurNom = null,
          localStorage.removeItem("lastName")
        ) 

      if (NOM.value.match(/^[a-z A-Z]{2,25}$/))
      return (
        document.getElementById("lastNameErrorMsg").innerHTML = "",
        valeurNom = NOM.value,
        localStorage.setItem("lastName", document.getElementById("lastName").value)
      )

      if (!NOM.value.match(/^[a-z A-Z]{2,25}$/) && NOM.value.length > 2 || NOM.value.length < 25)
      return(
        document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom de famille sans chiffres ni caractères spéciaux ni accents",
        valeurNom = null,
        localStorage.removeItem("lastName")
        )    
});


const ADRESSE = document.getElementById("address");

ADRESSE.addEventListener("input", () => {
  valeurAdresse;
  if (ADRESSE.value.length == 0)
  return (
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez renseigner votre adresse", 
    valeurAdresse = null,
    localStorage.removeItem("address")
    )   
    
    else if (ADRESSE.value.length < 5 || ADRESSE.value.length > 45 )
        return (
          document.getElementById("addressErrorMsg").innerHTML = "Votre adresse doit contenir entre 5 et 45 caractères",
          valeurAdresse = null,
          localStorage.removeItem("address")

        ) 
      if (ADRESSE.value.match(/^[0-9]{1,3} [a-z A-Z]{3,45}$/))
      return (
        document.getElementById("addressErrorMsg").innerHTML = "",
        valeurAdresse = ADRESSE.value,
        localStorage.setItem("address", document.getElementById("address").value)
      )
      if (!ADRESSE.value.match(/^[0-9]{1,3} [a-z A-Z]{3,45}$/) && ADRESSE.value.length > 5 || ADRESSE.value.length < 45)
      return(
        document.getElementById("addressErrorMsg").innerHTML = "Votre adresse doit commencer par le numéro de rue, sans caractères spéciaux ni d'accents",
        valeurAdresse = null,
        localStorage.removeItem("address")
        )      
});


const VILLE = document.getElementById("city");

VILLE.addEventListener("input", () => {
  valeurVille;
  if (VILLE.value.length == 0)
  return (
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville", 
    valeurVille = null,
    localStorage.removeItem("city")
    )   
    
    else if (VILLE.value.length < 2 || VILLE.value.length > 25 )
        return (
          document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville",
          valeurVille = null,
          localStorage.removeItem("city")
        ) 
      if (VILLE.value.match(/^[a-z A-Z]{2,25}$/))
      return (
        document.getElementById("cityErrorMsg").innerHTML = "",
        valeurVille = VILLE.value,
        localStorage.setItem("city", document.getElementById("city").value)
      )
      if (!VILLE.value.match(/^[a-z A-Z]{2,25}$/) && VILLE.value.length > 2 || VILLE.value.length < 25)
      return(
        document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville sans chiffres ni caractères spéciaux ni accents",
        valeurVille = null,
        localStorage.removeItem("city")
        )      
});



const EMAIL = document.getElementById("email");

EMAIL.addEventListener("input", () => {
  valeurEmail;

  if (EMAIL.value.lenght == 0)
  return (
    document.getElementById("emailErrorMsg").innerHTML = "Veuillez renseigner votre Email",
    valeurEmail = null
    //localStorage.removeItem("email")
    )
                          //n'importe quel caractère avec un point + @ suivi de n'importe quel caractère avec un point + n'importe quel mot entre 2 et 3 caractères
    else if (EMAIL.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/))
    return (
      document.getElementById("emailErrorMsg").innerHTML = "",
      valeurEmail = EMAIL.value,
      localStorage.setItem("email", document.getElementById("email").value)
    )
    else return (
      document.getElementById("emailErrorMsg").innerHTML = "Veuillez renseigner un Email valide",
      valeurEmail = null,
      localStorage.removeItem("email") 
    )
});

//Nous créons un boutton pour commander que nous méttons en display none pour le moment
const BTN = document.createElement("input");
    BTN.className ="cart__order__form__submit";
    BTN.setAttribute("id", "commander");
    BTN.setAttribute("type", "submit");
    BTN.setAttribute("value", "Commander");
    const PLACEBOUTTON = document.querySelector(".cart__order__form__submit");
    PLACEBOUTTON.appendChild(BTN);
    BTN.style.display="none"





//Fonction pour valider le formulaire
const FORMULAIRE = () => {
  let displayButton = document.querySelector("#order");
  if (displayButton.value = "Commander !")
  {displayButton.value= "Valider le formulaire"}
  
  displayButton.addEventListener("click", (even) => {
//On indique une condition pour que tous les champs soient remplis dans LocalStorage avant de pouvoir envoyer le formulaire
if (
  "firstName" in localStorage &&
  "lastName" in localStorage &&
  "address" in localStorage &&
  "city" in localStorage &&
  "email" in localStorage &&
  "produit" in localStorage 
  ) 
    {  
    even.preventDefault();
    displayButton.style.display= "none";
    alert("Formulaire validé");
    BTN.style.display= "block"; 
    }
    else (
      alert("Veuillez respecter les consignes du formulaire"),
      even.preventDefault()
     )
  })
};

   BTNCOMMANDER = document.getElementById("commander");
    BTNCOMMANDER.addEventListener("click", (even) => {  
      if(
        valeurEmail != null &&
        valeurVille != null  &&
        valeurAdresse != null  &&
        valeurNom != null  &&
        valeurPrenom != null  &&
        valeurPrenom != null  
      )
      return (
      OBJETFORMULAIRE = {
      firstName : localStorage.getItem("firstName"),
      lastName : localStorage.getItem("lastName"),
      address : localStorage.getItem("address"),
      city : localStorage.getItem("city"),
      email : localStorage.getItem("email"),
    },
    localStorage.setItem("INFOCLIENT",JSON.stringify(OBJETFORMULAIRE))
      )
      else(
        alert("Veuillez respecter les consignes du formulaire"),
        even.preventDefault()
        )
 })
  FORMULAIRE();
  

// Récupération des informations nécessaires avant envoi vers le serveur
let panierID = [];

const PAQUET = () => { 
  contactRef = JSON.parse(localStorage.getItem("INFOCLIENT"));
  panier = JSON.parse(localStorage.getItem("produit"));

  for (let variable of panier) {
    panierID.push(variable._id)
   
  // définition de l'objet commande
  commandeFinale = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: panierID
  };
   
}};



//Envoie des donées vers le serveur
const ENVOISERVEUR = async () => {
  PAQUET();

  await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commandeFinale),
})

.then((rep) => rep.json())
.then((promise) => {
  console.log(promise.orderId);
  window.location.href = `/front/html/confirmation.html?Id_commande=${promise.orderId}`;
})
};

ENVOISERVEUR();








