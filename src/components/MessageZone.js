import React, { PropTypes } from 'react'

const MessageZone = ({ message }) => {

  const messageElements = message.map( ( blip, key ) => {
    return <div key={key}>{blip}</div>
  })

  return (
  <div className="mainMessage">
    {messageElements}
  </div>
    )
}

MessageZone.propTypes = {
  message: PropTypes.array
}

export default MessageZone
