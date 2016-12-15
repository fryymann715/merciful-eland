import React, { Component } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'

export default class App extends Component {

  constructor( props ) {
    super( props )
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
    this.dealAce = this.dealAce.bind( this )
    this.hitItPlayer = this.hitItPlayer.bind( this )
    this.newRound = this.newRound.bind( this )
    this.placeBet = this.placeBet.bind( this )
    this.setupGame = this.setupGame.bind( this )
    this.showDealerCard = this.showDealerCard.bind( this )
    this.testDeal = this.testDeal.bind( this )
    this.handValue = this.handValue.bind( this )
  }

  componentDidMount() {
    this.setupGame()
    //this.doRound()
  }


  createCards( deckQuantity ) {
    let decks = []
    for (var q = 0; q < deckQuantity; q++) {
      const cards = []
      const faces = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
      const suits = ['Spade','Diamond','Club','Heart']

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
          let item = { face: faces[j], suit: suits[i], value: this.getValue(faces[j]), faceDown: false }
          item.isAce = ( item.value == 11 ) ? true : false
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

  createPlayers() {
    const dealerName = 'Jeff Goldblum'
    const aiNames = [ 'Bob Ross', 'Pamela Anderson' ]
    const playerName = prompt( 'What is your name?' )
    const round = 0

    const dealer = {
      name: dealerName,
      hand: [],
      role: 'dealer'
    }
    dealer.hand.value = 0
    dealer.hand.bet = 0

    const ai_1 = { name: aiNames[0], bank: 100, hand: [], role: 'ai' }
    ai_1.hand.value = 0
    ai_1.hand.bet = 0
    const ai_2 = { name: aiNames[1], bank: 100, hand: [], role: 'ai' }
    ai_2.hand.value = 0
    ai_2.hand.bet = 0

    const player = {
      name: playerName,
      bank: 100,
      hand: [],
      role: 'player'
    }
    player.hand.value = 0
    player.hand.bet = 0
    this.setState({ dealer, ai_1, ai_2, player, round })
  }

//NOTE: Dev function
  dealAce() {

    let { player, deck } = this.state

    for ( let i=0; i < deck.length; i++ ){
      if ( deck[i].value == 11 ){
        player.hand.push( deck[i] )
        break
      }
    }
    player.hand.value = this.handValue( player.hand )
    this.setState({ player })
  }

  doRound() {
    // let { turn } = this.state
    if( this.state.turn < 1 ){ this.testDeal() }

    else if( this.state.turn == 1 ) {
      this.placeBet()
    }

  }

  getValue( face ) {
    if( face === 'A' ) return 11
    else if(face === 'J' || face === 'Q' || face === 'K') return 10
    else return parseInt( face )
  }

  handValue( hand ) {

    if ( hand.length <= 0 ){ return 0 }

    let value = 0
    let hasAce = false

    hand.map( card => {

      if( card.isAce === true ){
        hasAce = true
      }
      value += card.value
    })

    if ( value > 21 && hasAce ) { value -= 10 }
    return value
}

  gameLoop( playerTurn, t ) {
    let turn = t
    if( playerTurn !== 'player' ) {
      do {
        if( handValue( playerTurn.value <= 17 ) ) hitItPlayer(playerTurn)
        else t++
      } while ( turn === t )
    } else {
      // Wait for player to click a button
    }
    return turn
  }

  gameLoop( playerTurn, t ) {
    let turn = t
    if( playerTurn !== 'player' ) {
      do {
        if( handValue( playerTurn.value <= 17 ) ) hitItPlayer(playerTurn)
        else t++
      } while ( turn === t )
    } else {
      // Wait for player to click a button
    }
    return turn
  }

  testDeal() {
    let { ai_1, ai_2, dealer, deck, player, round, turn } = this.state

    if ( round < 1 ) {
      for ( let cycle = 0; cycle<2; cycle++ ) {
        ai_1.hand.push( deck.shift() )
        player.hand.push( deck.shift() )
        ai_2.hand.push( deck.shift() )
        dealer.hand.push( deck.shift() )
        if (cycle === 0) { dealer.hand[0].faceDown = true}
      }
      round = 1
      turn = 1
      // Done with initialization, begin turns

      // Turn 1 = ai_1
      turn = gameLoop( 'ai_1', turn )

      // NOTE: We won't be moving on to turn 3 until after a button is clicked.
      // therfore the rest of the functionality for handling turns should go
      // in the playerui functions
      // Turn 2 = player
      // turn = gameLoop( 'player', turn )
      // // Turn 3 = ai_2
      // turn = gameLoop( 'ai_2', turn )
      // // Turn 4 = dealer
      // turn = gameLoop( 'dealer', turn )


    } else {
      return
    }
    console.log(deck.length)
    ai_1.hand.value = this.handValue( ai_1.hand )
    ai_2.hand.value = this.handValue( ai_2.hand )
    player.hand.value = this.handValue( player.hand )
    dealer.hand.value = this.handValue( dealer.hand )
    this.setState({ ai_1, ai_2, dealer, deck, player, round, turn})
  }

  aiTurn( whichAiPlayer ) {
    let holdStats = getLocalStorage('hold')
    let hitStats = getLocalStorage('hitStats')



    if () {
      hitItPlayer( whichAiPlayer )
    } else {
      // skip turn by doing nothing. We're holding.
    }
  }

  getLocalStorage(type) {
    let holdStats = {
      currentlyGathering: true,
      playerHand: player.hand,
      playerValue: this.handValue( player.hand ),
      dealerHand: dealer.hand,
      dealerValue: this.handValue( dealer.hand ),
      hitOrStay: type,
      winOrLose: 'pending'
    }
    let stats = JSON.parse(localStorage.getItem(type) || '[]')
    stats.push( holdStats )
    return stats
  }

  makeChoice(type) {
    // Seek similar hands to what player had
    let stats = JSON.parse(localStorage.getItem(type) || '[]')
    let predictAction = stats.find( (ele) => {
      if(ele.playerValue >= p1ofN*currPlayerValue && ele.playerValue < p2ofN*currPlayerValue) return ele.hitOrStay
    })

    // If unable to find similar circumstance, then guess
    // random and adjust weights
    if( predictAction === undefined) {
      do {
        p1ofN = Math.random()
        p2ofN = Math.random()
      } while (p1ofN > p2ofN)
      // Store random value into database to check against later
      predictAction = Math.random() > 0.5 ? 'hit' : 'stay'
    }
    return predictAction
  }


  holdButton() {
    let { ai_1, ai_2, dealer, player, deck } = this.state

    // START AI Capture K for k-n-n
    localStorage.setItem('hold', JSON.stringify( getLocalStorage('hold') ))
    // END AI
  }

  hitItPlayer( whichPlayer ) {

   let { ai_1, ai_2, dealer, player, deck } = this.state

   // START AI Capture K for k-n-n
   localStorage.setItem('hit', JSON.stringify( getLocalStorage('hit') ))
   // END AI

   console.log('--> Hand with length?', player.hand)
   const temp = {
     "player": player,
     "dealer": dealer,
     "ai_1": ai_1,
     "ai_2": ai_2
   }

   let hand = temp[ whichPlayer ].hand
   if ( hand.bet <= 0 ){ return alert( "You must first place a bet." ) }

   if ( this.handValue( hand ) >= 21 ){ return }

   if ( hand.length < 5 ) {
     hand.push( deck.shift() )
     hand.value = this.handValue( hand )
     temp[whichPlayer].hand = hand
     this.setState({ ai_1, ai_2, dealer, player, deck })

     return
   }
   else { return  }

  }

  newRound() {
    let { ai_1, ai_2, dealer, player, turn, round } = this.state

    player.bank += player.hand.bet * 2

    ai_1.hand = []
    ai_1.hand.value = 0
    ai_1.hand.bet = 0

    ai_2.hand = []
    ai_2.hand.value = 0
    ai_2.hand.bet = 0

    dealer.hand = []
    dealer.hand.value = 0
    dealer.hand.bet = 0

    player.hand = []
    player.hand.value = 0
    player.hand.bet = 0
    turn = 0
    round++
    this.setState({ ai_1, ai_2, dealer, player, turn, round })
  }

  placeBet() {
    let { player } = this.state

    const betAmount = prompt('How much would you like to bet?')
    if ( betAmount > player.bank ) { return alert( "You're too broke, go home." ) }
    else {
      player.hand.bet = parseInt(betAmount)
      player.bank -= betAmount
      this.setState({ player })
    }
    // console.log( "BET", betAmount )

// rebase code below
    // let value = 0
    // hand.map( card => {
    //   value += card.value
    // })
    // return value
// rebase code ends
  }

  playerStay() {
    let { turn } = this.state
    turn++
    this.setState({ turn })
  }

  setupGame() {
    let decks = (this.state.number_of_decks < 2 ) ? 2 : this.state.number_of_decks
    this.createCards(decks)
    this.createPlayers()
  }

  showDealerCard() {
    let { dealer } = this.state
    dealer.hand[0].faceDown = false
    this.setState({ dealer })
  }

  shuffle( passByReference ) {
    passByReference.deck = passByReference.deck || []

    var j, x, i
    for (i = passByReference.deck.length; i; i--) {
      j = Math.floor(Math.random() * i)
      x = passByReference.deck[i - 1]
      passByReference.deck[i - 1] = passByReference.deck[j]
      passByReference.deck[j]= x
    }
  }

  startGame() {
    this.placeBet()

  }

  testDeal() {
    let { ai_1, ai_2, dealer, deck, player, turn } = this.state

    if ( player.hand.bet <= 0 ){ return alert( "You must first place a bet." ) }

    if ( turn < 1 ) {
      for ( let cycle = 0; cycle<2; cycle++ ) {
        ai_1.hand.push( deck.shift() )
        player.hand.push( deck.shift() )
        ai_2.hand.push( deck.shift() )
        dealer.hand.push( deck.shift() )
        if (cycle === 0) { dealer.hand[0].faceDown = true}
      }
      turn = 1
    } else {
      return
    }
    console.log(deck.length)
    ai_1.hand.value = this.handValue( ai_1.hand )
    ai_2.hand.value = this.handValue( ai_2.hand )
    player.hand.value = this.handValue( player.hand )
    dealer.hand.value = this.handValue( dealer.hand )
    this.setState({ ai_1, ai_2, dealer, deck, player, turn })
  }

  render() {

    const { ai_1, ai_2, dealer, deck, player, round } = this.state

    return (
        <div className="app">
          <GameTable ai_1={ai_1} ai_2={ai_2} dealer={dealer} deck={deck} player={player} round={round} />
          <PlayerUI
            dealAce={ this.dealAce }
            testDeal={ this.testDeal }
            reset={ this.newRound }
            showCard={ this.showDealerCard }
            hitItPlayer={ this.hitItPlayer }
            placeBet={ this.placeBet }
            playerBank={ player.bank}
            playerHandValue={ player.hand.value }
          />
        </div>
      )
  }
}
