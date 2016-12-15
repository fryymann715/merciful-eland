import React, { PropTypes } from 'react'

const PlayerUI = ({ hitItPlayer, playerBank, playerHandValue, reset, showCard, testDeal }) => {

  const handleDeal = () => {
    testDeal()
  }

  const handleReset = () => {
    reset()
  }

  const handleShowCard = () => {
    showCard()
  }

  const handleHit = () => {
    hitItPlayer("player")
  }

  const handleHitDealer = () => {
    hitItPlayer("dealer")
  }

  return (
    <div className="player-ui">
      <div className="status container">
        <div><span>Funds: ${playerBank}</span></div>
        <div><span>Hand Value: {playerHandValue}</span></div>

      </div>
      <div className="controls container">
        <button onClick={ handleDeal } >Deal</button>
        <button onClick={ handleReset } >RESET</button>
        <button onClick={ handleShowCard } >show dealer</button>
        <button onClick={ handleHit } >Hit</button>
        <button onClick={ handleHitDealer }>Hit Dealer</button>
      </div>
    </div>
  )
}

PlayerUI.propTypes = {
  hitItPlayer: PropTypes.func,
  playerBank: PropTypes.number,
  playerHandValue: PropTypes.number,
  reset: PropTypes.func,
  showCard: PropTypes.func,
  testDeal: PropTypes.func,
}

export default PlayerUI
