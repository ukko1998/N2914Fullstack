// Otetaan express käyttöön
const express = require('express');

let txtTiedostonNimi = 'H7T3.txt'; //syötä tähän .txt tiedoston nimi, jonne loki tallentuu
//ohjelma tekee automaattisesti tiedoston, jos sellaista ei ole
const app = express(); //sovelluksen luonti
const port = 3000; //portin valinta
app.use(express.json());
const fs = require('fs'); //tuodaan fs moduuli ohjelmaan, jolla voidaan mm. kirjoittaa tiedotoja
const mongoose = require('mongoose'); //tuodaan mongoose moduuli ohjelmaa.

// mongoon yhdistämisen merkkijono
const mongoDB =
  'mongodb+srv://ukko1998:1998@mongodemocluster.ga5qwgp.mongodb.net/H7T3?retryWrites=true&w=majority';

// yhdistetään mongodb
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// tarkistetaan yhteyden toimivuus - ok tai error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database test connected');
});

// uusi schema
const userSchema = new mongoose.Schema({
  name: String,
});

// uusi USER-malli
const User = mongoose.model('User', userSchema, 'users');

/* //määritellään personScheman vaatimukset
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: String,
}); */

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

/* //esimerkkidataa JSON-muodossa
let users = [
  { id: '1', name: 'Kirsi Kernel' },
  { id: '2', name: 'Matti Mainio' },
]; */

// get kaikki käyttäjät
app.get('/users', async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

// get, hae yksi käyttäjä (joka valitaan selainpuolella :id kohtaan)
app.get('/users/:id', async (request, response) => {
  //const id = request.params.id // note how you can do this in different ways!
  const { id } = request.params;
  //const user = users.find((käyttäjä) => käyttäjä.id === id); //etsii JSON listasta yksi kerrallaan id:itä, kunnes löytää yhteensopivan id muuttujan kanssa

  const user = await User.findById(request.params.id); //hakee id:n mukaan yhden henkilön tiedot
  //HUOM!!!! ohjelma kaatuu, jos antaa väärän id:n, syy on minulle hieman epäselvä
  if (user)
    response.json(user); //palauttaa löydetyn alkion, jos käyttäjä löytyy
  else response.status(404).end(); //muutoin 404 virhe käyttäjälle
});

// delete, poista yksi käyttäjä
app.delete('/users/:id', async (request, response) => {
  //const id = request.params.id
  //(const { id } = request.params;

  const deletedUser = await User.findByIdAndRemove(request.params.id); //haetaan id:llä käyttäjä joka halutaan poistaa
  //HUOM!!!! ohjelma kaatuu, jos antaa väärän id:n, syy on minulle hieman epäselvä
  if (deletedUser) response.json(deletedUser);
  //jos löytyy, kerrotaan käyttäjälle, että se onnistui
  else response.status(404).end(); //muussa tapauksessa lähetetään 404, eli ei löydy

  //users = users.filter((user) => user.id !== id); //filtteröi näkyville vain ne jotka eivät ole id:n numeoa
  // Just send "204 no content" status code back
  //response.status(204).end();
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
app.post('/users', async (request, response) => {
  //const maxId = Math.max(...users.map((user) => user.id), 0); //haetaan users JSON objektista suurimman id propertyn arvo
  const nimi = request.body; //vastaan otetaan käyttäjän lähettämä JSON alkio uudesta käyttäjästä
  const user = new User({
    name: nimi.name,
  });
  //console.log(request.body);
  //console.log(nimi.name);
  // tallennetaan db (tietokonataan) ja lähetetään kutsujalle
  const savedUser = await user.save();
  response.json(savedUser);

  //user.id = (maxId + 1).toString(); //lisätään yksi isoimpaan löydettyyn id arvoon ja se uuden alkion id:ksi
  //users = users.concat(user); //lisätään alkio users JSON objektiin
  //response.json(user); //lähetetään tieto JSON-dataan
});

//sovelluksen käynnistys ja portin kuuntelu
app.listen(port, () => {
  console.log('Example app listening on port 3000');
});
