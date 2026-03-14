// ============================================================
// src/App.jsx
// Root component — sets up routing and layout
// ============================================================
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import SubmitRepair from './pages/SubmitRepair.jsx'
import TrackRepair from './pages/TrackRepair.jsx'
import Accessories from './pages/Accessories.jsx'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"            element={<Home />}         />
          <Route path="/submit"      element={<SubmitRepair />} />
          <Route path="/track"       element={<TrackRepair />}  />
          <Route path="/accessories" element={<Accessories />}  />
          <Route path="*"            element={<NotFound />}     />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div style={{ textAlign:'center', padding:'120px 24px' }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:80, fontWeight:800, color:'var(--border)', lineHeight:1 }}>404</div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700, color:'var(--navy)', margin:'16px 0 12px' }}>Page Not Found</h1>
      <p style={{ color:'var(--muted)', marginBottom:28 }}>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  )
}