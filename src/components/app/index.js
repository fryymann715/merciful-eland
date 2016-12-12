import React, { PropTypes } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'

const App = () => {

    return (
        <div className="app">
          <h2>APP</h2>
          <GameTable />
          <PlayerUI />
        </div>
      )

}


export default App
