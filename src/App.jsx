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


  console.log(Actresses, Actors);

  return (
    <>
    </>
  )
};