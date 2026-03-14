// // ============================================================
// // src/pages/Home.jsx  — Fixed version (no broken reveal)
// // ============================================================
// import { Link } from 'react-router-dom'
// import {
//   ArrowRight, CheckCircle, Clock, Shield, Star,
//   Battery, Camera, Volume2, Zap, Wifi, Eye,
//   Search, ChevronRight, Smartphone
// } from 'lucide-react'
// import styles from './Home.module.css'

// const SERVICES = [
//   { icon: <Eye     size={22}/>, label: 'Screen Repair',       desc: 'Cracked displays, dead pixels, unresponsive touch — fixed same day.'   },
//   { icon: <Battery size={22}/>, label: 'Battery Replacement', desc: 'Restore full-day battery life with genuine-spec cells.'                },
//   { icon: <Zap     size={22}/>, label: 'Charging Port',       desc: 'Loose or damaged charging ports cleaned and replaced professionally.'   },
//   { icon: <Wifi    size={22}/>, label: 'Software Fix',        desc: 'Bootloops, factory resets, updates and data recovery handled.'         },
//   { icon: <Camera  size={22}/>, label: 'Camera Repair',       desc: 'Blurry lenses or black camera screens — front and rear sensor service.' },
//   { icon: <Volume2 size={22}/>, label: 'Speaker & Mic',       desc: 'Distorted audio or muted calls fixed with component-level precision.'   },
// ]

// const STEPS = [
//   { n: '01', title: 'Submit Request',  desc: 'Fill in your device details and problem in under 2 minutes.'    },
//   { n: '02', title: 'Drop It Off',     desc: 'Bring your device with your Repair ID — no appointment needed.' },
//   { n: '03', title: 'We Repair',       desc: 'Certified technicians diagnose and fix using quality parts.'    },
//   { n: '04', title: 'Collect Device',  desc: 'Track online, then pick up your fully restored device.'         },
// ]

// const TRUST = [
//   { icon: <Clock size={20}/>,       label: '24 – 48 hr',   sub: 'Average turnaround'  },
//   { icon: <Shield size={20}/>,      label: '6 Months',     sub: 'Parts warranty'       },
//   { icon: <Star size={20}/>,        label: 'Certified',    sub: 'Expert technicians'   },
//   { icon: <CheckCircle size={20}/>, label: '100% Quality', sub: 'OEM-spec components'  },
// ]

// const BRANDS = ['Samsung','iPhone','Xiaomi','Oppo','Vivo','OnePlus','Realme','Nokia']

// export default function Home() {
//   return (
//     <div className={styles.page}>

//       {/* ══════════ HERO ══════════ */}
//       <section className={styles.hero}>
//         <div className={styles.blob1} />
//         <div className={styles.blob2} />

//         <div className={`container ${styles.heroInner}`}>
//           <div className={styles.heroText}>
//             <span className={`badge badge-blue anim-fade-up ${styles.heroBadge}`}>
//               <CheckCircle size={12} /> Professional Mobile Repair
//             </span>

//             <h1 className={`${styles.heroH1} anim-fade-up d2`}>
//               Fast Repair.<br />
//               <span className={styles.heroAccent}>Trusted Service.</span>
//             </h1>

//             <p className={`${styles.heroSub} anim-fade-up d3`}>
//               Submit your repair request online, drop off your device, and track every step — from diagnosis to collection.
//             </p>

//             <div className={`${styles.heroBtns} anim-fade-up d4`}>
//               <Link to="/submit" className="btn btn-primary btn-lg">
//                 Book a Repair <ArrowRight size={18} />
//               </Link>
//               <Link to="/track" className="btn btn-ghost btn-lg">
//                 <Search size={17} /> Track Repair
//               </Link>
//             </div>

//             <div className={`${styles.heroStats} anim-fade-up d5`}>
//               {[['1500+','Repairs done'],['24hr','Avg. turnaround'],['6mo','Warranty']].map(([n,l]) => (
//                 <div key={l} className={styles.heroStat}>
//                   <span className={styles.heroStatNum}>{n}</span>
//                   <span className={styles.heroStatLbl}>{l}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className={`${styles.heroVisual} anim-scale-up d3`}>
//             <StatusCard />
//           </div>
//         </div>
//       </section>

