import React, { PropTypes } from 'react'

const MessageZone = ({ message }) => {
  return (
  <div className="mainMessage">
    <h2>{message}</h2>
  </div>
    )
}

MessageZone.propTypes = {
  message: PropTypes.string
}

export default MessageZone
