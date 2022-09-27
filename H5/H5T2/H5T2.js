//päivämäärä: 27.9.2022

//tuodaan moduuli ohjelmaan
const user = require('./H5T2module');

//syötä syntymäpäiväsi tähän
let vuosi = 1998;
let kuukausi = 4;
let päivä = 20;

//moduulista haetaan tiedot ja muokataan päivämäärä muotoon dd.mm.yyyy
console.log(
  `${user.nimi()} asuu paikkakunnalla ${user.paikka()} ja on syntynyt ${user.syntynyt(
    päivä,
    kuukausi,
    vuosi
  )}.`
);
