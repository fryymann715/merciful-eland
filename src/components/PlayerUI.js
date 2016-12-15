import React, { PropTypes } from 'react'

const PlayerUI = ({ hitItPlayer, playerBank, reset, showCard, testDeal }) => {

  const handleDeal = () => {
    testDeal()
  }

  const handleReset = () => {
    reset()
  }

  const handleShowCard = () => {
    showCard()
  }

  return (
    <div className="player-ui">
      <span className="player-bank"><h3>{playerBank}</h3></span>
      <button onClick={ handleDeal } >Deal</button>
      <button onClick={ handleReset } >RESET</button>
      <button onClick={ handleShowCard } >show dealer</button>
      <button onClick={ hitItPlayer } >Hit</button>
    </div>
  )
}

PlayerUI.propTypes = {
  hitItPlayer: PropTypes.func,
  playerBank: PropTypes.number,
  reset: PropTypes.func,
  showCard: PropTypes.func,
  testDeal: PropTypes.func,
}

export default PlayerUI