//       {/* ══════════ BRAND BAR ══════════ */}
//       {/* <div className={styles.brandBar}>
//         <div className={styles.brandInner}>
//           <span className={styles.brandLabel}>We repair all major brands</span>
//           <div className={styles.brandList}>
//             {[...BRANDS, ...BRANDS].map((b, i) => (
//               <span key={i} className={styles.brandItem}>{b}</span>
//             ))}
//           </div>
//         </div>
//       </div> */}

//       {/* ══════════ SERVICES ══════════ */}
//       <section className={`section ${styles.servSection}`}>
//         <div className="container">
//           <div className={`${styles.sectionHead} ${styles.centered}`}>
//             <p className={styles.sectionTag}>Our Services</p>
//             <h2 className={styles.sectionTitle}>What We Fix</h2>
//             <p className={styles.sectionSub}>
//               From cracked screens to dead batteries — our certified technicians cover every common repair.
//             </p>
//           </div>

//           <div className={styles.servGrid}>
//             {SERVICES.map((s, i) => (
//               <div
//                 key={s.label}
//                 className={`${styles.servCard} anim-fade-up`}
//                 style={{ animationDelay: `${i * 0.08}s` }}
//               >
//                 <div className={styles.servIcon}>{s.icon}</div>
//                 <h3 className={styles.servTitle}>{s.label}</h3>
//                 <p className={styles.servDesc}>{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ HOW IT WORKS ══════════ */}
//       <section className={`section ${styles.hiwSection}`}>
//         <div className="container">
//           <div className={`${styles.sectionHead} ${styles.centered}`}>
//             <p className={styles.sectionTag}>The Process</p>
//             <h2 className={styles.sectionTitle}>How It Works</h2>
//             <p className={styles.sectionSub}>Four simple steps from booking to collecting your repaired device.</p>
//           </div>

//           <div className={styles.hiwGrid}>
//             {STEPS.map((s, i) => (
//               <div
//                 key={s.n}
//                 className={`${styles.hiwCard} anim-fade-up`}
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               >
//                 <div className={styles.hiwNum}>{s.n}</div>
//                 {i < STEPS.length - 1 && (
//                   <div className={styles.hiwArrow}>
//                     <ChevronRight size={14} />
//                   </div>
//                 )}
//                 <h3 className={styles.hiwTitle}>{s.title}</h3>
//                 <p className={styles.hiwDesc}>{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══════════ WHY CHOOSE US ══════════ */}
//       <section className={`section ${styles.trustSection}`}>
//         <div className="container">
//           <div className={styles.trustGrid}>
//             <div className={`${styles.trustText} anim-fade-up`}>
//               <p className={styles.sectionTag}>Why Tara Maa Mobile House</p>
//               <h2 className={styles.sectionTitle}>Repair You Can Count On</h2>
//               <p className={styles.sectionSub} style={{ marginTop: 12 }}>
//                 We combine technical expertise with genuine parts and transparent communication at every stage of your repair.
//               </p>
//               <Link to="/submit" className="btn btn-primary" style={{ marginTop: 28, display:'inline-flex' }}>
//                 Start a Repair <ArrowRight size={16} />
//               </Link>
//             </div>

//             <div className={styles.trustCards}>
//               {TRUST.map((t, i) => (
//                 <div
//                   key={t.label}
//                   className={`${styles.trustCard} anim-fade-up`}
//                   style={{ animationDelay: `${i * 0.08}s` }}
//                 >
//                   <div className={styles.trustIcon}>{t.icon}</div>
//                   <div>
//                     <div className={styles.trustNum}>{t.label}</div>
//                     <div className={styles.trustSub}>{t.sub}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════ TRACK CTA ══════════ */}
//       <section className={`section-sm ${styles.ctaSection}`}>
//         <div className="container">
//           <div className={`${styles.ctaCard} anim-fade-up`}>
//             <div className={styles.ctaLeft}>
//               <h3 className={styles.ctaTitle}>Already submitted a repair?</h3>
//               <p className={styles.ctaSub}>Enter your Repair ID to instantly check the current status of your device.</p>
//             </div>
//             <Link to="/track" className="btn btn-outline btn-lg">
//               Track Repair <ArrowRight size={17} />
//             </Link>
//           </div>
//         </div>
//       </section>

