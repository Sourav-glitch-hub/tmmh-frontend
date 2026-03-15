// // ============================================================
// // src/api/index.js
// // Centralized API service — all backend calls live here
// // Base URL uses Vite proxy in dev (/api → localhost:5000/api)
// // ============================================================

// const BASE = '/api'

// // ─── Generic fetch wrapper ───────────────────────────────────
// const request = async (path, options = {}) => {
//   const url = `${BASE}${path}`

//   const config = {
//     headers: { 'Content-Type': 'application/json', ...options.headers },
//     ...options,
//   }

//   // Don't set Content-Type for FormData (multipart) — browser sets it with boundary
//   if (options.body instanceof FormData) {
//     delete config.headers['Content-Type']
//   }

//   const res = await fetch(url, config)
//   const data = await res.json()

//   if (!res.ok) {
//     const msg = data?.errors?.[0]?.message || data?.message || 'Something went wrong'
//     throw new Error(msg)
//   }

//   return data
// }

// // ============================================================
// // AUTH
// // ============================================================
// export const authAPI = {
//   login: (email, password) =>
//     request('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//     }),
// }

// // ============================================================
// // REPAIR REQUESTS
// // ============================================================
// export const repairAPI = {
//   /**
//    * Submit a new repair request (with optional image)
//    * @param {FormData} formData
//    */
//   submit: (formData) =>
//     request('/repairs', {
//       method: 'POST',
//       body: formData,
//     }),

//   /**
//    * Get repair status by repairId (e.g. "R1001")
//    * @param {string} repairId
//    */
//   getStatus: (repairId) =>
//     request(`/repairs/${repairId}`),
// }

// // ============================================================
// // PRODUCTS / ACCESSORIES
// // ============================================================
// export const productAPI = {
//   /**
//    * Get all available products, optional category filter
//    * @param {string} [category]
//    */
//   getAll: (category = '') => {
//     const params = new URLSearchParams({ available: 'true' })
//     if (category && category !== 'all') params.set('category', category)
//     return request(`/products?${params}`)
//   },
// }

// src/api/index.js
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

// ── Generic fetch with retry (handles Render cold start) ─────
const request = async (path, options = {}, retries = 2) => {
  const url = `${BASE}${path}`

  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  }

  if (options.body instanceof FormData) {
    delete config.headers['Content-Type']
  }

  try {
    const res = await fetch(url, config)

    // Empty response — server waking up, retry
    const text = await res.text()
    if (!text && retries > 0) {
      await new Promise(r => setTimeout(r, 3000)) // wait 3 seconds
      return request(path, options, retries - 1)
    }

    const data = JSON.parse(text)
    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || data?.message || 'Something went wrong'
      throw new Error(msg)
    }
    return data

  } catch (err) {
    // If JSON parse failed and we have retries left — server waking up
    if (err instanceof SyntaxError && retries > 0) {
      await new Promise(r => setTimeout(r, 3000))
      return request(path, options, retries - 1)
    }
    throw err
  }
}

// ── Auth ─────────────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
}

// ── Repairs ──────────────────────────────────────────────────
export const repairAPI = {
  submit: (formData) =>
    request('/repairs', { method: 'POST', body: formData }),

  getStatus: (repairId) =>
    request(`/repairs/${repairId}`),
}

// ── Products ─────────────────────────────────────────────────
export const productAPI = {
  getAll: (category = '') => {
    const params = new URLSearchParams({ available: 'true' })
    if (category && category !== 'all') params.set('category', category)
    return request(`/products?${params}`)
  },
}
