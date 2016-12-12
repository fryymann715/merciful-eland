import React, { PropTypes } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'

let createCards = () => {
  cards = []
  const faces = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
  const suits = ["Spade","Diamond","Club","Heart"]

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 13; j++) {
      let item = { face: faces[j], suit: suits[i], value: getValue(faces[j]) }
      if( item.value == 255 ) item.isHighAce = true
      else item.isHighAce = null
      cards.push(item)
    }
  }

  let passByReference = {deck: cards}
  shuffle(passByReference)
}

let shuffle = (passByReference) => {
  passByReference.deck = passByReference.deck || []

  var j, x, i
  for (i = passByReference.deck.length; i; i--) {
    j = Math.floor(Math.random() * i)
    x = passByReference.deck[i - 1]
    passByReference.deck[i - 1] = passByReference.deck[j]
    passByReference.deck[j]= x
  }
}

let getValue = (face) => {
  if(face === "A") return 255
  else if(face === "J" || face === "Q" || face === "K") return 10
  else return parseInt(face)
}

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
