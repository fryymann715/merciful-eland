import React from 'react'
import Card from './Card'

const Hand = () => {

  return (
    <div className="hand">
      <Card face={"5"} suit={"Spade"} faceDown={true}/>
      <Card face={"K"} suit={"Club"}/>
    </div>
  )
}

export default Hand