//     </div>
//   )
// }

// // ── Hero Status Card ──────────────────────────────────────────
// function StatusCard() {
//   return (
//     <div className={styles.statusCard}>
//       <div className={styles.scHeader}>
//         <div className={styles.scDots}>
//           <span style={{ background:'#FF5F57' }} />
//           <span style={{ background:'#FFBD2E' }} />
//           <span style={{ background:'#28CA41' }} />
//         </div>
//         <span className={styles.scTitle}>Repair Status</span>
//       </div>

//       <div className={styles.scRepairId}>
//         <p className={styles.scIdLabel}>Repair ID</p>
//         <p className={styles.scIdVal}>R1773502726861</p>
//         <span className="badge badge-blue" style={{ fontSize:12, width:'fit-content' }}>
//           <span className={styles.pulseDot} /> In Progress
//         </span>
//       </div>

//       <div className={styles.scInfo}>
//         {[['Device','Samsung Galaxy S22'],['Problem','Screen Cracked'],['Updated','2 hours ago']].map(([k,v]) => (
//           <div key={k} className={styles.scRow}>
//             <span className={styles.scKey}>{k}</span>
//             <span className={styles.scVal}>{v}</span>
//           </div>
//         ))}
//       </div>

//       <div className={styles.scTimeline}>
//         {['Received','Checking','Repairing','Completed'].map((s, i) => (
//           <div key={s} className={`${styles.scStep} ${i <= 2 ? styles.scStepDone : ''} ${i === 2 ? styles.scStepActive : ''}`}>
//             <div className={styles.scStepDot}>
//               {i < 2 && <CheckCircle size={11} />}
//               {i === 2 && <span className={styles.spinnerDot} />}
//             </div>
//             <span className={styles.scStepLabel}>{s}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// ============================================================
// src/pages/Home.jsx
// ============================================================
// ============================================================
// src/pages/Home.jsx
// ============================================================
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Clock, Shield, Star,
  Battery, Camera, Volume2, Zap, Wifi, Eye,
  Search, ChevronRight, Smartphone, PrinterIcon,
  Image, Phone, CreditCard, FileText, Layers
} from 'lucide-react'
import styles from './Home.module.css'

// ── Mobile repair services ────────────────────────────────────
const SERVICES = [
  { icon: <Eye     size={22}/>, label: 'Screen Repair',       desc: 'Cracked displays, dead pixels, unresponsive touch — fixed same day.'   },
  { icon: <Battery size={22}/>, label: 'Battery Replacement', desc: 'Restore full-day battery life with genuine-spec cells.'                },
  { icon: <Zap     size={22}/>, label: 'Charging Port',       desc: 'Loose or damaged charging ports cleaned and replaced professionally.'   },
  { icon: <Wifi    size={22}/>, label: 'Software Fix',        desc: 'Bootloops, factory resets, updates and data recovery handled.'         },
  { icon: <Camera  size={22}/>, label: 'Camera Repair',       desc: 'Blurry lenses or black camera screens — front and rear sensor service.' },
  { icon: <Volume2 size={22}/>, label: 'Speaker & Mic',       desc: 'Distorted audio or muted calls fixed with component-level precision.'   },
]

// ── Extra shop services ────────────────────────────────────────
const EXTRA_SERVICES = [
  { emoji: '🖨️', label: 'Xerox / Photocopy', desc: 'Black & white and colour photocopying at affordable rates. Any document size.' },
  { emoji: '✨', label: 'Lamination',          desc: 'Document lamination for certificates, IDs, photos and important papers.'      },
  { emoji: '📸', label: 'Photo Print',         desc: 'Passport size, ID card and custom photo printing — instant service.'          },
  { emoji: '📱', label: 'Mobile Recharge',     desc: 'Recharge any operator — Grameenphone, Robi, Banglalink, Airtel and more.'     },
  { emoji: '📄', label: 'Typing & Print',      desc: 'Document typing, CV, application forms and A4 / A3 printouts.'               },
  { emoji: '🪪', label: 'ID Card Making',      desc: 'Custom ID card design and printing for offices, schools and organisations.'   },
]

