import React from 'react'

const Otsikko = ({ nimi }) => <h1>{nimi}</h1>

const Osa = ({ osa }) => {
  return (<p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)
}

const Sisalto = ({ osat }) => osat.map(osa => <Osa osa={osa} />)

const Yhteensa = ({ osat }) => {
  return (
    <p>Yhteensä {osat.reduce((yhteensa, kurssi) => yhteensa + kurssi.tehtavia, 0)} tehtävää</p>
  )
}

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko nimi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

export default Kurssi