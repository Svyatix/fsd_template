import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { AboutPage } from '@pages/about'

// ⚠️ This component expects to be rendered inside a host's Router.
// It renders our internal routes on a nested path (e.g., /mf/*).
const MicroRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default MicroRoutes