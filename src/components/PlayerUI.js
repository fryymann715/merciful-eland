import React, { PropTypes } from 'react'

const PlayerUI = ({ betString,
                    dealAce,
                    doHit,
                    holdButton,
                    onChange,
                    placeBet,
                    player,
                    playerBank,
                    playerHandValue,
                    reset,
                    showCard,
                    deal }) => {

  const handleBet = () => {
    placeBet()
  }

  const handleDeal = () => {
    deal()
  }

  const handleDealAce = () => {
    dealAce()
  }

  const handleHit = () => {
    doHit("player")
  }

  const handleHold = () => {
    holdButton()
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

  const onSendBet = (event) => {
    if ( event.keyCode === 13 ) {
      placeBet()
    }
  }

  const dealAceButton = <button onClick={ handleDealAce }>Deal Ace</button>
  const dealButton = (player.hand.length > 0) ? <span></span> :  <button onClick={ handleDeal } >Deal</button>
  const resetButton = <button onClick={ handleReset } >RESET</button>
  const showCardButton = <button onClick={ handleShowCard } >show dealer</button>
  const hitButton = <button onClick={ handleHit } >Hit</button>
  const playerHold = <button onClick={ handleHold } >Hold</button>

  return (
    <div className="player-ui">
      <div className="status container">
        <div><span>Funds: ${playerBank}</span></div>
        <div><span>Hand Value: {playerHandValue}</span></div>

      </div>
      <div className="controls container">
        {dealAceButton}
        {dealButton}
        {playerHold}
        {resetButton}
        {showCardButton}
        {hitButton}
        <button onClick={ handleHitDealer }>Hit Dealer</button>
        <div className="bet container">
          <input onKeyDown={onSendBet} onChange={onChange} value={betString} ></input>
          <button onClick={ handleBet }>Bet</button>
        </div>
      </div>
    </div>
  )
}

PlayerUI.propTypes = {
  betString: PropTypes.string,
  deal: PropTypes.func,
  dealAce: PropTypes.func,
  doHit: PropTypes.func,
  holdButton: PropTypes.func,
  onchange: PropTypes.func,
  placeBet: PropTypes.func,
  player: PropTypes.object,
  playerBank: PropTypes.number,
  playerHandValue: PropTypes.number,
  reset: PropTypes.func,
  showCard: PropTypes.func
}

export default PlayerUI
