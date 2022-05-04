import './App.scss';
import { useState, useEffect } from 'react';
import Card from './Components/Card';

function App() {


  const [pokemons, setPokemons ] = useState([])
  const [fetchUrl, setfetchUrl ] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0 ")

  const getAllPokemons = async () => {
    console.log("invoked");
    const res = await fetch(fetchUrl);
    const data = await res.json();
    console.log(data);
    setfetchUrl(data.next);
    getPokemonDetails(data.results);

  }

  const getPokemonDetails = (result) => {
    result.forEach(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await res.json();
      setPokemons((currentList) => [...currentList, data]);
    });
  }


  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="pokemon-app">
      <h2>The Pokemon Application.</h2>
      <span>Have you found your favorite pokemon yet? Lets find out!</span>
      <ol className='pokemon-wrapper'> 
        {
          pokemons && pokemons.map(data => <li className='pokemon-item' key={data.id}>
            <Card 
              name={data.name} 
              height ={data.height} 
              weight={data.weight} 
              abilities={data.abilities} 
              imgUrl={data.sprites.other[`official-artwork`].front_default}
            />
            </li> )
        }
        
      </ol>
    </div>
  );
}

export default App;
