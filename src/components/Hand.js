import React, { PropTypes } from 'react'
import Card from './Card'

const Hand = ({ handArray }) => {

  const cards =  handArray ? handArray.map( ( card, key ) => {
    return <Card key={key} face={card.face} suit={card.suit} faceDown={card.faceDown} />}) : []

  return (
    <div className="hand">
      { cards }
    </div>
  )
}

Hand.propTypes = {
  handArray: PropTypes.array
}

export default Hand
