// // ============================================================
// // src/pages/Accessories.jsx
// // ============================================================
// import { useState, useEffect } from 'react'
// import { Package, Zap, Battery, Volume2, Shield, Tag, AlertCircle, Search } from 'lucide-react'
// import { productAPI } from '../api/index.js'
// import styles from './Accessories.module.css'

// const CATEGORIES = [
//   { value: 'all',           label: 'All Products' },
//   { value: 'cover',         label: 'Covers'       },
//   { value: 'charger',       label: 'Chargers'     },
//   { value: 'powerbank',     label: 'Power Banks'  },
//   { value: 'earphone',      label: 'Earphones'    },
//   { value: 'tempered glass',label: 'Tempered Glass'},
// ]

// const CAT_ICONS = {
//   cover:          <Package  size={36}/>,
//   charger:        <Zap      size={36}/>,
//   powerbank:      <Battery  size={36}/>,
//   earphone:       <Volume2  size={36}/>,
//   'tempered glass':<Shield  size={36}/>,
// }

// const CAT_COLORS = {
//   cover:           { bg: '#EFF6FF', icon: '#2563EB' },
//   charger:         { bg: '#FFFBEB', icon: '#D97706' },
//   powerbank:       { bg: '#F0FDF4', icon: '#16A34A' },
//   earphone:        { bg: '#FDF4FF', icon: '#9333EA' },
//   'tempered glass':{ bg: '#F0F9FF', icon: '#0284C7' },
// }

// // Fallback sample data when backend is offline
// const FALLBACK = [
//   { _id:'1', name:'9H Tempered Glass — Universal',    category:'tempered glass', description:'Crystal-clear oleophobic coating. Full-coverage with dust-proof installation kit.', available:true  },
//   { _id:'2', name:'Rugged Armor Case — Samsung',      category:'cover',          description:'Military-grade drop protection with carbon-fibre texture and raised camera bezel.',  available:true  },
//   { _id:'3', name:'20W USB-C Fast Charger',           category:'charger',        description:'PD 3.0 compact adapter. From 0–50% in under 30 min. Compatible with all models.',   available:true  },
//   { _id:'4', name:'Slim 10 000 mAh Power Bank',       category:'powerbank',      description:'Dual-port (USB-A + USB-C). Ultra-slim, LED indicator, airline approved.',            available:true  },
//   { _id:'5', name:'True Wireless Earbuds Pro',        category:'earphone',       description:'6-hour playtime, IPX4 water resistance, touch controls, rich bass tuning.',          available:true  },
//   { _id:'6', name:'Transparent Case — iPhone',        category:'cover',          description:'Premium clear TPU with anti-yellowing formula and MagSafe ring.',                    available:false },
//   { _id:'7', name:'65W GaN Charger — 3 Port',         category:'charger',        description:'Charge laptop, phone and earbuds simultaneously from a single plug.',                available:true  },
//   { _id:'8', name:'Privacy Glass — iPhone 15',        category:'tempered glass', description:'Anti-spy 30° privacy filter. Full 9H hardness with dust-proof adhesive edges.',      available:true  },
// ]

// export default function Accessories() {
//   const [products, setProducts] = useState([])
//   const [loading,  setLoading]  = useState(true)
//   const [category, setCategory] = useState('all')
//   const [search,   setSearch]   = useState('')

//   // Load products from backend
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true)
//       try {
//         const data = await productAPI.getAll()
//         setProducts(data.data?.length ? data.data : FALLBACK)
//       } catch {
//         setProducts(FALLBACK)
//       } finally {
//         setLoading(false)
//       }
//     }
//     load()
//   }, [])

//   // Filter locally
//   const filtered = products.filter(p => {
//     const matchCat = category === 'all' || p.category === category
//     const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
//     return matchCat && matchSearch
//   })

//   return (
//     <div className={styles.page}>
//       <div className="container">

