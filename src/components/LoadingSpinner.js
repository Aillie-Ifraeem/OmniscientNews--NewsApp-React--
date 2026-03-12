import React, { Component } from 'react'
import loading from './dual_spinner_fast.gif'
export class LoadingSpinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <img src={loading} alt="loading..." />
      </div>
    )
  }
}

export default LoadingSpinner
