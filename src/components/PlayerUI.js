import React, { PropTypes } from 'react'

const PlayerUI = ({ dealAce, doHit, placeBet, playerBank, playerHandValue, reset, showCard, testDeal }) => {

  const handleBet = () => {
    placeBet()
  }

  const handleDeal = () => {
    testDeal()
  }

  const handleDealAce = () => {
    dealAce()
  }

  const handleHit = () => {
    doHit("player")
  }

  const handleHitDealer = () => {
    doHit("dealer")
  }

  const handleReset = () => {
    reset()
  }

  const handleShowCard = () => {
    showCard()
  }

  return (
    <div className="player-ui">
      <div className="status container">
        <div><span>Funds: ${playerBank}</span></div>
        <div><span>Hand Value: {playerHandValue}</span></div>

      </div>
      <div className="controls container">
        <button onClick={ handleDealAce }>Deal Ace</button>
        <button onClick={ handleDeal } >Deal</button>
        <button onClick={ handleReset } >RESET</button>
        <button onClick={ handleShowCard } >show dealer</button>
        <button onClick={ handleHit } >Hit</button>
        <button onClick={ handleHitDealer }>Hit Dealer</button>
        <button onClick={ handleBet }>Bet</button>
      </div>
    </div>
  )
}

PlayerUI.propTypes = {
  dealAce: PropTypes.func,
  doHit: PropTypes.func,
  placeBet: PropTypes.func,
  playerBank: PropTypes.number,
  playerHandValue: PropTypes.number,
  reset: PropTypes.func,
  showCard: PropTypes.func,
  testDeal: PropTypes.func,
}

export default PlayerUI