//         {/* Heading */}
//         <div className={`${styles.pageHead} anim-fade-up`}>
//           <h1 className={styles.pageTitle}>Accessories</h1>
//           <p className={styles.pageSub}>Quality accessories available in-store. Visit us to see pricing and current stock.</p>
//         </div>

//         {/* Filter + Search row */}
//         <div className={`${styles.filterRow} anim-fade-up d2`}>
//           <div className={styles.catFilters}>
//             {CATEGORIES.map(c => (
//               <button
//                 key={c.value}
//                 className={`${styles.catBtn} ${category === c.value ? styles.catBtnActive : ''}`}
//                 onClick={() => setCategory(c.value)}
//               >
//                 {c.label}
//               </button>
//             ))}
//           </div>
//           <div className={styles.searchBox}>
//             <Search size={15} className={styles.searchIcon}/>
//             <input
//               className={styles.searchInput}
//               placeholder="Search products…"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Results count */}
//         {!loading && (
//           <p className={`${styles.resultCount} anim-fade-in`}>
//             {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
//           </p>
//         )}

//         {/* Grid */}
//         {loading ? (
//           <div className={styles.grid}>
//             {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className={styles.empty}>
//             <Package size={40} className={styles.emptyIcon}/>
//             <p className={styles.emptyTitle}>No products found</p>
//             <p className={styles.emptySub}>Try a different category or search term.</p>
//           </div>
//         ) : (
//           <div className={styles.grid}>
//             {filtered.map((p, i) => (
//               <ProductCard key={p._id} product={p} index={i}/>
//             ))}
//           </div>
//         )}

//         {/* Info note */}
//         <div className={`alert alert-info ${styles.infoNote} anim-fade-up`}>
//           <AlertCircle size={15}/>
//           <span>
//             <strong>In-store pricing only.</strong> Visit our shop for prices and personalised recommendations.
//           </span>
//         </div>

//       </div>
//     </div>
//   )
// }

// // ── Product card ─────────────────────────────────────────────
// function ProductCard({ product: p, index }) {
//   const colors = CAT_COLORS[p.category] || { bg: '#F8FAFC', icon: '#64748B' }

//   return (
//     <div
//       className={`${styles.prodCard} anim-fade-up`}
//       style={{ animationDelay: `${(index % 4) * 0.07}s` }}
//     >
//       {/* Image area */}
//       <div className={styles.prodImg} style={{ background: colors.bg }}>
//         <div className={styles.prodImgIcon} style={{ color: colors.icon }}>
//           {CAT_ICONS[p.category] || <Package size={36}/>}
//         </div>
//       </div>

//       {/* Body */}
//       <div className={styles.prodBody}>
//         <div className={styles.prodTop}>
//           <span className={styles.prodCat}>{p.category}</span>
//           <span className={`badge ${p.available ? 'badge-green' : 'badge-gray'} ${styles.availBadge}`}>
//             <span className={`${styles.availDot} ${p.available ? styles.availDotOn : ''}`}/>
//             {p.available ? 'In Stock' : 'Out of Stock'}
//           </span>
//         </div>

//         <h3 className={styles.prodName}>{p.name}</h3>
//         <p className={styles.prodDesc}>{p.description}</p>
//       </div>
//     </div>
//   )
// }

// // ── Skeleton card ────────────────────────────────────────────
// function SkeletonCard() {
//   return (
//     <div className={styles.prodCard}>
//       <div className={`skeleton ${styles.skelImg}`}/>
//       <div className={styles.prodBody}>
//         <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 12 }}/>
//         <div className="skeleton" style={{ height: 16, marginBottom: 8 }}/>
//         <div className="skeleton" style={{ height: 13, marginBottom: 4 }}/>
//         <div className="skeleton" style={{ height: 13, width: '70%' }}/>
//       </div>
//     </div>
//   )
// }

// src/pages/Accessories.jsx
import { useState, useEffect } from 'react'
import { Package, Zap, Battery, Volume2, Shield, AlertCircle, Search } from 'lucide-react'
import { productAPI } from '../api/index.js'
import styles from './Accessories.module.css'

