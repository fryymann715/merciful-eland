import React from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = () => {

  return (
    <div className="table">
      <Player name="One" />
      <Player name="Human" />
      <Player name="Two" />
      <Dealer />
    </div>
  )

}

export default GameTable
