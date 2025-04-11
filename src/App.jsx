import './App.css';

import Axios from 'axios';
import { useEffect, useState } from 'react';


export default function App() {
  const [Actresses, SetActresses] = useState([]);
  const [Actors, SetActors] = useState([]);
  const [Filter, SetFilter] = useState('all');
  const [VisibleItems, SetVisibleItems] = useState(10);



  const FetchActresses = () => {
    Axios.get('https://www.freetestapi.com/api/v1/actresses')
      .then((Res) => SetActresses(Res.data));
  };

  const FetchActors = () => {
    Axios.get('https://www.freetestapi.com/api/v1/actors')
      .then((Res) => SetActors(Res.data));
  };



  useEffect(() => {
    FetchActresses();
    FetchActors();
  }, []);



  const GenerateCards = (data) => {
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

    return sortedData.map((element, i) => {
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
      );
    });
  };



  const RenderFilteredCards = () => {
    const dataMap = {
      all: (
        <>
          <div key="actresses" className="actresses">
            {GenerateCards(Actresses.slice(0, VisibleItems))}
          </div>

          <div key="actors" className="actors">
            {GenerateCards(Actors.slice(0, VisibleItems))}
          </div>
        </>
      ),
      actresses: (
        <div key="actresses" className="actresses">
          {GenerateCards(Actresses.slice(0, VisibleItems))}
        </div>
      ),
      actors: (
        <div key="actors" className="actors">
          {GenerateCards(Actors.slice(0, VisibleItems))}
        </div>
      ),
    };

    return dataMap[Filter] || null;
  };



  return (
    <div>
      <div className='filter-buttons'>
        <button onClick={() => SetFilter('all')}>Tutti</button>
        <button onClick={() => SetFilter('actresses')}>Attrici</button>
        <button onClick={() => SetFilter('actors')}>Attori</button>
      </div>

      <div className='cards'>{RenderFilteredCards()}</div>

      <div className="load-more">
        <button onClick={() => SetVisibleItems((prev) => prev + 10)}>Carica altro</button>
      </div>
    </div>
  );
};