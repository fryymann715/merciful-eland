import React, { Component } from 'react'
import GameTable from '../GameTable'
import PlayerUI from '../PlayerUI'
import * as types from '../../resources'
import { CardGenerator, PlayerSetup, PlayerFunctions } from '../compartments/index'

export default class App extends Component {
  constructor( props ) {
    super( props )
    this.p1ofN = 0.14
    this.p2ofN = 0.74

    this.state = {
      ai_1: {},
      ai_2: {},
      betString: '',
      dealer: {},
      deck: [],
      number_of_decks: 2,
      player: {},
      round: 0,
      turn: 0
    }
    this.dealAce = PlayerFunctions.dealAce.bind( this )
    this.handValue = PlayerFunctions.handValue.bind( this )
    this.doHit = this.doHit.bind( this )
    this.makeBet = this.makeBet.bind( this )
    this.newRound = this.newRound.bind( this )
    this.onChange = this.onChange.bind( this )
    this.playerBet = PlayerFunctions.playerBet.bind( this )
    this.setupGame = this.setupGame.bind( this )
    this.showDealerCard = PlayerFunctions.showDealerCard.bind( this )
    this.deal = this.deal.bind( this )
    this.holdButton = this.holdButton.bind( this )
  }

  componentDidMount() {
    this.setupGame()
  }

  aiTurn( whichAiPlayer ) {
    choiceHit = makeChoice('hit')
    choiceHold = makeChoice('hold')

    if( choiceHit === 'hit' || choiceHold === 'hit' ) hitItPlayer( whichAiPlayer )
    else if( choiceHit === 'hold' || choiceHold === 'hold' ) holdButton( whichAiPlayer )
    else throw new Error("Message CM27:The subscriber you are trying to reach is unavailable or outside the calling area.")
  }

  doHit( whichPlayer ) {
    let { ai_1, ai_2, dealer, player, deck, turn } = this.state

    if( whichPlayer === 'player') {
     localStorage.setItem('hit', JSON.stringify( this.getLocalStorage('hit') ))
    }
    const temp = {
    "player": player,
    "dealer": dealer,
    "ai_1": ai_1,
    "ai_2": ai_2
    }
    let hand = temp[ whichPlayer ].hand
    if ( hand.bet <= 0 && whichPlayer !== 'dealer' ){ return alert( "You must first place a bet." ) }
    if ( PlayerFunctions.handValue( hand ) >= 21 ){ return }
    let result = PlayerFunctions.hitItPlayer({ deck, hand })
    temp[ whichPlayer ].hand = result.hand

    let handStatus = this.checkHandStatus( result.hand )
    console.log("Hand Status", handStatus )
    debugger
    if( handStatus === types.BUST || handStatus === types.TWENTY_1 ) {
      this.endTurn()
    }

    this.setState({ ai_1, ai_2, dealer, player, deck: result.deck })
  }

  doRound() {
    // let { turn } = this.state
    if( this.state.turn < 1 ){ this.deal() }

    else if( this.state.turn == 1 ) {
      this.placeBet()
    }

  }

  checkHandStatus( hand ) {
    if ( hand.value === 21 ){ return types.TWENTY_1 }
    else if ( hand.value > 21 ){ return types.BUST }
    else { return types.NORM }
  }

  gameLoop( playerTurn, t ) {
    let turn = t

    const { ai_1, ai_2, dealer, player } = this.state
    const players = {
      "player": player,
      "dealer": dealer,
      "ai_1": ai_1,
      "ai_2": ai_2
    }
    let playerUp = players[ playerTurn ]

    if( playerTurn === 'dealer' ) {
      if( PlayerFunctions.handValue( playerUp.hand ) <= 17 ) {
        this.doHit(playerTurn)
      }
    }
    else if( playerTurn !== 'player' ) {
      do {
        if ( playerUp.hand.bet === 0 ){ this.makeBet( 20, playerUp ) }
        if( PlayerFunctions.handValue( playerUp.hand ) <= 17 ) {
          this.doHit(playerTurn)
        }
        else t++
      } while ( turn === t )
    } else {
      // Wait for player to click a button
    }
    this.setState({turn:t})
  }

