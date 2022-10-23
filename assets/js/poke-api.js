document.querySelector('#searchPokemon').addEventListener('submit', getPokemon);

//Fetch pokemon data from user input
function getPokemon(e) {
    e.preventDefault();
    //Get user input
    const pokeInput = document.querySelector('#pokeInput').value.toLowerCase();
    //Fetch data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}/`)
        .then(res => res.json())
        .then(data => {
            //Render DOM
            renderResults(data);
        })
        .catch(err => {
            //Render no results warning if nothing found
            const searchResults = document.querySelector('#searchResults');
            searchResults.textContent = '';
            const noneFound = document.createElement('h2');
            noneFound.textContent = 'No search results found please try again.';
            searchResults.append(noneFound);
            //Log error
            console.log(`Error: ${err}`)
        })
}

//Render DOM with fetched results
function renderResults(result) {
    document.querySelector('#searchResults').textContent = ''
    const divContainer = document.createElement('div');
    divContainer.classList.add('col-4','col-6-medium','col-12-small');
    const sectionBox = document.createElement('section');
    sectionBox.classList.add('box');
    const link = document.createElement('a');
    link.classList.add('image', 'featured');
    const image = document.createElement('img');
    image.src = result.sprites.other['official-artwork']['front_default']
    const header = document.createElement('header');
    const h3 = document.createElement('h3');
    // Assign text content of header (with first letter at uppercase)
    h3.textContent = firstCharToUpperCase(result.name);
    const h4 = document.createElement('h4');
    h4.textContent = `#${result['game_indices'][3]['game_index']}`;
    const weight = document.createElement('p');
    weight.textContent = `Weight: ${result.weight}`
    document.querySelector('#searchResults').append(divContainer);
    divContainer.append(sectionBox);
    link.append(image);
    header.append(h3, h4);
    const type = document.createElement('p');
    type.textContent = 'Type: '
    sectionBox.append(link, header, type);
    // Loop through types to render to DOM
    result.types.forEach((el, i) => {
        if (i === 0) {
            type.textContent += `${firstCharToUpperCase(el.type.name)}`;
        } else {
            type.textContent += `, ${firstCharToUpperCase(el.type.name)}`;
        }
    })
    sectionBox.append(weight);
}


//First character of string to upper case helper function
function firstCharToUpperCase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}