// // ============================================================
// // src/components/Navbar.jsx
// // ============================================================
// import { useState, useEffect } from 'react'
// import { NavLink, useLocation } from 'react-router-dom'
// import { Smartphone, Menu, X } from 'lucide-react'
// import styles from './Navbar.module.css'

// const LINKS = [
//   { to: '/',            label: 'Home'       },
//   { to: '/submit',      label: 'Book Repair' },
//   { to: '/track',       label: 'Track Status'},
//   { to: '/accessories', label: 'Accessories' },
// ]

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const location = useLocation()

//   // Close mobile menu on route change
//   useEffect(() => setMenuOpen(false), [location])

//   // Add shadow when scrolled
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12)
//     window.addEventListener('scroll', onScroll, { passive: true })
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   return (
//     <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
//       <div className={styles.inner}>

//         {/* Logo */}
//         <NavLink to="/" className={styles.logo}>
//           <span className={styles.logoIcon}>
//             <Smartphone size={17} strokeWidth={2.5} />
//           </span>
//           <span className={styles.logoText}>Fix point</span>
//         </NavLink>

//         {/* Desktop links */}
//         <nav className={styles.links}>
//           {LINKS.map(({ to, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               end={to === '/'}
//               className={({ isActive }) =>
//                 `${styles.link} ${isActive ? styles.active : ''}`
//               }
//             >
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* CTA */}
//         <div className={styles.actions}>
//           <NavLink to="/submit" className="btn btn-primary btn-sm">
//             Book Repair
//           </NavLink>
//           <button
//             className={styles.burger}
//             onClick={() => setMenuOpen(o => !o)}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
//         {LINKS.map(({ to, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             end={to === '/'}
//             className={({ isActive }) =>
//               `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
//             }
//           >
//             {label}
//           </NavLink>
//         ))}
//       </div>
//     </header>
//   )
// }

// ============================================================
// src/components/Navbar.jsx
// ============================================================
import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Smartphone, Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

const LINKS = [
  { to: '/',            label: 'Home'        },
  { to: '/submit',      label: 'Book Repair' },
  { to: '/track',       label: 'Track Status'},
  { to: '/accessories', label: 'Accessories' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location])

  // Add shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Smartphone size={16} strokeWidth={2.5} />
          </span>
          <span className={styles.logoText}>
            {/* Full name on desktop */}
            <span className={styles.logoFull}>Tara Maa Mobile House</span>
            {/* Short name on mobile */}
            <span className={styles.logoShort}>TMMH</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <nav className={styles.links}>
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA + mobile burger */}
        <div className={styles.actions}>
          <NavLink to="/submit" className="btn btn-primary btn-sm">
            Book Repair
          </NavLink>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        {/* Book Repair CTA inside mobile menu */}
        <div style={{ padding: '12px 20px 16px' }}>
          <NavLink
            to="/submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Book Repair
          </NavLink>
        </div>
      </div>
    </header>
  )
}