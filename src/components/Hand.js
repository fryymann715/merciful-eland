import React, { Component } from 'react'
import Card from './Card'

class Hand extends Component {
  constructor( props ) {
    super( props )
  }

  // FIXME: value does not minus 10 if hand has an ace.
  getValue() {
    const { handArray } = this.props

    if ( handArray ){
      let count = 0
      let hasAce = false
      handArray.map( card => {
        // hasAce = (card.value == 11)
        count += card.value
      } )
      if ( count > 21 && hasAce ){ return count - 10 }
      else {return count}
    }
  }

  render() {
    const { handArray } = this.props
    const cards =  handArray ? handArray.map( ( card, key ) => {
    return <Card key={key} face={card.face} suit={card.suit} faceDown={card.faceDown} />}) : []

    return (
      <div className="hand">
        { cards }
        <div>
          { this.getValue() }
        </div>
      </div>
    )
  }

}

export default Hand
