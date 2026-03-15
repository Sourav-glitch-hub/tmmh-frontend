// ============================================================
// src/pages/TrackRepair.jsx
// ============================================================
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search, CheckCircle, AlertCircle, Loader, Clock,
  Smartphone, Wrench, MapPin, RefreshCw
} from 'lucide-react'
import { repairAPI } from '../api/index.js'
import styles from './TrackRepair.module.css'

const STATUS_STEPS = [
  { key: 'Received',  icon: <Clock      size={16}/>, desc: 'Your request has been received and is queued for review.'     },
  { key: 'Checking',  icon: <Search     size={16}/>, desc: 'Our technician is diagnosing the issue with your device.'     },
  { key: 'Repairing', icon: <Wrench     size={16}/>, desc: 'Your device is currently being repaired by our engineers.'    },
  { key: 'Completed', icon: <CheckCircle size={16}/>,desc: 'Repair complete — your device is ready for collection!'       },
]

const STATUS_BADGE = {
  Received:  'badge-gray',
  Checking:  'badge-amber',
  Repairing: 'badge-blue',
  Completed: 'badge-green',
}

export default function TrackRepair() {
  const [params] = useSearchParams()
  const [query,   setQuery]   = useState(params.get('id') || '')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState('')

  // Auto-search if repairId passed in URL (?id=R1001)
  useEffect(() => {
    if (params.get('id')) search(params.get('id'))
  }, [])

  const search = async (id) => {
    const q = (id || query).trim().toUpperCase()
    if (!q) { setError('Please enter a Repair ID'); return }
    if (!/^R\d+$/.test(q)) { setError('Invalid format — must be like R1001'); return }

    setLoading(true); setError(''); setResult(null)
    try {
      const data = await repairAPI.getStatus(q)
      setResult(data.data)
    } catch (err) {
      setError(err.message || 'Repair ID not found. Please check and try again.')
    } finally {
      setLoading(false)
    }
  }

  const statusIndex = result ? STATUS_STEPS.findIndex(s => s.key === result.status) : -1

  return (
    <div className={styles.page}>
      <div className={`container ${styles.container}`}>

        {/* Heading */}
        <div className={`${styles.pageHead} anim-fade-up`}>
          <h1 className={styles.pageTitle}>Track Your Repair</h1>
          <p className={styles.pageSub}>Enter your Repair ID to see real-time status updates on your device.</p>
        </div>

        {/* Search bar */}
        <div className={`${styles.searchWrap} anim-fade-up d2`}>
          <div className={`${styles.searchBox} ${error ? styles.searchError : ''}`}>
            <Search size={18} className={styles.searchIcon}/>
            <input
              className={styles.searchInput}
              placeholder="Enter Repair ID — e.g. R1773502958103"
              value={query}
              onChange={e => { setQuery(e.target.value.toUpperCase()); setError('') }}
              onKeyDown={e => e.key === 'Enter' && search()}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => { setQuery(''); setResult(null); setError('') }}>
                ✕
              </button>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => search()} disabled={loading}>
            {loading ? <><div className="spinner"/>Searching…</> : <><Search size={16}/>Track</>}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className={`alert alert-error anim-fade-up ${styles.mb24}`}>
            <AlertCircle size={16}/> {error}
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className={`${styles.emptyState} anim-fade-up d3`}>
            <div className={styles.emptyIcon}><Search size={32}/></div>
            <p className={styles.emptyTitle}>Enter your Repair ID above</p>
            <p className={styles.emptySub}>You received your Repair ID after submitting a repair request.<br/>It looks like <strong>R1773502958103</strong>, <strong>R1773502958104</strong>, etc.</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`${styles.resultCard} anim-scale-up`}>

            {/* Header */}
            <div className={styles.resultHeader}>
              <div className={styles.resultHeaderLeft}>
                <p className={styles.resultIdLabel}>Repair ID</p>
                <h2 className={styles.resultId}>{result.repairId}</h2>
              </div>
              <div className={styles.resultHeaderRight}>
                <span className={`badge ${STATUS_BADGE[result.status] || 'badge-gray'}`}>
                  <span className={styles.statusDot}/>
                  {result.status}
                </span>
                <button
                  className={`btn btn-ghost btn-sm ${styles.refreshBtn}`}
                  onClick={() => search(result.repairId)}
                  title="Refresh status"
                >
                  <RefreshCw size={14}/>
                </button>
              </div>
            </div>

            {/* Info grid */}
            <div className={styles.infoGrid}>
              {[
                { label: 'Customer',    value: result.customerName },
                { label: 'Device',      value: `${result.deviceBrand} ${result.deviceModel}` },
                { label: 'Problem',     value: result.problemType?.charAt(0).toUpperCase() + result.problemType?.slice(1) },
                { label: 'Submitted',   value: new Date(result.submittedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) },
                { label: 'Last Update', value: new Date(result.lastUpdated).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) },
              ].map(({ label, value }) => (
                <div key={label} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{label}</span>
                  <span className={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className={styles.timelineWrap}>
              <p className={styles.timelineTitle}>Repair Progress</p>
              <div className={styles.timeline}>
                {STATUS_STEPS.map((s, i) => {
                  // ✅ FIXED: when status is Completed, all steps including last one show green tick
                  const done   = i < statusIndex || (i === statusIndex && result.status === 'Completed')
                  const active = i === statusIndex && result.status !== 'Completed'
                  const future = i > statusIndex

                  return (
                    <div key={s.key} className={`${styles.tlItem} ${done ? styles.tlDone : ''} ${active ? styles.tlActive : ''}`}>
                      {/* Connector line */}
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={`${styles.tlLine} ${done ? styles.tlLineDone : ''}`}/>
                      )}

                      {/* Dot */}
                      <div className={`${styles.tlDot} ${done ? styles.tlDotDone : ''} ${active ? styles.tlDotActive : ''}`}>
                        {done
                          ? <CheckCircle size={14}/>
                          : active
                            ? <div className="spinner spinner-blue" style={{ width:14, height:14, borderWidth:2 }}/>
                            : <span className={styles.tlDotNum}>{i + 1}</span>
                        }
                      </div>

                      {/* Text */}
                      <div className={styles.tlText}>
                        <span className={`${styles.tlLabel} ${future ? styles.tlLabelFuture : ''}`}>{s.key}</span>
                        {(done || active) && <span className={styles.tlDesc}>{s.desc}</span>}
                        {done   && <span className={styles.tlDoneTag}><CheckCircle size={11}/>Complete</span>}
                        {active && <span className={styles.tlActiveTag}><span className={styles.pulseDot}/>In Progress</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Completed callout */}
            {result.status === 'Completed' && (
              <div className={`alert alert-success ${styles.completedAlert}`}>
                <CheckCircle size={16}/>
                <div>
                  <strong>Your device is ready!</strong><br/>
                  Please visit our shop to collect your repaired device.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
