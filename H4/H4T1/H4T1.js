async function getHouses() {
  let url = 'talotiedot.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderHouses() {
  let houses = await getHouses();
  console.log(houses);

  let housediv = document.getElementById('houses');

  houses.forEach((house) => {
    housecontainer = document.createElement('div');
    housecontainer.className = 'houseContainer';

    let image = document.createElement('img');
    image.src = house.image;
    image.className = 'houseImage';

    let header = document.createElement('p');
    header.className = 'header';
    header.innerHTML = house.address;

    let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
    let teksti = document.createElement('p');
    teksti.className = 'text';
    teksti.innerHTML = `${house.size} m2 <br>${house.text} <br> ${numberstr} euroa`;
    /*
           Ohjelmoi tähän toiminnallisuus, jossa luodaan p-elementit
           myös talon koon, tekstikuvauksen ja hinnan näyttämiselle
           Hinnan voit muotoilla tuhaterottimia käyttävään suomalaiseen
           muotoon esim:
        let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
      */

    housecontainer.appendChild(image);
    housecontainer.appendChild(header);
    housecontainer.appendChild(teksti);

    housediv.appendChild(housecontainer);
  });
}

renderHouses(); //ohjelman aloittaminen
