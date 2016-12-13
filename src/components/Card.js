import React from 'react'
import club from '../../public/club.png'
import heart from '../../public/heart.png'
import diamond from '../../public/diamond.png'
import spade from '../../public/spade.png'

const Card = ({face, suit}) => {
  const getSuitImage = (suit) => {
    if(suit == "Heart") return heart
    else if(suit == "Spade") return spade
    else if(suit == "Club") return club
    else return diamond
  }

  return (
    <div className="card">
      <div className="row">
        <h1>{face}</h1>
      </div>
      <div className="row">
        <img src={getSuitImage(suit)}></img>
      </div>

    </div>
    )
}

export default Card
