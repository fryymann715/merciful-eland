
const PlayerFunctions = {

  //NOTE: Dev function

  dealAce: () => {
    let { player, deck } = this.state
    for ( let i=0; i < deck.length; i++ ){
      if ( deck[i].value == 11 ){
        player.hand.push( deck[i] )
        break
      }
    }
    player.hand.value = this.handValue( player.hand )
    this.setState({ player })
  },

  handValue: ( hand ) => {

    //NOTE: Add ability to take multiple aces into account.
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
  },

  hitItPlayer: ({ deck, hand }) => {

    if ( hand.length < 5 ) {
      hand.push( deck.shift() )
      hand.value = PlayerFunctions.handValue( hand )
      if( hand.value > 21 ) hand.busted = true
      return { deck, hand }
    }
    else { return }

 },

  playerBet: ( player, betString ) => {

    let betAmount = parseInt( betString )
    if ( betAmount > player.bank ) { return alert( "You're too broke, go home." ) }
    if ( isNaN( betAmount ) ){ return alert("Numbers please...") }
    else {
      const betRounded = Math.round(betAmount)
      player.hand.bet = parseInt(betRounded)
      player.bank -= betRounded

      return player
    }
  },

  showDealerCard: () => {
    let { dealer } = this.state
    dealer.hand[0].faceDown = false
    this.setState({ dealer })
  }

}

export default PlayerFunctions
