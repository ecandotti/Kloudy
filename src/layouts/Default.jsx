import React from 'react'

import Home from '../pages/Home'
import { Bubble } from '../components/dev/Bubble'

class Default extends React.Component {
  render () {
    return (
      <>
        <Bubble />
        <Home />
      </>
    )
  }
}

export default Default
