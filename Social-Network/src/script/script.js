// TODO FONCTIONS

//* FONCTION fetchJSON
async function fetchJSON() {
    //On réalise la requête API
    const reponse = await  fetch('./src/script/profils.json');
    console.log(reponse);
    console.log(reponse.ok);
    console.log(reponse.status);

    //On transforme la réponnse en OBJET JavaScript
    const data = await  reponse.json();
    console.log(data);

    //On retourne les données
    return data;
}



//*FONCTION CARDHUMAN
function cardHuman(human) {
    
    // On crée les éléments
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    const image = document.createElement("img");
    const paragraphe = document.createElement("p");
    
    // On remplit les éléments
    titre.textContent = human.name;
    image.src = human.avatar;
    image.alt = "Portrait de : " + human.name;
    paragraphe.textContent = human.age + " ans - "  + human.email;

    // On ajoute à l'aticle les différents éléments
    article.appendChild(titre);
    article.appendChild(image);
    article.appendChild(paragraphe);

    // On ajoute à l'aticle une classe
    article.classList.add("card");

    // On retourne l'article
    return article;
};



//*FONCTION CARDPET
function cardPet(pet) {
    
    // On crée les éléments
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    const image = document.createElement("img");
    const paragraphe = document.createElement("p");
    
    // On remplit les éléments
    titre.textContent = pet.name;
    image.src = pet.avatar;
    image.alt = "Portrait de : " + pet.name;
    paragraphe.textContent = pet.age + " ans - "  + pet.espece + " - " + pet.propriétaire;

    // On ajoute à l'aticle les différents éléments
    article.appendChild(titre);
    article.appendChild(image);
    article.appendChild(paragraphe);

    // On ajoute à l'aticle une classe
    article.classList.add("card");

    // On retourne l'article
    return article;
};



//*FONCTION CADRXENO
function cardXeno(xeno) {
    
    // On crée les éléments
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    const image = document.createElement("img");
    const paragraphe = document.createElement("p");
    
    // On remplit les éléments
    titre.textContent = xeno.name;
    image.src = xeno.avatar;
    image.alt = "Portrait de : " + xeno.name;
    paragraphe.textContent = xeno.age + " ans - "  + xeno.espece + " - " + xeno.menace;

    // On ajoute à l'aticle les différents éléments
    article.appendChild(titre);
    article.appendChild(image);
    article.appendChild(paragraphe);

    // On ajoute à l'aticle une classe
    article.classList.add("card");

    // On retourne l'article
    return article;
};



//*FONCTION PROFIL
function profil(tableau) {

    // On créé un tableau vide
    const cardList = [];

    // On parcours le tableau
    tableau.forEach(element => {

        if (element.type === "humain") {
            cardList.push(cardHuman(element));
        }
        else if (element.type === "animal de compagnie") {
            cardList.push(cardPet(element));
        }
        else if (element.type === "Xeno") {
            cardList.push(cardXeno(element));
        }
        else {
            console.error("Type de Profil non Existant");
        }
    });

    // On retourne le tableau 
    return cardList;
}



//*FONCTION PROFILALL

function profilAll(tableau) {

    //On récupère l'élément HTML ayant la classe "profils"
    const profils = document.querySelector(".profils");

    // On appele la fonction profil() pour récupérer le tableau de cartes
    const cardList = profil(tableau);

    // On parcour le tableau et on ajoute chaque carte
    cardList.forEach(card => {
        profils.appendChild(card);
    });
}



// TODO LEAFLET

// On crée la carte
const MAP = L.map('map').setView([43.604429, 1.443812], 14);

// On ajoute les couches de openstreetmap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(MAP);



//TODO FONCTION LAUNCH()

//*FONCTION LAUNCH

async function launch(map) {

// On attribue la valeur de fetchJSON() à tabData
    const tabData = await fetchJSON();

    profilAll(tabData);

    tabData.forEach(profil => {

// On crée, assigne la création d'une icône pour un marqueur
        const ICON = L.icon({
            iconUrl: profil.icon,
            iconSize: [50, 83],
            iconAnchor: [25, 83]
        });

// On crée les marqueurs
        L.marker(
            [profil.latitude, profil.longitude],
            { icon: ICON }
        ).addTo(map);

    });

}
// On appelle la fonction
launch(MAP);