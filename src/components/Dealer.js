import React, { PropTypes } from 'react'
import Hand from './Hand'

const Dealer = ({ hand, name }) => {
  return (
    <div className="player dealer">
      <h3 className="player-name"> {name} </h3>
      <Hand handArray={hand} />
    </div>
  )
}

Dealer.propTypes = {
  hand: PropTypes.array,
  name: PropTypes.string
}

export default Dealer
