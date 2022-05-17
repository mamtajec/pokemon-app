import React, { useState, useEffect } from 'react'

export default function Search(props) {

  const { handleSearch, resetFilters } = props
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    !inputValue && resetFilters();

    var input = document.getElementById("myInput");

    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch(inputValue)
      }
    });
  }, [inputValue]);


  return <div className='search-wrapper'>
    <input type="search" id="myInput" value={inputValue} onChange={e => setInputValue(e.target.value)} />
    <button onClick={() => handleSearch(inputValue)}>Search</button>
  </div>
}
