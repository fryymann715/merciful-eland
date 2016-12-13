import React, { PropTypes } from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = ({ deck, players, round }) => {

  let dealer, ai_1, ai_2, player

  if ( round === 0 ) {
    dealer = { name: players[0].name }
    ai_1 = { name: players[1].name }
    ai_2 = { name: players[2].name }
    player = { name: players[3].name }
  }


  return (
    <div className="table">

      <div className="dealer-slot">
        <Dealer name={dealer.name}/>
      </div>

      <div className="ai-slot">
        <Player name={ai_2.name} />
        <Player name={ai_1.name} />
      </div>
      <div className="player-slot">
        <Player name={player.name} />
      </div>
    </div>
  )

}

GameTable.propTypes = {
  deck: PropTypes.array,
  players: PropTypes.array,
  round: PropTypes.number
}

export default GameTable
