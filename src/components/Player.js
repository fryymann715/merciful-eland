import React, { PropTypes } from 'react'
import Hand from './Hand'

const Player = ({ name, hand }) => {

  return (
    <div className="player" >
      <h3 className="player-name"> { name } </h3>
      <Hand handArray={ hand } />
    </div>
  )
}

Player.propTypes = {
  hand: PropTypes.array,
  name: PropTypes.string
}

export default Player
