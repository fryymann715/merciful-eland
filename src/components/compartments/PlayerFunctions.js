
const PlayerFunctions = {

  placeBet() {
    let { player } = this.state

    const betAmount = prompt('How much would you like to bet?')
    if ( betAmount > player.bank ) { return alert( "You're too broke, go home." ) }
    else {
      player.hand.bet = parseInt(betAmount)
      player.bank -= betAmount
      this.setState({ player })
    }
  }
}

export default PlayerFunctions
