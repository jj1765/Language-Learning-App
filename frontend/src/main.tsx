import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { DeckProvider } from "./context/DeckContext";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeckProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </DeckProvider>
  </StrictMode>,
)
