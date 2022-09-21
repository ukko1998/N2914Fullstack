/* const talot = [
  {
    image: 'talo1.jpg',
    address: 'Lönnrotinkatu 3, 00120 , Helsinki',
    size: 170,
    text: 'Granholmin suunnittelema vuonna 1896 valmistunut Kivipalatsi Pyyn korttelissa kuuluu tänäkin päivänä Helsingin kauneimpiin rakennuksiin.',
    price: 700000,
  },
  {
    image: 'talo2.jpg',
    address: 'Telakkakatu 3 A, 00150, Helsinki',
    size: 180,
    text: 'Keittiöstä pariovet avaavat parvekkeen osaksi huonetilaa. Kaksi tilavaa kylpyhuonetta, toisessa amme. Joustavasti muunneltavia huonejakoja, paljon ikkunoita.',
    price: 800000,
  },
  {
    image: 'talo3.jpg',
    address: 'Lönnrotinkatu 3, 00120, Helsinki',
    size: 210,
    text: 'Tämän rauhallisen, täydellisesti saneeratun ja muuttovalmiin huoneiston sisäänkäynti on suojaisan sisäpihan puolella. Huoneiden ikkunat antavat Yrjönkadulle, avokeittiön ja kodinhoitohuoneen ikkunat ovat sisäpihalle.',
    price: 900000,
  },
  {
    image: 'talo4.jpg',
    address: 'Kunnallisneuvoksentie 8 A, 00930 Helsinki',
    size: 190,
    text: 'Helsingin keskustan upeimmasta arvoyhtiöstä on nyt tarjolla kaupungin parhaimmat keskustanäkymät. Historiallinen Lackmanin talo on täydellisesti saneerattu uuteen loistoonsa rakennusyhtiö Hartelan johdolla vuonna 2011 kaunista arkkitehtuuria kunnioittaen.',
    price: 1100000,
  },
  {
    image: 'talo5.jpg',
    address: 'Katajaharjuntie 18, 00200 Helsinki',
    size: 220,
    text: 'Huikean kaunis ja laadukas kokonaisuus arvostetulla alueella meren läheisyydessä Marjaniemessä. Tämä moitteettomassa kunnossa oleva ja hyvin suunniteltu talokaunotar on rakennettu vuonna 2000 ja kuntotarkastettu elokuussa 2014.',
    price: 1200000,
  },
];
 */

//käytin yllä olevaa objektia demoamis käytössä, jottei tarvinnut kikkailla palvelimien kanssa testailu vaiheessa

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
  //let houses = await getHouses(); //kutsutaan async funktiota
  console.log(talot); //vian etsinnän helpommatiseksi tässä vaiheessa tulostetaan saatu json tiedoston sisältö konsoliin

  let housediv = document.getElementById('houses'); //houses divin polku

  //haetaan checkboxien sijainnit, jotta voidaaan käyttää boolean tietoa (esim. checkBoxPrice.checked)
  //että onko checkbox checkattuna vai ei
  let checkBoxSize = document.getElementById('onkoAlle200m2');
  let checkBoxPrice = document.getElementById('onkoAlleMiljoonan');

  housediv.innerHTML = '';

  //json data on taulukko, joten käytetään foreach:ia jokaisen alkion läpi käymiseksi, alkion sisältöihin viitataan objektin tavoin.
  talot.forEach((house) => {
    //datan yksi alkio on muuttujassa "house"

    //jos jompikumpi ehto täyttyy, niin sen tietoja ei näytetä web selaimessa
    if (house.size > 200 && checkBoxSize.checked == true) {
    } //ensimmäinen ehto
    else if (house.price > 1000000 && checkBoxPrice.checked == true) {
    } //toinen ehto

    //muussa tapauksessa jatketaan
    else {
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
      hinta.className = 'hinta';
      hinta.innerHTML = `${numberstr} euroa`;

      housecontainer.appendChild(image);
      housecontainer.appendChild(header);
      housecontainer.appendChild(pintaAla);
      housecontainer.appendChild(teksti);
      housecontainer.appendChild(hinta);
    }

    housediv.appendChild(housecontainer);
  });
}
renderHouses(); //ohjelman alkaa tästä fuktiokutsusta

function klikattu() {
  //jos jompaa kumpaa checkBoxin nappia  painaa, niin suoritetaan tietojen haku uudestaan
  renderHouses();
}
