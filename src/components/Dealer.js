import React, { PropTypes } from 'react'
import Hand from './Hand'

const Dealer = ({ name }) => {

  return (
    <div className="player dealer">
      <h3> {name} </h3>
      <Hand />
    </div>
  )
}

Dealer.propTypes = {
  name: PropTypes.string,
}

export default Dealer
