import React, { PropTypes } from 'react'

const PlayerUI = ({ testDeal, reset }) => {

  const handleDeal = () => {
    testDeal()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="player-ui">
      <button onClick={ handleDeal } >Deal</button>
      <button onClick={ handleReset } >RESET</button>
    </div>
  )
}

PlayerUI.propTypes = {
  testDeal: PropTypes.func,
  reset: PropTypes.func
}

export default PlayerUI
