import React, { PropTypes } from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = ({ ai_1, ai_2, dealer, deck, player, round }) => {



  return (
    <div className="table">

      <div className="dealer-slot">
        <Dealer name={dealer.name}/>
      </div>

      <div className="ai-slot">
        <Player name={ai_1.name}/>
        <Player name={ai_2.name}/>
      </div>
      <div className="player-slot">
        <Player name={player.name}/>
      </div>
    </div>
  )

}

GameTable.propTypes = {
  ai_1: PropTypes.object,
  ai_2: PropTypes.object,
  dealer: PropTypes.object,
  deck: PropTypes.array,
  player: PropTypes.object,
  round: PropTypes.number
}

export default GameTable
