const obj = {
  createPlayers: () => {
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
    return { dealer, ai_1, ai_2, player, round } 
  }
}

export default obj
