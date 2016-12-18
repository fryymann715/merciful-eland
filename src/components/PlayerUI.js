import React, { PropTypes } from 'react'

const PlayerUI = ({ betString,
                    dealAce,
                    doHit,
                    holdButton,
                    onChange,
                    placeBet,
                    player,
                    reset,
                    showCard,
                    turn,
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

const empty = <span className="displayNone"></span>

  const dealButton = (turn < 1) ? <button onClick={ handleDeal } >Deal</button> : empty
  const resetButton = ( turn > 4 ) ? <button onClick={ handleReset } >RESET</button> : empty
  const hitButton = (player.hand.value < 21 && turn === 2) ? <button onClick={ handleHit } >Hit</button> : empty
  const playerHold = (turn === 2) ? <button onClick={ handleHold } >Hold</button> : empty

  const betBox = ( turn < 1 )
    ? (<div className="bet container">
          <input onKeyDown={onSendBet} onChange={onChange} value={betString} ></input>
          <button onClick={ handleBet }>Bet</button>
        </div>)
    : empty

  return (
    <div className="player-ui">
      <div className="status container">
        <div><span>Funds: ${ player.bank }</span></div>
        <div><span>Hand Value: { player.hand.value }</span></div>

      </div>
      <div className="controls container">
        {dealButton}
        {playerHold}
        {resetButton}
        {hitButton}

        {betBox}

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
  reset: PropTypes.func,
  showCard: PropTypes.func,
  turn: PropTypes.number
}

export default PlayerUI
