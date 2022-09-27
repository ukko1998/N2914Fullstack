//päivämäärä: 28.9.2022

let txtTiedostonNimi = 'H5T3numerot.txt'; //syötä tähän .txt tiedoston nimi

//tuodaan fs moduuli ohjelmaan, jolla voidaan mm. lukea tiedostoja
const fs = require('fs');

//muuttujat
let txtSisältö;
let summa = 0;

//haetaan tekstitiedoston sisältö muuttujaan "Data"
fs.readFile(txtTiedostonNimi, (virhe, data) => {
  if (virhe) console.error(virhe); //jos ei onnistu, niin ilmoitetaan konsoliin
  else {
    //jos onnistuu, niin:

    //tuodaan tekstitiedoston sisältö merkkijonona muuttujaan
    txtSisältö = data.toString();

    //funktio joka lisää välit merkkijonoon ja sitten "mappaa" niistä listan
    const lista = txtSisältö.split(',').map((numerot) => {
      //lopuksi muutetaan listan alkiot numeroiksi ja palautetaan valmis lista
      return Number(numerot);
    });

    //kutsuu lista muuttujan kautta listan numeroista ja lisää jokaisen alkion arvon summa muuttujaan
    lista.forEach((numero) => {
      summa += numero;
    });

    console.log('Summa on: ' + summa); //tulostaa konsoliin lukujen summan
  }
});

console.log('Luetaan ja lasketaan tiedostossa olevien lukujen summaa...');

/*
node h5t3.js
> Luetaan ja lasketaan tiedostossa olevien lukujen summaa...
> Summa on: 36
*/
