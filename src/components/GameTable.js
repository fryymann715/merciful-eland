import React, { PropTypes } from 'react'
import Player from './Player'
import Dealer from './Dealer'

const GameTable = ({ deck, players, round }) => {

  let dealer

  if ( round === 0 ) {
    players.map( player => {
      if ( player.role === 'dealer' ){ dealer = { name: player.name } }
    })
  }

  console.log(dealer)
  // const dealerName = dealer.name
  // console.log(dealerName)

  return (
    <div className="table">

      <div className="dealer-slot">
        {/* <Dealer name={dealer.name}/> */}
        <Dealer />
      </div>

      <div className="ai-slot">
        <Player />
        <Player />
      </div>
      <div className="player-slot">
        <Player />
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
