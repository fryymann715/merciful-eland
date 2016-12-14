import React, { Component } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'

export default class App extends Component {

  constructor( props ) {
    super(props)
    this.state = {
      ai_1: {},
      ai_2: {},
      dealer: {},
      deck: [],
      number_of_decks: 2,
      player: {},
      round: 0,
      turn: 0
    }
  }

  componentDidMount() {
    let decks = (this.state.number_of_decks < 2 ) ? 2 : this.state.number_of_decks
    this.createCards(decks)
    this.createPlayers()
  }

  createPlayers() {
    const dealerName = 'Jeff Goldblum'
    const aiNames = [ 'Bob Ross', 'Pamela Anderson' ]
    const playerName = 'Player'

    const dealer = {
      name: dealerName,
      hand: [],
      role: 'dealer'
    }

    const ai_1 = { name: aiNames[0], bank: 100, hand: [], role: 'ai' }
    const ai_2 = { name: aiNames[1], bank: 100, hand: [], role: 'ai' }

    const player = {
      name: playerName,
      bank: 100,
      hand: [],
      role: 'player'
    }
    this.setState({ dealer, ai_1, ai_2, player })
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
          cards.push(item)
        }
      }

      let passByReference = {deck: cards}
      this.shuffle(passByReference)
      decks.push(cards)
    }

    let merged = [].concat.apply([], decks)
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

    const { ai_1, ai_2, dealer, deck, player, round } = this.state

    return (
        <div className="app">
          <h2>APP</h2>
          <GameTable ai_1={ai_1} ai_2={ai_2} dealer={dealer} deck={deck} player={player} round={round} />
          <PlayerUI />
        </div>
      )
  }
}
