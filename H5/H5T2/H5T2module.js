// H5T2module.js
//päivämäärä: 27.9.2022

const nimi = () => {
  return 'Tommi Martikainen'; //palauttaa nimen
};

const paikka = () => {
  return 'Tampere'; //palauttaa asuin paikkakunnan
};

const syntynyt = (d, m, y) => {
  const lisäNollat = (luku, nollienMäärä) =>
    String(luku).padStart(nollienMäärä, '0'); //lisää lukuihin nollia,
  //jos luku on lyhyempi kuin "nollien määrä" kohtaan on määritelty

  päivä = lisäNollat(d, 2);
  kuukausi = lisäNollat(m, 2); //haetaan lukuihin ekstra nollat funktiokutsulla
  vuosi = lisäNollat(y, 4);

  return `${päivä}.${kuukausi}.${vuosi}`; //palautetaan päivämäärä muodossa dd.mm.yyyy
};

module.exports = {
  nimi,
  paikka,
  syntynyt,
};
