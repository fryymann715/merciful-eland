import React from 'react'
import Card from './Card'

const Hand = () => {

  return (
    <div className="hand">
      <Card face={"5"}, suit={"Spade"}/>
      <Card face={"K"}, suit={"Heart"}/>
    </div>
  )
}

export default Hand
