document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelector('.cards');
    //The listOfCharacters is going to store the characters that we fetch from the public API.
    const listOfCharacters = [];
    //The listOfCharactersReduced array is going to store the characters
    //from the listofcharacters.
    const listOfCharactersReduced = [];
    //To add the new character from the form.
    const listOfCharactersNew = [];

    //The fetch will get the characters of super smash bros from the API and
    //push the charavters to the listOfCharacters.
    fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=super smash bros.')
        .then(response => response.json())
        .then(data => data.amiibo.forEach(element => {
            listOfCharacters.push({
                gameSeries: element.gameSeries,
                image: element.image,
                name: element.name
            });
        }));


    //Here we will GET the new character created and append it into
    // a new array.
    fetch('https://choose-your-character-server.herokuapp.com/character')
        .then(response => response.json())
        .then(characters => characters.forEach(character => {

            listOfCharactersNew.push({
                gameSeries: character.gameSeries,
                image: character.image,
                name: character.name
            });
        }));

    //Since the fetch is asyncronous, we will use a setTimeOut() to wait
    // 1 seconds until the fetch loads all the characters to the
    // listOfCharacters array.
    setTimeout(() => {

        //Here we are selecting 10 characters from the listOfCharacters
        //and pushing them into a new array called listOfCharactersReduced
        //to display it on the website.
        for (let i = 0; i < 10; i++) {
            listOfCharactersReduced.push(listOfCharacters[i]);
        }

        //Here we add the new character from the form into the
        // end of the array.
        for (let j = 0; j < listOfCharactersNew.length; j++) {
            listOfCharactersReduced.push(listOfCharactersNew[j]);
        }

        //Here we are going to iterate on each of the objects in the array
        //and display it on the website.
        listOfCharactersReduced.forEach(character => {
            const card = document.createElement('div');
            const circle = document.createElement('div');
            const img = document.createElement('img');
            card.className = 'card';
            circle.className = 'circle';
            img.name = character.name;
            img.src = character.image;
            img.className = 'img';
            circle.appendChild(img);
            card.appendChild(circle);
            cards.append(card);

        }, 1000);

        //Here we are adding a Gif and wait 1 second so that i can be add at the end of the cards.
        setTimeout(() => {
            const addCharacterForm = document.getElementById('Add-Character');
            const titleForm = document.querySelector('.container2');
            const card = document.createElement('div');
            const circle = document.createElement('div');
            const addGif = document.createElement('img');
            card.className = 'card';
            circle.className = 'circle';
            addGif.id = 'add-Character'
            addGif.src = 'https://cdn.dribbble.com/users/388048/screenshots/3062368/_.gif';
            addGif.width = 90;
            addGif.style.marginTop = 45 + '%';
            circle.appendChild(addGif);
            card.appendChild(circle);
            cards.append(card);

            addGif.addEventListener('click', () => {
                addCharacterForm.hidden = false;
                titleForm.style.visibility = 'visible';
            });

            //Here goes the code to add new Character
            addCharacterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                //fetch
                fetch('http://localhost:3000/character', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        gameSeries: e.target.gameSeries.value,
                        image: e.target.image.value,
                        name: e.target.name.value
                    }),
                });

            });

        }, 1000);

        //Here we are iterating through each element of the circle array which 
        // holds the div elements with the class named cirle. 
        //We are also hidding the characters bio and image from the

        const circle = document.querySelectorAll('.circle');
        const nameSeries = document.getElementById('game-series');
        const characterName = document.getElementById('character-name');
        const characterImage = document.getElementById('image');
        const box = document.querySelector('.container');

        circle.forEach(element => {

            element.addEventListener('click', (e) => {
                const dotted2 = document.querySelector('.dotted2');
                dotted2.hidden = false;
                nameSeries.hidden = false;
                characterName.hidden = false;
                characterImage.hidden = false;
                box.hidden = false;

                for (let i = 0; i < listOfCharactersReduced.length; i++) {
                    if (listOfCharactersReduced[i].name === e.target.name) {
                        nameSeries.textContent = `Name Series: ${listOfCharactersReduced[i].gameSeries}`;
                        characterName.textContent = `Character's Name: ${listOfCharactersReduced[i].name}`;
                        characterImage.src = listOfCharactersReduced[i].image;
                    }
                }
            });
        });

    }, 2000);


    //switch button to turn the background dark
    const toggle = document.querySelector('.switch [type="checkbox"]');

    toggle.addEventListener('click', () => {
        const box = document.querySelector('.container');
        const dottedLine = document.querySelector('.dotted');
        const dottedLine2 = document.querySelector('.dotted2');
        const marioGif = document.querySelector('.mario-gif');
        const lightsOut = document.querySelector('.lights-out');

        if (toggle.checked === true) {
            document.body.style.backgroundColor = '#404040';
            document.body.style.color = 'white';
            document.querySelector('.logo').style.filter = 'invert(75%)';
            box.style.animation = "color-change 5s linear infinite";
            dottedLine.style.borderColor = 'green';
            dottedLine2.style.borderColor = 'green';
            marioGif.hidden = true;
            lightsOut.hidden = false;



        } else {
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
            document.querySelector('.logo').style.filter = 'invert(0%)'
            box.style.animation = "";
            dottedLine.style.borderColor = '#bbb';
            dottedLine2.style.borderColor = '#bbb';
            marioGif.hidden = false;
            lightsOut.hidden = true;

        }
    });
});