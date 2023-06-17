import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    notification.length > 1 &&
        <div className={ notification[0]}>
          { notification[0] === 'error' ?
            notification[1].error :
            notification[1] }
        </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.array.isRequired
}

export default Notification
