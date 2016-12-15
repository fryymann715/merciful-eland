import React, { PropTypes } from 'react'
import Hand from './Hand'

const Dealer = ({ hand, name }) => {
  console.log(hand)

  return (
    <div className="player dealer">
      <h3> {name} </h3>
      <Hand handArray={hand} />
    </div>
  )
}

Dealer.propTypes = {
  hand: PropTypes.array,
  name: PropTypes.string
}

export default Dealer