// ── Backend URL — all uploaded images are served from here ────
const BACKEND = 'http://localhost:5000'

const CATEGORIES = [
  { value: 'all',            label: 'All Products' },
  { value: 'cover',          label: 'Covers' },
  { value: 'charger',        label: 'Chargers' },
  { value: 'powerbank',      label: 'Power Banks' },
  { value: 'earphone',       label: 'Earphones' },
  { value: 'tempered glass', label: 'Tempered Glass' },
//   { value: 'other',          label: 'Other Accessories' },
]

const CAT_ICONS = {
  cover:            <Package size={36} />,
  charger:          <Zap size={36} />,
  powerbank:        <Battery size={36} />,
  earphone:         <Volume2 size={36} />,
  'tempered glass': <Shield size={36} />,
//   other:            <MoreHorizontal size={36} />,   // added icon
}

const CAT_COLORS = {
  cover:            { bg: '#EFF6FF', icon: '#2563EB' },
  charger:          { bg: '#FFFBEB', icon: '#D97706' },
  powerbank:        { bg: '#F0FDF4', icon: '#16A34A' },
  earphone:         { bg: '#FDF4FF', icon: '#9333EA' },
  'tempered glass': { bg: '#F0F9FF', icon: '#0284C7' },
//   other:            { bg: '#F3F4F6', icon: '#374151' }, // added color
}

const FALLBACK = [
  { _id:'1', name:'9H Tempered Glass — Universal',    category:'tempered glass', description:'Crystal-clear oleophobic coating. Full-coverage with dust-proof installation kit.', available:true,  image: null },
  { _id:'2', name:'Rugged Armor Case — Samsung',      category:'cover',          description:'Military-grade drop protection with carbon-fibre texture and raised camera bezel.',  available:true,  image: null },
  { _id:'3', name:'20W USB-C Fast Charger',           category:'charger',        description:'PD 3.0 compact adapter. From 0–50% in under 30 min. Compatible with all models.',   available:true,  image: null },
  { _id:'4', name:'Slim 10 000 mAh Power Bank',       category:'powerbank',      description:'Dual-port (USB-A + USB-C). Ultra-slim, LED indicator, airline approved.',            available:true,  image: null },
  { _id:'5', name:'True Wireless Earbuds Pro',        category:'earphone',       description:'6-hour playtime, IPX4 water resistance, touch controls, rich bass tuning.',          available:true,  image: null },
  { _id:'6', name:'Transparent Case — iPhone',        category:'cover',          description:'Premium clear TPU with anti-yellowing formula and MagSafe ring.',                    available:false, image: null },
  { _id:'7', name:'65W GaN Charger — 3 Port',         category:'charger',        description:'Charge laptop, phone and earbuds simultaneously from a single plug.',                available:true,  image: null },
  { _id:'8', name:'Privacy Glass — iPhone 15',        category:'tempered glass', description:'Anti-spy 30° privacy filter. Full 9H hardness with dust-proof adhesive edges.',      available:true,  image: null },
]

export default function Accessories() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [category, setCategory] = useState('all')
  const [search,   setSearch]   = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await productAPI.getAll()
        setProducts(data.data?.length ? data.data : FALLBACK)
      } catch {
        setProducts(FALLBACK)
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

        {!loading && (
          <p className={`${styles.resultCount} anim-fade-in`}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Product grid */}
        {loading ? (
          <div className={styles.grid}>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <Package size={40} className={styles.emptyIcon}/>
            <p className={styles.emptyTitle}>No products found</p>
            <p className={styles.emptySub}>Try a different category or search term.</p>
          </div>
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

  // Build full image URL — backend stores paths like /uploads/products/filename.jpg
  const imgUrl = p.image && !imgFailed ? `${BACKEND}${p.image}` : null

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
          // Real uploaded image
          <img
            src={imgUrl}
            alt={p.name}
            className={styles.prodImgReal}
            onError={() => setImgFailed(true)}
          />
        ) : (
          // Fallback category icon
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