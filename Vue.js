export default class Vue {
    constructor() {
        this.meteo = document.getElementsByClassName("meteo")[0]
        this.categories = document.getElementsByClassName('categories')[0]
        this.containerDrinks = document.getElementsByClassName("drink-list")[0];
        this.containerRecipe = document.getElementsByClassName("drink-recipe")[0]
    }

    createMenuItems(data) {
        const list = document.createElement('ul')

        if (Array.isArray(data.drinks))
            Array.from(data.drinks).forEach(v => {
                const liC = document.createElement('li')
                const a = document.createElement('a')
                a.href = '#'
                a.id = v.strCategory
                a.textContent = v.strCategory
                liC.appendChild(a)
                list.appendChild(liC)
            })
        this.categories.append(list)
    }

    loadDrinks(data) {
        while (this.containerDrinks.firstChild)
            this.containerDrinks.removeChild(this.containerDrinks.firstChild)
        while (this.containerRecipe.firstChild)
            this.containerRecipe.removeChild(this.containerRecipe.firstChild)

        //    console.log("DB : ", container)

        if (Array.isArray(data.drinks))
            Array.from(data.drinks).forEach(v => {

                const div = document.createElement('div')
                div.className = "item"
                div.id = v.idDrink

                const img = document.createElement(`img`)
                img.src = v.strDrinkThumb

                const name = document.createElement(`p`)
                name.textContent = v.strDrink

                div.append(img, name)
                this.containerDrinks.appendChild(div)
            })

    }

    loadRecette(data) {
        while (this.containerDrinks.firstChild) {
            this.containerDrinks.removeChild(this.containerDrinks.firstChild)
        }

        if (Array.isArray(data.drinks))
            Array.from(data.drinks).forEach(v => {

                const h2a = document.createElement('h2')
                h2a.textContent = "Apero du moment"

                const divImgBox = document.createElement('div')
                divImgBox.className = 'imgbox'

                const img = document.createElement(`img`)
                img.src = v.strDrinkThumb

                const divDrinkInfo = document.createElement('div')
                divDrinkInfo.className = 'drink-info'

                const h2b = document.createElement('h2')
                h2b.textContent = v.strDrink

                const p1 = document.createElement('p')
                p1.textContent = "Categorie: " + v.strCategory

                const p2 = document.createElement('p')
                p2.textContent = "type de verre: " + v.strGlass

                const divIngredients = document.createElement('div')
                divIngredients.className = 'ingredients'

                const h2c = document.createElement('h2')
                h2c.textContent = "Ingredients"

                const ul = document.createElement('ul')

                for (let i = 1; i < 15 + 1; i++) {
                    var index = `strIngredient${i}`;
                    if (v[index] !== null) {
                        const li = document.createElement('li')
                        li.textContent = v[index]
                        //                 console.log("DB : ", index)
                        ul.appendChild(li)
                    }
                }

                const divInstructions = document.createElement('div')
                divInstructions.className = 'instructions'

                const h2d = document.createElement('h2')
                h2d.textContent = "Instructions"

                const p3 = document.createElement('p')
                p3.textContent = v.strInstructions

                this.containerRecipe.append(h2a, divImgBox, divDrinkInfo, divIngredients, divInstructions)
                divImgBox.appendChild(img)
                divDrinkInfo.append(h2b, p1, p2)
                divIngredients.append(h2c, ul)
                divInstructions.append(h2d, p3)
            })
    }

    loadMeteo(data) {
        while (this.meteo.firstChild)
            this.meteo.removeChild(this.meteo.firstChild)

        const name = document.createElement(`p`)
        name.textContent = data.name

        const dateTimestamp = data.dt

        const date = document.createElement('p')
        const dateObj = new Date(dateTimestamp * 1000)
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        date.textContent = dateObj.toLocaleString('en-US', options);

        const img = document.createElement(`img`)
        let imgId = data.weather[0].icon
        img.src = `https://openweathermap.org/img/w/${imgId}.png`

        const temp = document.createElement('p')
        temp.textContent = `Température Courante : ${data.main.temp}°C`

        const tempFeelsLike = document.createElement('p')
        tempFeelsLike.textContent = `Température ressenti : ${data.main.feels_like}°C`

        this.meteo.append(name, date, img, temp, tempFeelsLike)
    }

}