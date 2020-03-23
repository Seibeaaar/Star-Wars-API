const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

function getCharacters() {
    container.innerHTML = '';
    const movieNumber = document.querySelector('input').value;
    return fetch('https://swapi.co/api/films/' + movieNumber).then(response => response.json()).then(data => {
      for(let name of data.characters) {
        fetch(name).then(response => response.json()).then(res => {
          const charDiv = document.createElement('div');
          charDiv.classList.add('character__block');
          charDiv.innerHTML = `
          <li>Name: ${res.name}</li>
          <li>DOB: ${res.birth_year}</li>
          <li>Gender: ${res.gender}</li>
          `;
          container.append(charDiv);
        }).catch(err => {
          charDiv.innerHTML = 'Unknown character';
          container.append(charDiv);
        })
      }      
    }).catch(err => {
    alert('Sorry, this episode doesn\'t even exist');
  })
}

document.querySelector('.btn__info--chars').addEventListener('click', getCharacters);

function getPlanets(url) {
  container.innerHTML = '';
    return fetch(url).then(response => response.json()).then(data => {
      for(let planet of data.results) {
        const planetDiv = document.createElement('div');
        planetDiv.classList.add('character__block');
        planetDiv.innerHTML = `
        <li>Name: ${planet.name}</li>
        <li>Diameter: ${planet.diameter}</li>
        <li>Population: ${planet.population}</li>
        `
        container.append(planetDiv);
      }
    }).catch(err => {
    alert('No more planets');
  })
}

document.querySelector('.btn__info--planets').addEventListener('click', function getPlanetsCallBack() {
  getPlanets('https://swapi.co/api/planets');
});

let counter = 1;
document.querySelector('.btn__info--next').addEventListener('click', function() {
  counter++;
  getPlanets('https://swapi.co/api/planets/?page=' + counter);
})