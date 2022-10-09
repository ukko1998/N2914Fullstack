//päivämäärä: 9.10.2022

// Otetaan express käyttöön
const express = require('express');

let txtTiedostonNimi = 'H6T2.txt'; //syötä tähän .txt tiedoston nimi, jonne pyyntimäärä tallentuu
//ohjelma tekee automaattisesti tiedoston, jos sellaista ei ole
const app = express(); //sovelluksen luonti
const port = 3000; //portin valinta
app.use(express.json());
const fs = require('fs'); //tuodaan fs moduuli ohjelmaan, jolla voidaan mm. kirjoittaa tiedotoja

// create logger (H6T2)
const logger = (request, response, next) => {
  const date = new Date();
  const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const log = `${lDate}: ${request.method} ${request.url}`; //lokitieto
  console.log(log);
  next();

  //tallennetaan lokitieto tiedostoon
  fs.writeFile(txtTiedostonNimi, log, (virhe) => {
    if (virhe)
      console.error(virhe); //jos ei onnistu, niin ilmoitetaan konsoliin
    else {
      //jos tallennus onnistuu, niin:
      console.log('Lokitieto tallennettu!\n');
    }
  });
};

// use own made logger middleware in express app
app.use(logger);

//esimerkkidataa JSON-muodossa
let users = [
  { id: '1', name: 'Kirsi Kernel' },
  { id: '2', name: 'Matti Mainio' },
];

// get kaikki käyttäjät
app.get('/users', (request, response) => {
  response.json(users);
});

// get, hae yksi käyttäjä (joka valitaan selainpuolella :id kohtaan)
app.get('/users/:id', (request, response) => {
  //const id = request.params.id // note how you can do this in different ways!
  const { id } = request.params;
  const user = users.find((käyttäjä) => käyttäjä.id === id); //etsii JSON listasta yksi kerrallaan id:itä, kunnes löytää yhteensopivan id muuttujan kanssa
  if (user)
    response.json(user); //palauttaa löydetyn alkion, jos käyttäjä löytyy
  else response.status(404).end(); //muutoin 404 virhe käyttäjälle
});

// delete, poista yksi käyttäjä
app.delete('/users/:id', (request, response) => {
  //const id = request.params.id
  const { id } = request.params;
  users = users.filter((user) => user.id !== id); //filtteröi näkyville vain ne jotka eivät ole id:n numeoa
  // Just send "204 no content" status code back
  response.status(204).end();
});

// put, päivitä käyttäjän data
app.put('/users/:id', (request, response) => {
  //const id = request.params.id
  const { id } = request.params;
  // const name = request.query.name
  const { name } = request.query; //käyttäjän lähettämä data
  const user = users.find((user) => user.id === id); //haetaan json alkio,joka vastaa käyttäjän lähettämää käyttäjän id:tä
  //
  if (user) {
    user.name = name; //päivitetään nimi
    response.status(200).end();
  } else {
    response.status(204).end();
  }
});

// post, tee uusi käyttäjä
app.post('/users/', (request, response) => {
  const maxId = Math.max(...users.map((user) => user.id), 0); //haetaan users JSON objektista suurimman id propertyn arvo
  const user = request.body; //vastaan otetaan käyttäjän lähettämä JSON alkio uudesta käyttäjästä
  user.id = (maxId + 1).toString(); //lisätään yksi isoimpaan löydettyyn id arvoon ja se uuden alkion id:ksi
  users = users.concat(user); //lisätään alkio users JSON objektiin
  response.json(user); //lähetetään tieto JSON-dataan
});

//sovelluksen käynnistys ja portin kuuntelu
app.listen(port, () => {
  console.log('Example app listening on port 3000');
});
