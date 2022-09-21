async function getHouses() {
  //async funktio, joka pyrkii hakemaan data (res) json tiedostosta
  let url = '../H4T1/talotiedot.json';
  try {
    //yrittää hakea tiedostoa ja siirtää sen sisältämän datan muuttujaan "res"
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderHouses() {
  let houses = await getHouses(); //kutsutaan async funktiota
  console.log(houses); //vian etsinnän helpommatiseksi tässä vaiheessa tulostetaan saatu json tiedoston sisältö konsoliin

  let housediv = document.getElementById('houses'); //houses divin polku

  //json data on taulukko, joten käytetään foreach:ia jokaisen alkion läpi käymiseksi, alkion sisältöihin viitataan objektin tavoin.
  houses.forEach((house) => {
    //datan yksi alkio on muuttujassa "house"
    housecontainer = document.createElement('div'); //DOMia muokkaamalla lisätään elementtejä
    housecontainer.className = 'houseContainer'; //ja elementteihin ominaisuuksia (tässä: luokka)

    let image = document.createElement('img');
    image.src = '../H4T1/' + house.image;
    image.className = 'houseImage';

    let header = document.createElement('p');
    header.className = 'header';
    header.innerHTML = house.address;

    let pintaAla = document.createElement('p');
    pintaAla.innerHTML = `${house.size} m2`;

    let teksti = document.createElement('p');
    teksti.className = 'text';
    teksti.innerHTML = house.text;

    let numberstr = new Intl.NumberFormat('fi-FI').format(house.price); //käytetään lukuun suomalaista tapaa numeron ulkoasuun
    let hinta = document.createElement('p');
    hinta.innerHTML = `${numberstr} euroa`;

    housecontainer.appendChild(image);
    housecontainer.appendChild(header);
    housecontainer.appendChild(pintaAla);
    housecontainer.appendChild(teksti);
    housecontainer.appendChild(hinta);

    housediv.appendChild(housecontainer);
  });
}

renderHouses(); //ohjelman alkaaa tästä fuktiokutsusta
