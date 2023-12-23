import Vue from "./Vue.js";

class Controleur {
    constructor() {
        this.vue = new Vue;
        this.api = undefined;
    }

    start() {
        this.loadMenu();
        this.meteo();
        this.random();
    }

    loadMenu() {
        this.api = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;


        fetch(this.api)
            .then(response => response.json())
            .then(data => {
                //console.log("DB : ", data)
                controleur.vue.createMenuItems(data)
            })
            .then(() => {
                const anchors = controleur.vue.categories.children[0].children;
                //           console.log("DB : anchors", anchors)
                Array.from(anchors).forEach(element => {
                    element.addEventListener('click', controleur.filtrer);
                });
            })
            .catch(error => console.error(error));
    }

    async rechercher(e) {
        console.log("DB e : ", e.target.value)
        let drinkName = await e.target.value;

        this.api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;

        fetch(this.api)
            .then(response => response.json())
            .then(data => {
                console.log("DB : ", data)
                controleur.vue.loadDrinks(data)
            })
            .then(() => {
                const list = document.getElementsByClassName("item")
                if (list.length > 0) {
                    Array.from(list).forEach(v => {
                        v.addEventListener('click', controleur.recette)
                    })
                }
            })
            .catch(error => console.error(error));

    }

    filtrer(e) {
        //console.log("DB filtrer(): ", e.currentTarget)
        let drinkCategory = e.currentTarget.firstChild.id;

        this.api = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`;

        fetch(this.api)
            .then(response => response.json())
            .then(data => {
                console.log("DB drinks[]: ", data)
                controleur.vue.loadDrinks(data)
            })
            .then(() => {
                const list = document.getElementsByClassName("item")
                if (list.length > 0) {
                    Array.from(list).forEach(v => {
                        v.addEventListener('click', controleur.recette)
                    })
                }
            })
            .catch(error => console.error(error));
    }

    recette(e) {
        let drinkId = e.currentTarget.id;

        this.api = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

        fetch(this.api)
            .then(response => response.json())
            .then(data => {
                console.log("DB recette: ", data)
                controleur.vue.loadRecette(data)
            })
            .catch(error => console.error(error));
    }

    random() {
        this.api = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;


        fetch(this.api)
            .then(response => response.json())
            .then(data => {
                //    console.log("DB : ", data)
                controleur.vue.loadRecette(data);
            })
            .catch(error => console.error(error));


    }

    meteo() {
        const cityName = "Montréal"
        const apiKey = "921ff38ebe5084b4fe2c94b878719717";
        let apiMeteo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(apiMeteo)
            .then(response => response.json())
            .then(data => {
                console.log("DB meteo: ", data)
                controleur.vue.loadMeteo(data)
            })
            .catch(error => console.error(error));
    }
}

const controleur = new Controleur();
const input = document.querySelector('input');
const p = document.getElementById('clear-button');

window.onload = function () {
    controleur.start();
}

p.addEventListener('click', () => {
    input.value = "";
})

input.addEventListener('input', controleur.rechercher);
