import React from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = () => {

  return (
    <div className="table">
      <Player />
      <Dealer />
    </div>
  )

}

export default GameTable
