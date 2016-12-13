import React, { PropTypes } from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = ({ deck, players, round }) => {

  let dealer, ai_1, ai_2, player

  if ( round === 0 ) {
    dealer = { name: players[0] }
    ai_1 = { name: players[1].name }
    ai_2 = { name: players[2].name }
    player = { name: players[3].name }
  }


  return (
    <div className="table">

      <div className="dealer-slot">
        <Dealer />
      </div>

      <div className="ai-slot">
        <Player name="Two" />
        <Player name="One" />
      </div>
      <div className="player-slot">
        <Player name="Human" />
      </div>
    </div>
  )

}

GameTable.propTypes = {
  deck: PropTypes.array,
  players: PropTypes.array
}

export default GameTable