const STEPS = [
  { n: '01', title: 'Submit Request',  desc: 'Fill in your device details and problem in under 2 minutes.'    },
  { n: '02', title: 'Drop It Off',     desc: 'Bring your device with your Repair ID — no appointment needed.' },
  { n: '03', title: 'We Repair',       desc: 'Certified technicians diagnose and fix using quality parts.'    },
  { n: '04', title: 'Collect Device',  desc: 'Track online, then pick up your fully restored device.'         },
]

const TRUST = [
  { icon: <Clock size={20}/>,       label: '24 – 48 hr',   sub: 'Average turnaround'  },
  { icon: <Shield size={20}/>,      label: '6 Months',     sub: 'Parts warranty'       },
  { icon: <Star size={20}/>,        label: 'Certified',    sub: 'Expert technicians'   },
  { icon: <CheckCircle size={20}/>, label: '100% Quality', sub: 'OEM-spec components'  },
]

const BRANDS = ['Samsung','iPhone','Xiaomi','Oppo','Vivo','OnePlus','Realme','Nokia']

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ══════════ HERO ══════════ */}
      <section className={styles.hero}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={`badge badge-blue anim-fade-up ${styles.heroBadge}`}>
              <CheckCircle size={12} /> Professional Mobile Repair
            </span>

            <h1 className={`${styles.heroH1} anim-fade-up d2`}>
              Fast Repair.<br />
              <span className={styles.heroAccent}>Trusted Service.</span>
            </h1>

            <p className={`${styles.heroSub} anim-fade-up d3`}>
              Submit your repair request online, drop off your device, and track every step — from diagnosis to collection.
            </p>

            <div className={`${styles.heroBtns} anim-fade-up d4`}>
              <Link to="/submit" className="btn btn-primary btn-lg">
                Book a Repair <ArrowRight size={18} />
              </Link>
              <Link to="/track" className="btn btn-ghost btn-lg">
                <Search size={17} /> Track Repair
              </Link>
            </div>

            <div className={`${styles.heroStats} anim-fade-up d5`}>
              {[['1500+','Repairs done'],['24hr','Avg. turnaround'],['6mo','Warranty']].map(([n,l]) => (
                <div key={l} className={styles.heroStat}>
                  <span className={styles.heroStatNum}>{n}</span>
                  <span className={styles.heroStatLbl}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.heroVisual} anim-scale-up d3`}>
            <StatusCard />
          </div>
        </div>
      </section>

      {/* ══════════ BRAND BAR ══════════ */}
      <div className={styles.brandBar}>
        <div className={styles.brandInner}>
          <span className={styles.brandLabel}>We repair all brands</span>
          <div className={styles.brandList}>
            {/* brandTrack doubles the list for a seamless infinite scroll */}
            <div className={styles.brandTrack}>
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span key={i} className={styles.brandItem}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE REPAIR SERVICES ══════════ */}
      <section className={`section ${styles.servSection}`}>
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.centered}`}>
            <p className={styles.sectionTag}>Mobile Repair Services</p>
            <h2 className={styles.sectionTitle}>What We Fix</h2>
            <p className={styles.sectionSub}>
              From cracked screens to dead batteries — our certified technicians cover every common repair.
            </p>
          </div>

          <div className={styles.servGrid}>
            {SERVICES.map((s, i) => (
              <div
                key={s.label}
                className={`${styles.servCard} anim-fade-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={styles.servIcon}>{s.icon}</div>
                <h3 className={styles.servTitle}>{s.label}</h3>
                <p className={styles.servDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OTHER SHOP SERVICES ══════════ */}
      <section className={`section ${styles.extraSection}`}>
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.centered}`}>
            <p className={styles.sectionTag}>Also Available</p>
            <h2 className={styles.sectionTitle}>More Services at Our Shop</h2>
            <p className={styles.sectionSub}>
              We offer a range of everyday services beyond mobile repair — all under one roof.
            </p>
          </div>

          <div className={styles.extraGrid}>
            {EXTRA_SERVICES.map((s, i) => (
              <div
                key={s.label}
                className={`${styles.extraCard} anim-fade-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={styles.extraEmoji}>{s.emoji}</div>
                <h3 className={styles.extraTitle}>{s.label}</h3>
                <p className={styles.extraDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className={`section ${styles.hiwSection}`}>
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.centered}`}>
            <p className={styles.sectionTag}>The Process</p>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSub}>Four simple steps from booking to collecting your repaired device.</p>
          </div>

          <div className={styles.hiwGrid}>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`${styles.hiwCard} anim-fade-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.hiwNum}>{s.n}</div>
                {i < STEPS.length - 1 && (
                  <div className={styles.hiwArrow}>
                    <ChevronRight size={14} />
                  </div>
                )}
                <h3 className={styles.hiwTitle}>{s.title}</h3>
                <p className={styles.hiwDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className={`section ${styles.trustSection}`}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={`${styles.trustText} anim-fade-up`}>
              <p className={styles.sectionTag}>Why Tara Maa Mobile House</p>
              <h2 className={styles.sectionTitle}>Repair You Can Count On</h2>
              <p className={styles.sectionSub} style={{ marginTop: 12 }}>
                We combine technical expertise with genuine parts and transparent communication at every stage of your repair.
              </p>
              <Link to="/submit" className="btn btn-primary" style={{ marginTop: 28, display:'inline-flex' }}>
                Start a Repair <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.trustCards}>
              {TRUST.map((t, i) => (
                <div
                  key={t.label}
                  className={`${styles.trustCard} anim-fade-up`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={styles.trustIcon}>{t.icon}</div>
                  <div>
                    <div className={styles.trustNum}>{t.label}</div>
                    <div className={styles.trustSub}>{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TRACK CTA ══════════ */}
      <section className={`section-sm ${styles.ctaSection}`}>
        <div className="container">
          <div className={`${styles.ctaCard} anim-fade-up`}>
            <div className={styles.ctaLeft}>
              <h3 className={styles.ctaTitle}>Already submitted a repair?</h3>
              <p className={styles.ctaSub}>Enter your Repair ID to instantly check the current status of your device.</p>
            </div>
            <Link to="/track" className="btn btn-outline btn-lg">
              Track Repair <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Hero Status Card ──────────────────────────────────────────
function StatusCard() {
  return (
    <div className={styles.statusCard}>
      <div className={styles.scHeader}>
        <div className={styles.scDots}>
          <span style={{ background:'#FF5F57' }} />
          <span style={{ background:'#FFBD2E' }} />
          <span style={{ background:'#28CA41' }} />
        </div>
        <span className={styles.scTitle}>Repair Status</span>
      </div>

      <div className={styles.scRepairId}>
        <p className={styles.scIdLabel}>Repair ID</p>
        <p className={styles.scIdVal}>R1773502958103</p>
        <span className="badge badge-blue" style={{ fontSize:12, width:'fit-content' }}>
          <span className={styles.pulseDot} /> In Progress
        </span>
      </div>

      <div className={styles.scInfo}>
        {[['Device','Samsung Galaxy S22'],['Problem','Screen Cracked'],['Updated','2 hours ago']].map(([k,v]) => (
          <div key={k} className={styles.scRow}>
            <span className={styles.scKey}>{k}</span>
            <span className={styles.scVal}>{v}</span>
          </div>
        ))}
      </div>

      <div className={styles.scTimeline}>
        {['Received','Checking','Repairing','Completed'].map((s, i) => (
          <div key={s} className={`${styles.scStep} ${i <= 2 ? styles.scStepDone : ''} ${i === 2 ? styles.scStepActive : ''}`}>
            <div className={styles.scStepDot}>
              {i < 2 && <CheckCircle size={11} />}
              {i === 2 && <span className={styles.spinnerDot} />}
            </div>
            <span className={styles.scStepLabel}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}