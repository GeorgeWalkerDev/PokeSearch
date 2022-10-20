document.querySelector('#searchPokemon').addEventListener('submit', getPokemon);

function getPokemon(e) {
    e.preventDefault();
    const pokeInput = document.querySelector('#pokeInput').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput}/`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderResults(data);
        })
        .catch(err => console.log(`Error: ${err}`))
}

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
    h3.textContent = result.name.charAt(0).toUpperCase() + result.name.slice(1);
    const type = document.createElement('p');
    const weight = document.createElement('p');
    weight.textContent = `Weight: ${result.weight}`
    document.querySelector('#searchResults').append(divContainer);
    divContainer.append(sectionBox);
    link.append(image);
    header.append(h3);
    sectionBox.append(link, header, type, weight);
}
