// ============================================================
// src/components/Footer.jsx
// ============================================================
import { Link } from 'react-router-dom'
import { Smartphone, MapPin, Phone, Mail, Clock } from 'lucide-react'
import styles from './Footer.module.css'

const QUICK_LINKS = [
  ['/', 'Home'],
  ['/submit', 'Book a Repair'],
  ['/track', 'Track Repair'],
  ['/accessories', 'Accessories'],
]

const SERVICES = [
  'All types of Mobile Repairing',
  'Xerox / Photocopy',
  'Lamination',
  'Photo Print',
  'Mobile Recharge',
  'Typing & Print',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* ── Brand ── */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>
                <Smartphone size={17} strokeWidth={2.5} />
              </span>
              <span className={styles.logoName}>Tara Maa Mobile House</span>
            </div>
            <p className={styles.tagline}>
              Professional mobile repair services with fast turnaround,
              genuine parts and a 6-month warranty on every job.
            </p>
            <div className={styles.hoursBox}>
              <Clock size={14} className={styles.hoursIcon} />
              <div>
                <p className={styles.hoursDay}>Sunday – Saturday</p>
                <p className={styles.hoursTime}>8:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.list}>
              {QUICK_LINKS.map(([to, lbl]) => (
                <li key={to}>
                  <Link to={to} className={styles.listLink}>{lbl}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.list}>
              {SERVICES.map(s => (
                <li key={s} className={styles.listItem}>{s}</li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={15} />
                <span>Niranjanbati, Hooghly,<br />West Bengal, 712617</span>
              </li>
              <li>
                <Phone size={15} />
                <span>+91 8145882627</span>
              </li>
              <li>
                <Mail size={15} />
                <span>tmmh@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Tara Maa Mobile House. All rights reserved.
          </p>
          <p className={styles.copy} style={{ opacity: .5 }}>
            Niranjanbati, Hooghly, West Bengal
          </p>
        </div>
      </div>
    </footer>
  )
}