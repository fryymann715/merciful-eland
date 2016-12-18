import React from 'react'
import club from '../../public/images/club.png'
import heart from '../../public/images/heart.png'
import diamond from '../../public/images/diamond.png'
import spade from '../../public/images/spade.png'

const Card = ({ face, suit, faceDown }) => {

  const classString = (str) => {

    const hideOnTrue = faceDown ? "displayNone" : "displayNormal"
    const revealOnTrue = faceDown ? "displayNormal" : "displayNone"
    const faceDownClass = faceDown ? " faceUp" : " faceDown"

    const getSuitImage = (suit) => {
      if(suit == "Heart") return heart
      else if(suit == "Spade") return spade
      else if(suit == "Club") return club
      else return diamond
    }

    if(str == "content") {
      return `card face ${suit} ${hideOnTrue}`
    } else {
      return `card faceDown ${suit} ${revealOnTrue}`
    }
  }

  return (
  <div>
    <div className={classString("content")} >
      <span>{ face }</span>
      {/* <span>{ suit }</span> */}
    </div>
    <div className={classString("back")}></div>
  </div>
    )
}

export default Card
