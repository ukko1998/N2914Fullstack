//päivämäärä: 29.9.2022

let txtTiedostonNimi = 'H5T4pyyntimäärä.txt'; //syötä tähän .txt tiedoston nimi, jonne pyyntimäärä tallentuu

const fs = require('fs'); //tuodaan fs moduuli ohjelmaan, jolla voidaan mm. lukea tiedostoja
const http = require('http'); //otetaan http moduuli käyttöön ohjelmassa
const hostname = '127.0.0.1'; //muuttujat
const port = 3000;
let pyyntiMäärä;

//haetaan tekstitiedoston sisältö muuttujaan "Data"
fs.readFile(txtTiedostonNimi, (virhe, data) => {
  if (virhe) console.error(virhe); //jos ei onnistu, niin ilmoitetaan konsoliin
  else {
    //jos onnistuu, niin:

    //tuodaan tekstitiedoston sisältö merkkijonona muuttujaan
    txtSisältö = data.toString();

    pyyntiMäärä = Number(txtSisältö);

    console.log('Pyyntien arvon määrä on: ' + txtSisältö); //tulostaa konsoliin lukujen summan
  }
});

//web serverin sisältö
const server = http.createServer((req, res) => {
  res.statusCode = 200; //onnistuneen koodin lähettäminen
  pyyntiMäärä++; //pyyntimäärä kasvaa joka pyynti kerralla yhdellä
  res.setHeader('Content-Type', 'text/html'); //http syötteen sisltämän datan sisällön tyyppi
  //data:
  res.write(`<meta charset="UTF-8" />`); //ääkköset käyttöön
  res.write(`<h1>Pyyntien arvon määrä on ${pyyntiMäärä}`); //palvelimelle näkyvä osa
  //pyynnin lopetus
  txtSisältö = pyyntiMäärä.toString();

  //tallennetaan pyyntimäärä tiedostoon
  fs.writeFile(txtTiedostonNimi, txtSisältö, (virhe) => {
    if (virhe)
      console.error(virhe); //jos ei onnistu, niin ilmoitetaan konsoliin
    else {
      //jos tallennus onnistuu, niin:
      //serveri puolella näkyvät sisällöt
      console.log('\nTallennus onnistui!');
      console.log('Tallennetttu pyyntimäärä:');
      console.log(fs.readFileSync(txtTiedostonNimi, 'utf8'));
      console.log('lopeta serveri: ctrl + C');
    }
  });
  res.end();
});

//käynnistetään web serveri
server.listen(port, hostname, () => {
  //serveri puolella näkyvät sisällöt
  console.log(
    `Serverin osoite, joka on nyt käynnissä: http://${hostname}:${port}/ 
    lopeta serveri: ctrl + C`
  );
});
