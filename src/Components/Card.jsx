import React, {useEffect, useState } from 'react'

 function Card(props) {

    const { name, height, weight, abilities, imgUrl } = props
    const [ ability, setAbility] =useState("")

    const getAbilities = (abilities) => {
        let str= ''
        abilities && abilities.forEach(values => str=str+values.ability.name+', ')
        setAbility(str.slice(0, str.length-2))
    }
    useEffect(() => {
        getAbilities(abilities)
    }, []);
  return (
    <div className='item'>
        <div className='image-wrapper'>
            <img src={imgUrl} alt='' />
            </div>
        
        <div className='details-wrapper'>
            <span><b>Name:</b> {name}</span>
            <span><b>Weight:</b> {height}</span>
            <span><b>Height:</b> {weight}</span>
            <span><b>Abilities: </b> {ability}</span>
        </div>
    </div>
  )
}

export default Card
