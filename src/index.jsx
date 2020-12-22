import React from 'react'
import ReactDOM from 'react-dom'

import Default from './layouts/Default.jsx'

ReactDOM.render(
    <React.StrictMode>
        <Default />
    </React.StrictMode>,
    document.getElementById('root')
)

if (import.meta.hot) {
  import.meta.hot.accept()
}