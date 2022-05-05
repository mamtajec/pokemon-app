import React, {useState, useEffect } from 'react'

export default function Search(props) {

    const {handleSearch, resetFilters} = props
    const [inputValue, setInputValue ] = useState("")

    useEffect(() => {
        !inputValue && resetFilters();
      }, [inputValue]);


  return <div className='search-wrapper'>
    <input type="search" value={inputValue} onChange={e=>setInputValue(e.target.value)} />
    <button onClick={() => handleSearch(inputValue)}>Search</button>
  </div>
}
