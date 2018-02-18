import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { registerLanguage } from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'

registerLanguage('jsx', jsx)

ReactDOM.render(<App />, document.getElementById('demo'))
registerServiceWorker()
