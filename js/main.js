/**
 * Classe utilisateurs
 */
class Users {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
usersList = [];

// Ecouteur sur barre de recherche
const databaseSearchInput = document.querySelector('.database-search-input');
databaseSearchInput.addEventListener('input', evt => {
    newTab = [];
    for (let i = 0; i < cards.children.length; i++) {
        if (
            (cards.children[i].children[0].children[1].textContent.toLowerCase().substring(0, evt.target.value.length) != evt.target.value.substring(0, evt.target.value.length).toLowerCase()) &&
            (cards.children[i].children[0].children[2].textContent.toLowerCase().substring(0, evt.target.value.length) != evt.target.value.substring(0, evt.target.value.length).toLowerCase())
        ) {
            console.log(evt.target.value);
            cards.children[i].style.cssText = "visibility:hidden; position:absolute;";
        }
        else {
            cards.children[i].style.cssText = "visibility:visible; position:static;";
            newTab.push(cards.children[i]);
        }
    }
    for (let i = 0; i < newTab.length; i++) {
        // Changement de la couleur de la carte une fois sur deux
        if (i % 2 == 0) {
            newTab[i].style.background = "rgb(227, 236, 255)";
        }
    }
}, false)


const cards = document.querySelector('.cards');
/***
 * Fonction de création des cartes dans le DOM
 */
function createCards(userList) {
    for (let i = 0; i < userList.results.length; i++) {
        const card = document.createElement('div');
        card.className = "card";
        // Changement de la couleur de la carte une fois sur deux
        if (i % 2 == 0) {
            card.style.background = "rgb(227, 236, 255)";
        }

        const cardGroup = document.createElement('div');
        cardGroup.className = "card-group";

        const picture = document.createElement('img');
        picture.className = "picture"
        picture.src = userList.results[i].picture.large;
        picture.alt = `photo de profil de ${userList.results[i].name.first} ${userList.results[i].name.last}`;
        cardGroup.appendChild(picture);

        const firstName = document.createElement('span');
        firstName.className = "first-name";
        firstName.textContent = userList.results[i].name.first;
        cardGroup.appendChild(firstName);

        const lastName = document.createElement('span');
        lastName.className = "last-name";
        lastName.textContent = userList.results[i].name.last;
        cardGroup.appendChild(lastName);

        card.appendChild(cardGroup);

        const eMail = document.createElement('span');
        eMail.className = "e-mail";
        eMail.textContent = userList.results[i].email;
        card.appendChild(eMail);

        const phone = document.createElement('span');
        phone.className = "phone";
        phone.textContent = userList.results[i].phone;
        card.appendChild(phone);

        cards.appendChild(card);
        usersList.push(new Users(userList.results[i].name.first, userList.results[i].name.last));
    }
}

/**
 * Fonction de récupération des utilisateurs avec l'API randomuser
 */
let errorMessage = document.querySelector('.error-message');
async function randomUser() {
    try {
        const result = await fetch(`https://randomuser.me/api/?nat=fr&results=50`);
        // erreur détectée
        if (!result.ok) {
            throw new Error(`Erreur ${result.status}`);
        }
        // Pas d'erreur détectée
        else {
            const userList = await result.json();
            errorMessage.textContent = "";

            // Création des cartes
            createCards(userList);
        }
    }
    catch (error) {
        errorMessage.textContent = error;
    }
}

randomUser();