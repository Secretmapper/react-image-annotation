import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { registerLanguage } from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'

registerLanguage('jsx', jsx)

const container = document.getElementById('demo');
const root = createRoot(container)
root.render(<App />);

registerServiceWorker()
