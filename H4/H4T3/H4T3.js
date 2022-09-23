/* const testi = [
  'Aava',
  'Aamu',
  'Anni',
  'Ari',
  'Eeva',
  'Eero',
  'Esa',
  'Kari',
  'Kalle',
  'Paavo',
  'Pasi',
]; */
async function jsonLista() {
  //async funktio, joka pyrkii hakemaan data (res) json tiedostosta
  let url = 'nimiLista.json';
  try {
    //yrittää hakea tiedostoa ja siirtää sen sisältämän datan muuttujaan "res"
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

let ul, li, TekstiSyöte, lista;

TekstiSyöte = document.getElementById('hakuInput');
lista = jsonLista();

function haeKirjainta(nimi) {
  nimi = nimi.toUpperCase();
  ul = document.getElementById('myUL');

  ul.innerHTML = ''; //tyhjennetään lista, kun haetaan uudet nimet

  //käydään jokainen json listan alkio läpi, siten että...
  lista.forEach((niminen) => {
    let hakuSana = '';
    let i = 0;

    //käydään läpi niin usein kun käyttäjä on laittanut kirjaimia tekstilaatikkoon
    while (i < nimi.length) {
      hakuSana += niminen[i]; //muodostetaan yksitellen json alkiosta teksisyötteen pituinen merkkijono
      i++;

      //verrataan käyttäjän syötettä json alkion merkkijonoon
      if (hakuSana.toUpperCase() == nimi) {
        ul.innerHTML += `<li><a href="#">${niminen}</a></li><br>`; //jos ne alkaa samoin (kirjainkoolla ei väliä), niin lisätään li node sille
      }
    }
  });

  let listItems = document.querySelectorAll('li'); //tehdään lista kaikista li nodeista

  //console.log(listItems); //tarkistusta varten

  var currentLI = 0; //tällä pidetän kirjaa missä <li> nodessa liikutaan

  listItems[currentLI].classList.add('highlight');

  document.addEventListener('keydown', function (event) {
    // painamalla eri näppäimiä näppäimistöstä tehdään eri asioita
    switch (event.keyCode) {
      case 38: // Nuoli ylös
        listItems[currentLI].classList.remove('highlight'); //poistaa korostuksen edellisestä elementistä

        currentLI = currentLI > 0 ? --currentLI : 0; // minimi indeksi on 0, mutta jos nykyinen highlight sijainti on isommassa indeksissä, niin vähennetään yksi
        listItems[currentLI].classList.add('highlight'); // korostetaan uusi elementti
        break;
      case 40: // Nuoli alas
        listItems[currentLI].classList.remove('highlight'); //poistaa korostuksen edellisestä elementistä

        currentLI =
          currentLI < listItems.length - 1 ? ++currentLI : listItems.length - 1; // asettaa rajat nuolilla liikkumiseen ja liikkuu yhdellä, jos ei ylitetä rajoja
        listItems[currentLI].classList.add('highlight'); // korostaa uuden elementin
        break;
      case 13: // Enter
        let valittuNimi = listItems[currentLI].querySelector('a').innerText;
        TekstiSyöte.value = valittuNimi;
        haeKirjainta(valittuNimi);
        break;
    }
  });
}

//esc napista tyhjennetään kaikki, eli ns. aloitetaan alusta
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.keyCode === 27) {
    ul.innerHTML = '';
    TekstiSyöte.value = '';
  }
});
