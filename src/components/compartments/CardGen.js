
const testyModule = {

  getValue: ( face ) => {
    if( face === 'A' ) return 11
    else if(face === 'J' || face === 'Q' || face === 'K') return 10
    else return parseInt( face )
  },

  shuffle: ( passByReference ) => {
    passByReference.deck = passByReference.deck || []

    var j, x, i
    for (i = passByReference.deck.length; i; i--) {
      j = Math.floor(Math.random() * i)
      x = passByReference.deck[i - 1]
      passByReference.deck[i - 1] = passByReference.deck[j]
      passByReference.deck[j]= x
    }
  },

  createCards: ( deckQuantity ) => {
    let decks = []
    for (var q = 0; q < deckQuantity; q++) {
      const cards = []
      const faces = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
      const suits = ['Spade','Diamond','Club','Heart']

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
          let item = { face: faces[j], suit: suits[i], value: testyModule.getValue(faces[j]), faceDown: false }
          item.isAce = ( item.value == 11 ) ? true : false
          cards.push(item)
        }
      }

      let passByReference = {deck: cards}
      testyModule.shuffle(passByReference)
      decks.push(cards)
    }

    let merged = [].concat.apply([], decks)
    return merged

  }

}

export default testyModule
