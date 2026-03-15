// src/pages/Accessories.jsx
import { useState, useEffect } from 'react'
import { Package, Zap, Battery, Volume2, Shield, AlertCircle, Search, WifiOff } from 'lucide-react'
import { productAPI } from '../api/index.js'
import styles from './Accessories.module.css'

// ── Backend URL — all uploaded images are served from here ────
const BACKEND = 'https://tmmh-backend.onrender.com'

const CATEGORIES = [
  { value: 'all',            label: 'All Products' },
  { value: 'cover',          label: 'Covers' },
  { value: 'charger',        label: 'Chargers' },
  { value: 'powerbank',      label: 'Power Banks' },
  { value: 'earphone',       label: 'Earphones' },
  { value: 'tempered glass', label: 'Tempered Glass' },
]

const CAT_ICONS = {
  cover:            <Package size={36} />,
  charger:          <Zap size={36} />,
  powerbank:        <Battery size={36} />,
  earphone:         <Volume2 size={36} />,
  'tempered glass': <Shield size={36} />,
}

const CAT_COLORS = {
  cover:            { bg: '#EFF6FF', icon: '#2563EB' },
  charger:          { bg: '#FFFBEB', icon: '#D97706' },
  powerbank:        { bg: '#F0FDF4', icon: '#16A34A' },
  earphone:         { bg: '#FDF4FF', icon: '#9333EA' },
  'tempered glass': { bg: '#F0F9FF', icon: '#0284C7' },
}

export default function Accessories() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(false)
  const [category, setCategory] = useState('all')
  const [search,   setSearch]   = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(false)
      try {
        const data = await productAPI.getAll()
        setProducts(data.data || [])
      } catch {
        setError(true)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = products.filter(p => {
    const matchCat    = category === 'all' || p.category === category
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className={styles.page}>
      <div className="container">

        <div className={`${styles.pageHead} anim-fade-up`}>
          <h1 className={styles.pageTitle}>Accessories</h1>
          <p className={styles.pageSub}>Quality accessories available in-store. Visit us to see pricing and current stock.</p>
        </div>

        {/* Filters */}
        <div className={`${styles.filterRow} anim-fade-up d2`}>
          <div className={styles.catFilters}>
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                className={`${styles.catBtn} ${category === c.value ? styles.catBtnActive : ''}`}
                onClick={() => setCategory(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className={styles.searchBox}>
            <Search size={15} className={styles.searchIcon}/>
            <input
              className={styles.searchInput}
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {!loading && !error && (
          <p className={`${styles.resultCount} anim-fade-in`}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Error state — backend unreachable */}
        {error ? (
          <div className={styles.empty}>
            <WifiOff size={40} className={styles.emptyIcon}/>
            <p className={styles.emptyTitle}>Could not load products</p>
            <p className={styles.emptySub}>Please check your connection or try again later.</p>
          </div>

        /* Loading state */
        ) : loading ? (
          <div className={styles.grid}>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i}/>)}
          </div>

        /* No results */
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <Package size={40} className={styles.emptyIcon}/>
            <p className={styles.emptyTitle}>No products found</p>
            <p className={styles.emptySub}>Try a different category or search term.</p>
          </div>

        /* Product grid */
        ) : (
          <div className={styles.grid}>
            {filtered.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i}/>
            ))}
          </div>
        )}

        <div className={`alert alert-info ${styles.infoNote} anim-fade-up`}>
          <AlertCircle size={15}/>
          <span>
            <strong>In-store pricing only.</strong> Visit our shop for prices and personalised recommendations.
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Product card ─────────────────────────────────────────────
function ProductCard({ product: p, index }) {
  const colors = CAT_COLORS[p.category] || { bg: '#F8FAFC', icon: '#64748B' }
  const [imgFailed, setImgFailed] = useState(false)

  // ✅ FIXED: if image is already a full URL (http...), use it directly
  // if it's a local path (/uploads/...), prepend the backend URL
  const imgUrl = p.image && !imgFailed
    ? (p.image.startsWith('http') ? p.image : `${BACKEND}${p.image}`)
    : null

  return (
    <div
      className={`${styles.prodCard} anim-fade-up`}
      style={{ animationDelay: `${(index % 4) * 0.07}s` }}
    >
      {/* Image area */}
      <div
        className={styles.prodImg}
        style={{ background: imgUrl ? '#f8fafc' : colors.bg }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={p.name}
            className={styles.prodImgReal}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className={styles.prodImgIcon} style={{ color: colors.icon }}>
            {CAT_ICONS[p.category] || <Package size={36}/>}
          </div>
        )}
      </div>

      {/* Body */}
      <div className={styles.prodBody}>
        <div className={styles.prodTop}>
          <span className={styles.prodCat}>{p.category}</span>
          <span className={`badge ${p.available ? 'badge-green' : 'badge-gray'} ${styles.availBadge}`}>
            <span className={`${styles.availDot} ${p.available ? styles.availDotOn : ''}`}/>
            {p.available ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <h3 className={styles.prodName}>{p.name}</h3>
        <p className={styles.prodDesc}>{p.description}</p>
      </div>
    </div>
  )
}

// ── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className={styles.prodCard}>
      <div className={`skeleton ${styles.skelImg}`}/>
      <div className={styles.prodBody}>
        <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 12 }}/>
        <div className="skeleton" style={{ height: 16, marginBottom: 8 }}/>
        <div className="skeleton" style={{ height: 13, marginBottom: 4 }}/>
        <div className="skeleton" style={{ height: 13, width: '70%' }}/>
      </div>
    </div>
  )
}
