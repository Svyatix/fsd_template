import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { StoreProvider } from '@app/providers/StoreProvider'
import { HomePage } from '@pages/home'
import { AboutPage } from '@pages/about'

// Self-contained app for local dev or standalone embedding.
// Optional `basename` helps mount under a subpath in host if needed.
export type MicroAppProps = { basename?: string }

const Shell: React.FC = () => {
  return (
    <div className="app">
      <nav className="card" style={{display:'flex', gap: 12}}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

const MicroApp: React.FC<MicroAppProps> = ({ basename }) => {
  return (
    <StoreProvider>
      <BrowserRouter basename={basename}>
        <Shell />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default MicroApp