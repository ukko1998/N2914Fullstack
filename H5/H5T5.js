// päivämäärä: 29.9.2022

const path = require('path');
const { arrayBuffer } = require('stream/consumers');

if (
  process.argv.length <= 4 || //jos käynnistysparametrien määrä on alle 5 tai
  isNaN(process.argv[2]) || //jos kolmannes parametri ei ole luku tai
  isNaN(process.argv[3]) || //jos neljäs ei ole luku tai
  isNaN(process.argv[4]) //jos viides parametri ei ole luku,...
) {
  //...niin neuvotaan käyttäjää:
  console.log(
    `Käyttö: ${path.basename(
      __filename //haetaan tiedoston nimi (H5T5.js)
    )} ARVOTTUJEN_NUMEROIDEN_MÄÄRÄ MIN_ARVO MAX_ARVO`
  );
  process.exit(-1); //ja keskeytetään ohjelma
}
//jos käyttäjä on syöttänyt käynnistysparametrit oikein, niin ohjelma jatkuu

//muuttujat
const määrä = parseInt(process.argv[2]);
const minArvo = parseInt(process.argv[3]);
const maxArvo = parseInt(process.argv[4]);
const lista = [];

const erotus = maxArvo - minArvo + 1; //min ja max arvojen erotus johon lisätään yksi, koska...

/*math.random arpoo luvun väliltä 0-1, joten kun se kerrotaan esim. 10:llä, 
niin arvotut numerot on väliltä 0-10,
mutta pyöristys on alaspäin, joten esim. 9.9 pyöristyy 9:ksi, joten luku 10 ei käytännössä tule ikinä, 
vaan arvonta on pikemminkin välillä 0-9.999..., eli 0-9, kun on pyöristetty alas,
lisäämällä ykkösen arvonta on välillä 0-10.999..., eli 0-10, kuten sen halutaan olevan.*/

//tehdään määrä muuttujan pituinen lista, johon arvotaan numerot väliltä min- ja max-arvot
for (let i = 0; i < määrä; i++) {
  lista.push(Math.floor(Math.random() * erotus) + minArvo);
}

//tulostetaan lista konsoliin
console.log(lista);
