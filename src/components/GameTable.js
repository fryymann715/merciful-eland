import React, { PropTypes } from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = ({ ai_1, ai_2, dealer, deck, player, round }) => {



  return (
    <div className="table">

      <div className="slot dealer-slot">
        <Dealer name={ dealer.name } hand={ dealer.hand }/>
      </div>

      <div className="slot ai-slot">
        <Player name={ ai_1.name } hand={ ai_1.hand }/>
        <Player name={ ai_2.name } hand={ ai_2.hand }/>
      </div>

      <div className="slot player-slot">
        <Player name={player.name} hand={player.hand} />
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
