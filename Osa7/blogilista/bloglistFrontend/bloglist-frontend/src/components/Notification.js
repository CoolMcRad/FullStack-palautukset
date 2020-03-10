import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification =  ()  => {
    const notification = useSelector(state => state.notification)
    if (notification === null) {
      return null
    }
    const errorStyle = {
      color: 'black',
      background: `lightgrey`,
      fontSize: 40,
      borderStyle: `solid`,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10
    }
  
    return (
      <div className="error">
        {(notification &&
    <Alert variant="success">
      {notification}
    </Alert>
  )}
      </div>
    )
  }

  export default Notification