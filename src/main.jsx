import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AboutPage from './AboutPage.jsx'
import LinksPage from './LinksPage.jsx'
import PortfolioPage from './PortfolioPage.jsx'
import PortfolioDetailPage from './PortfolioDetailPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:projectId" element={<PortfolioDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
