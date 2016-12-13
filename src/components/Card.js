import React from 'react'

const Card = ({face, suit}) => {
  const getSuitImage = (suit) => {
    if(suit == "Heart") return "../../public/heart.png"
    else if(suit == "Spade") return "../../public/spade.png"
    else if(suit == "Club") return "../../public/Club.png"
    else return "../../public/Diamond.png"
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
