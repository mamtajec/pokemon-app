import React, {useEffect, useState } from 'react'

 function Card(props) {

    const { name, height, weight, abilities, imgUrl } = props

  return (
    <div className='item'>
        <div className='image-wrapper'>
            <img src={imgUrl} alt='' />
            </div>
        
        <div className='details-wrapper'>
            <span><b>{name.toUpperCase()}</b> </span>
            <span><b>Weight:</b> {weight}</span>
            <span><b>Height:</b> {height}</span>
            <span><b>Abilities: </b> {abilities}</span>
        </div>
    </div>
  )
}

export default Card
