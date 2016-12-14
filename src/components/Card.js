import React from 'react'
import club from '../../public/images/club.png'
import heart from '../../public/images/heart.png'
import diamond from '../../public/images/diamond.png'
import spade from '../../public/images/spade.png'

const Card = ({face, suit, faceDown}) => {

  const backOrNot = faceDown ? <div className="face-down"></div> : <div></div>
  const onOrOff = faceDown ? "serafinOff" : "serafinOn"
  const offOrOn = faceDown ? "serafinOn" : "serafinOff"
  const faceDownClass = faceDown ? " "

  const getSuitImage = (suit) => {
    if(suit == "Heart") return heart
    else if(suit == "Spade") return spade
    else if(suit == "Club") return club
    else return diamond
  }

  return (
    <div className={"card"+faceDownClass} >
      <div className={onOrOff}>
      </div>
      <div className={offOrOn}>
        <div className="backOrNot">Pos</div>
        <div className="row">
          <h1 className="face">{face}</h1>
        </div>
        <div className="row">
          <img src={getSuitImage(suit)}></img>
        </div>
      </div>

    </div>
    )
}

export default Card
