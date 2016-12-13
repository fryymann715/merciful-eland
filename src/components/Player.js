import React, { PropTypes } from 'react'
import Hand from './Hand'

const Player = ({ name }) => {

  return (
    <div className="player" >
      <h3> {name} </h3>
      <Hand />
    </div>
  )
}

Player.propTypes = {
  name: PropTypes.string
}

export default Player
