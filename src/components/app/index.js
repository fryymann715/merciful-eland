import React, { Component, PropTypes } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'

export default class App extends Component {

  constructor( props ) {
    super(props)
    this.state = {
      deck: [],
      players: [],
      number_of_decks: -1,
      round: 0,
      turn: 0
    }
  }

  componentDidMount() {
    let decks = (this.state.number_of_decks < 2 ) ? 2 : this.state.number_of_decks
    this.createCards(decks)
  }

  createCards(deckQuantity) {
    let decks = []
    for (var q = 0; q < deckQuantity; q++) {
      const cards = []
      const faces = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
      const suits = ['Spade','Diamond','Club','Heart']

      for (var i = 0; i < 4; i++) {

        for (var j = 0; j < 13; j++) {

          let item = { face: faces[j], suit: suits[i], value: this.getValue(faces[j]), faceDown: false }

          item.isAce = ( item.value == 255 ) ? true : false
          // if( item.value == 255 ) item.isAce = true
          // else item.isAce = null
          cards.push(item)
        }
      }

      let passByReference = {deck: cards}
      this.shuffle(passByReference)
      decks.push(cards)
    }

    let merged = [].concat.apply([], decks)
    console.log("MERGED", merged);
    this.setState({ deck: merged })
  }

  shuffle(passByReference) {
    passByReference.deck = passByReference.deck || []

    var j, x, i
    for (i = passByReference.deck.length; i; i--) {
      j = Math.floor(Math.random() * i)
      x = passByReference.deck[i - 1]
      passByReference.deck[i - 1] = passByReference.deck[j]
      passByReference.deck[j]= x
    }
  }


  getValue(face) {
    if(face === 'A') return 255
    else if(face === 'J' || face === 'Q' || face === 'K') return 10
    else return parseInt(face)
  }

  render() {
    return (
        <div className="app">
          <h2>APP</h2>
          <GameTable />
          <PlayerUI />
        </div>
      )
  }
}
