import React, { Component } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'
// import { CardGenerator, PlayerSetup } from '../compartments/index'
import PlayerSetup from '../compartments/PlayerSetup'
import CardGenerator from '../compartments/CardGenerator'
import PlayerFunctions from '../compartments/PlayerFunctions'



// import PlayerFunctions

export default class App extends Component {

  constructor( props ) {
    super( props )
    this.p1ofN = 0.14
    this.p2ofN = 0.74

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
    this.placeBet = PlayerFunctions.placeBet.bind( this )
    this.setupGame = this.setupGame.bind( this )
    this.showDealerCard = this.showDealerCard.bind( this )
    this.testDeal = this.testDeal.bind( this )
    this.handValue = this.handValue.bind( this )
  }

  componentDidMount() {
    this.setupGame()
    //this.doRound()
  }
//-------------------------------------
  aiTurn( whichAiPlayer ) {
    choiceHit = makeChoice('hit')
    choiceHold = makeChoice('hold')

    if( choiceHit === 'hit' || choiceHold === 'hit' ) hitItPlayer( whichAiPlayer )
    else if( choiceHit === 'hold' || choiceHold === 'hold' ) holdButton( whichAiPlayer )
    else throw new Error("Message CM27:The subscriber you are trying to reach is unavailable or outside the calling area.")
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

  getLocalStorage(type) {
    let { ai_1, ai_2, dealer, player, deck } = this.state

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

  hitItPlayer( whichPlayer ) {

   let { ai_1, ai_2, dealer, player, deck } = this.state

   // START AI Capture K for k-n-n
   if( whichPlayer === 'player') {
     localStorage.setItem('hit', JSON.stringify( this.getLocalStorage('hit') ))
   }
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

  holdButton( whichPlayer ) {
    let { ai_1, ai_2, dealer, player, deck } = this.state

    // START AI Capture K for k-n-n
    if( whichPlayer === 'player') {
      localStorage.setItem('hold', JSON.stringify( this.getLocalStorage('hold') ))
    }
    // END AI
  }

  getLocalStorage(type) {
    let { ai_1, ai_2, dealer, player, deck } = this.state

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
      if(ele.playerValue >= this.p1ofN*currPlayerValue && ele.playerValue < this.p2ofN*currPlayerValue) return ele.hitOrStay
    })

    // If unable to find similar circumstance, then guess
    // random and adjust weights
    if( predictAction === undefined) {
      do {
        this.p1ofN = Math.random()
        this.p2ofN = Math.random()
      } while (this.p1ofN > this.p2ofN)
      // Store random value into database to check against later
      predictAction = Math.random() > 0.5 ? 'hit' : 'stay'
    }
    return predictAction
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

  playerStay() {
    let { turn } = this.state
    turn++
    this.setState({ turn })
  }

  setupGame() {

    let decks = (this.state.number_of_decks < 2 ) ? 2 : this.state.number_of_decks

    const deck = CardGenerator.createCards( decks )
    const { dealer, ai_1, ai_2, player, round } = PlayerSetup.createPlayers()

    this.setState({ ai_1, ai_2, dealer, deck, player, round })
  }

  showDealerCard() {
    let { dealer } = this.state
    dealer.hand[0].faceDown = false
    this.setState({ dealer })
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
