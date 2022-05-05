import './App.scss';
import { useState, useEffect } from 'react';
import Card from './Components/Card';
import Search from './Components/Search';

function App() {


  const [pokemons, setPokemons ] = useState([])
  const [filteredPokemons, setFilteredPokemons ] = useState([])
  const [fetchUrl, setfetchUrl ] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0 ")
  

  const getAllPokemons = async () => {
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
      setFilteredPokemons((currentList) => [...currentList, data]);
    });
    
  }

  const handleSearch = (searchText) => {

    const nameMatch = (name) => name.toLowerCase().includes(searchText.toLowerCase())

    const abilityMatch = (abilitiesData) => {
      let matched = false
      const abilityList = getAbilities(abilitiesData).split(",")
      abilityList.forEach(ability => {
        if (ability.toLowerCase().includes(searchText.toLowerCase())) {
          matched = true
        }
      })
      return matched
    }

    const filterePokemon = pokemons.filter(pokemon => {

      if (nameMatch(pokemon.name) || abilityMatch(pokemon.abilities)) {
        return pokemon
      }
    })
    setFilteredPokemons(filterePokemon)

  }


  const getAbilities = (abilities) => {
    let str= ''
    abilities && abilities.forEach(values => str=str+values.ability.name+', ')
    return (str.slice(0, str.length-2))
}

  const resetFilters = () => {
    setFilteredPokemons(pokemons)
  }

  const handleItemsPerPage = (e) => {
    const count = e.target.value
    console.log(e.target.value)
    
    
    if(pokemons.length<count) {
      getAllPokemons()
    }
    const pok = [...pokemons]
    console.log(pok.length)
    pok.length = count
    setFilteredPokemons(pok)
  }

  const sortPokemons = (selector) => {
    const pokemons = [...filteredPokemons]
    if (selector==="name" ) {
      pokemons.sort((a, b) => a.name.localeCompare(b.name)); 
    }
    else pokemons.sort((a, b) => a[selector] - b[selector]);
    setFilteredPokemons(pokemons)
  }

  useEffect(() => {
    getAllPokemons();
  }, []);


  return (
    <div className="pokemon-app">
      <h2>The Pokemon Application.</h2>
      <span>Have you found your favorite pokemon yet? Lets find out!</span>
      <br/><br/>
      <Search handleSearch={handleSearch} resetFilters={resetFilters}/>
      <div className='controls'>
        <div className='sorting-wrapper'> Sort By : 
          <button onClick={() => sortPokemons('name')}>Name</button>
          <button onClick={() => sortPokemons('height')}>Height</button>
          <button onClick={() => sortPokemons('weight')}>Weight</button>
        </div>
        <div className='itemCount-selection'>Items per page 
          <select id="PerPage" className="form-control" onChange={handleItemsPerPage} defaultValue="20">
              <option value="10">10</option>
              <option value="20">20</option>
          </select>
        </div>
      </div>
      
      <ol className='pokemon-wrapper'> 
        {
          filteredPokemons && filteredPokemons.map(data => <li className='pokemon-item' key={data.id}>
            <Card 
              name={data.name} 
              height ={data.height} 
              weight={data.weight} 
              abilities={getAbilities(data.abilities)} 
              imgUrl={data.sprites.other[`official-artwork`].front_default}
            />
            </li> )
        }
        
      </ol>
    </div>
  );
}

export default App;
