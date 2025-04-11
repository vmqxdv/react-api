import Axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [Actresses, SetActresses] = useState([]);
  const [Actors, SetActors] = useState([]);



  const FetchActresses = () => {
    Axios.get('https://www.freetestapi.com/api/v1/actresses')
    .then((Res) => SetActresses(Res.data))
  };
  
  const FetchActors = () => {
    Axios.get('https://www.freetestapi.com/api/v1/actors')
      .then((Res) => SetActors(Res.data))
  };


  
  useEffect(() => {
    FetchActresses();
    FetchActors();
  }, []);



  const GenerateCards = (data) => {
    return data.map((element, i) => {
      const { image, name, nationality, birth_year: birthYear, death_year: deathYear, biography, awards } = element;

      return (
        <div key={name + `-${i}`} className='card'>
          <div className='img-container'>
            <img src={image} alt={name} />
          </div>
          <div className='info'>
            <h2 className='name'>{name}</h2>
            <div className='nationality'>{nationality}</div>
            <div className='birth'>{birthYear} - {deathYear ?? 'presente'}</div>
            <p className='biography'>{biography}</p>
            <hr />
            <p className='awards'>Riconoscimenti: {awards}</p>
          </div>
        </div>
      )
    })
  };



  return (
    <div className='cards'>
      <div key='actresses' className='actresses'>
        {GenerateCards(Actresses)}
      </div>

      <div key='actors' className='actors'>
        {GenerateCards(Actors)}
      </div>
    </div>
  )
};