  getLocalStorage(type) {
    let { ai_1, ai_2, dealer, player, deck } = this.state

    let holdStats = {
      currentlyGathering: true,
      playerHand: player.hand,
      playerValue: PlayerFunctions.handValue( player.hand ),
      dealerHand: dealer.hand,
      dealerValue: PlayerFunctions.handValue( dealer.hand ),
      hitOrStay: type,
      winOrLose: 'pending'
    }
    let stats = JSON.parse(localStorage.getItem(type) || '[]')
    stats.push( holdStats )
    return stats
  }

//NOTE: Mulitple holdButton
  // holdButton( whichPlayer ) {
  //   let { ai_1, ai_2, dealer, player, deck } = this.state
  //
  //   // START AI Capture K for k-n-n
  //   if( whichPlayer === 'player') {
  //     localStorage.setItem('hold', JSON.stringify( this.getLocalStorage('hold') ))
  //   }
  //   // END AI
  // }

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

//NOTE: Multiple holdButton
  endTurn() {
    let { turn } = this.state
    // TODO: disable player UI
    turn++

    if( turn > 2) {// Do AI stuff}
      this.gameLoop( 'ai_2', turn )
      this.gameLoop( 'dealer', turn )
      this.settleRound()
    }

    this.setState({ turn })
  }

  holdButton() {
    this.endTurn()
  }

  makeBet( amount = 'none', playerUp = 'none' ) {
    let betString = ( amount === 'none' ) ? this.state.betString : amount
    let playa = ( playerUp === 'none' ) ? this.state.player : playerUp
    let updatedPlayer = PlayerFunctions.playerBet( playa, betString )
    this.setState({ updatedPlayer, betString: '' })
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

    ai_1.hand = []
    ai_1.hand.value = 0
    ai_1.hand.bet = 0

    ai_2.hand = []
    ai_2.hand.value = 0
    ai_2.hand.bet = 0

    let betString = ''

    dealer.hand = []
    dealer.hand.value = 0
    dealer.hand.bet = 0

    player.hand = []
    player.hand.value = 0
    player.hand.bet = 0
    turn = 0
    round++
    this.setState({ ai_1, ai_2, betString, dealer, player, turn, round })
  }

  onChange( event ) {
    this.setState({ betString: event.target.value })
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

  settleRound() {
    let { dealer, player, ai_1, ai_2 } = this.state
    const list = [ai_1, player, ai_2]
    for (var i = 0; i < 3; i++) {
      let selectedHand = list[i].hand

      // TODO: name result something better
      let result = this.checkHandStatus( selectedHand )

      // LOSE CONDITIONS:
      if( result === types.BUST || selectedHand.value < dealer.hand.value ) {
        console.log("Player ", list[i].name, " eats vast quantities of 💩.")
        // Player banks left alone

      // WIN CONDITIONS:
      } else if ( dealer.hand.value > 21
      || (result === types.TWENTY_1 || selectedHand.value > dealer.hand.value )
      && dealer.hand.value !== selectedHand.value) {

        console.log("Player ", list[i].name, " WON!!!")
        list[i].bank += selectedHand.bet * 2

      // PUSH CONDITIONS:
      } else {
        console.log(list[i].name + " pushed...like a chump...")
        list[i].bank += selectedHand.bet
      }
      // END OF CONDITION CHECKING

    }
  }

  deal() {
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
    ai_1.hand.value = PlayerFunctions.handValue( ai_1.hand )
    ai_2.hand.value = PlayerFunctions.handValue( ai_2.hand )
    player.hand.value = PlayerFunctions.handValue( player.hand )
    dealer.hand.value = PlayerFunctions.handValue( dealer.hand )

    this.setState({ ai_1, ai_2, dealer, deck, player, turn })

    // Disable player UI while player 1 is going

    // Turn 1 = ai_1
    this.gameLoop( 'ai_1', turn )

    // Enable player controls


  }

  render() {

    const { ai_1, ai_2, dealer, deck, player, round, turn } = this.state

    return (
        <div className="app">
          <GameTable ai_1={ai_1} ai_2={ai_2} dealer={dealer} deck={deck} player={player} round={round} />
          <PlayerUI
            betString={this.state.betString}
            deal={ this.deal }
            dealAce={ this.dealAce }
            doHit={ this.doHit }
            holdButton={ this.holdButton }
            turn={ turn }
            onChange={ this.onChange }
            placeBet={ this.makeBet }
            player={ player }
            playerBank={ player.bank}
            playerHandValue={ player.hand.value }
            reset={ this.newRound }
            showCard={ this.showDealerCard }
          />
        </div>
      )
  }
}
