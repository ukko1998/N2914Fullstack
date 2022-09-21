async function getHouses() {
  //async funktio, joka pyrkii hakemaan data (res) json tiedostosta
  let url = 'talotiedot.json';
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
    image.src = house.image;
    image.className = 'houseImage';

    let header = document.createElement('p');
    header.className = 'header';
    header.innerHTML = house.address;

    let numberstr = new Intl.NumberFormat('fi-FI').format(house.price); //käytetään lukuun suomalaista tapaa numeron ulkoasuun
    let teksti = document.createElement('p');
    teksti.className = 'text';
    teksti.innerHTML = `${house.size} m2 <br><br>${house.text} <br><br> ${numberstr} euroa`;

    housecontainer.appendChild(image);
    housecontainer.appendChild(header);
    housecontainer.appendChild(teksti);

    housediv.appendChild(housecontainer);
  });
}

renderHouses(); //ohjelman alkaaa tästä fuktiokutsusta
