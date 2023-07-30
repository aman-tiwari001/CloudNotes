import React from 'react'

const Alert = (props) => {
  return (
    <div className={`alert my-1 alert-${props.alert.type} alert-custom`} role="alert">
        <center><b>{props.alert.msg}</b></center>
    </div>
  )
}

export default Alert