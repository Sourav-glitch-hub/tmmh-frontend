
import { useState, useRef, useEffect } from 'react'
import {
  User, Smartphone, Wrench, Upload, CheckCircle,
  AlertCircle, ArrowRight, ArrowLeft, X, Copy, Check
} from 'lucide-react'
import { repairAPI } from '../api/index.js'
import styles from './SubmitRepair.module.css'

const PROBLEM_TYPES = [
  { value: 'screen',   label: 'Screen / Display', icon: '🖥️' },
  { value: 'battery',  label: 'Battery',          icon: '🔋' },
  { value: 'charging', label: 'Charging Port',    icon: '⚡' },
  { value: 'software', label: 'Software Issue',   icon: '💻' },
  { value: 'camera',   label: 'Camera',           icon: '📷' },
  { value: 'speaker',  label: 'Speaker / Mic',    icon: '🔊' },
  { value: 'other',    label: 'Other',            icon: '🔧' },
]

const STEPS = [
  { id: 1, label: 'Your Info',   icon: <User       size={16}/> },
  { id: 2, label: 'Device Info', icon: <Smartphone size={16}/> },
  { id: 3, label: 'Problem',     icon: <Wrench     size={16}/> },
]

const INIT = {
  customerName: '', phoneNumber: '',
  deviceBrand: '',  deviceModel: '',
  problemType: '',  problemDescription: '',
}

export default function SubmitRepair() {
  const [step,     setStep]     = useState(1)
  const [form,     setForm]     = useState(INIT)
  const [errors,   setErrors]   = useState({})
  const [image,    setImage]    = useState(null)
  const [drag,     setDrag]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [apiError, setApiError] = useState('')
  const [result,   setResult]   = useState(null)
  const [copied,   setCopied]   = useState(false)

  const fileRef = useRef()
  // Single ref on the ONE outer wrapper — always mounted
  const topRef  = useRef()

  // ── Scroll to top on EVERY state change (step or result) ────
  // Depends on both step and result so it fires when:
  //   • user clicks Continue / Back  (step changes)
  //   • form is submitted successfully (result changes)
  useEffect(() => {
    // scrollIntoView is the most reliable on mobile
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // Double-ensure with window.scrollTo as fallback
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 20)
  }, [step, result])

  const set = (key, val) => {
    setForm(f  => ({ ...f,  [key]: val }))
    setErrors(e => ({ ...e, [key]: ''  }))
  }

  const validate = (s = step) => {
    const e = {}
    if (s === 1) {
      if (!form.customerName.trim())
        e.customerName = 'Full name is required'
      else if (form.customerName.trim().length < 2)
        e.customerName = 'Name is too short'
      if (!form.phoneNumber.trim())
        e.phoneNumber = 'Phone number is required'
      else if (!/^[+]?[\d\s\-(). ]{10}$/.test(form.phoneNumber))
        e.phoneNumber = 'Enter a valid phone number'
    }
    if (s === 2) {
      if (!form.deviceBrand.trim()) e.deviceBrand = 'Device brand is required'
      if (!form.deviceModel.trim()) e.deviceModel = 'Device model is required'
    }
    if (s === 3) {
      if (!form.problemType)
        e.problemType = 'Select the type of problem'
      if (!form.problemDescription.trim())
        e.problemDescription = 'Please describe the problem'
      else if (form.problemDescription.trim().length < 10)
        e.problemDescription = 'Description too short (min 10 chars)'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goNext = () => { if (validate()) setStep(s => s + 1) }
  const goBack = () => setStep(s => s - 1)

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please upload an image file.'); return }
    if (file.size > 5 * 1024 * 1024)    { alert('File is too large. Max 5 MB.');  return }
    setImage(file)
  }

  const handleSubmit = async () => {
    if (!validate(3)) return
    setLoading(true)
    setApiError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (image) fd.append('image', image)
      const data = await repairAPI.submit(fd)
      setResult({ repairId: data.data.repairId })
    } catch (err) {
      setApiError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyId = () => {
    navigator.clipboard.writeText(result.repairId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setStep(1); setForm(INIT); setImage(null)
    setResult(null); setApiError(''); setErrors({})
  }

  // ════════════════════════════════════════════════════════════
  // SINGLE return — topRef wraps EVERYTHING so scroll always works
  // ════════════════════════════════════════════════════════════
  return (
    <div className={styles.page} ref={topRef}>
      <div className={`container ${styles.container}`}>

        {/* ── SUCCESS SCREEN ── */}
        {result ? (
          <div className={`${styles.successWrap} anim-scale-up`}>
            <div className={styles.successRing}>
              <CheckCircle size={36} strokeWidth={1.5}/>
            </div>
            <h1 className={styles.successTitle}>Request Submitted!</h1>
            <p className={styles.successSub}>
              Your repair request has been received. Keep your Repair ID safe to track your device.
            </p>

            <div className={styles.repairIdBox}>
              <p className={styles.repairIdLabel}>Your Repair ID</p>
              <div className={styles.repairIdRow}>
                <span className={styles.repairIdVal}>{result.repairId}</span>
                <button
                  className={`btn btn-ghost btn-sm ${styles.copyBtn}`}
                  onClick={copyId}
                >
                  {copied
                    ? <><Check size={14}/>Copied!</>
                    : <><Copy  size={14}/>Copy</>
                  }
                </button>
              </div>
            </div>

            <div className={styles.successInfo}>
              <div className={styles.successInfoItem}>
                <CheckCircle size={15} className={styles.successInfoIcon}/>
                <span>Bring your device with this ID to our shop</span>
              </div>
              <div className={styles.successInfoItem}>
                <CheckCircle size={15} className={styles.successInfoIcon}/>
                <span>Use this ID to track your repair status online anytime</span>
              </div>
            </div>

            <div className={styles.successActions}>
              <a href={`/track?id=${result.repairId}`} className="btn btn-primary">
                Track This Repair <ArrowRight size={16}/>
              </a>
              <button className="btn btn-ghost" onClick={reset}>
                Submit Another
              </button>
            </div>
          </div>

        ) : (
          /* ── FORM ── */
          <>
            {/* Page heading */}
            <div className={`${styles.pageHead} anim-fade-up`}>
              <h1 className={styles.pageTitle}>Book a Repair</h1>
              <p className={styles.pageSub}>Fill in the details below and we'll take care of the rest.</p>
            </div>

            {/* Step indicator */}
            <div className={`${styles.stepBar} anim-fade-up d2`}>
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`${styles.stepItem} ${step === s.id ? styles.stepActive : ''} ${step > s.id ? styles.stepDone : ''}`}
                >
                  <div className={styles.stepCircle}>
                    {step > s.id ? <CheckCircle size={16}/> : s.icon}
                  </div>
                  <span className={styles.stepLabel}>{s.label}</span>
                  {s.id < STEPS.length && (
                    <div className={`${styles.stepLine} ${step > s.id ? styles.stepLineDone : ''}`}/>
                  )}
                </div>
              ))}
            </div>

            {/* Form card */}
            <div className={`${styles.formCard} anim-fade-up d3`}>

              {apiError && (
                <div className={`alert alert-error ${styles.alertMb}`}>
                  <AlertCircle size={16}/> {apiError}
                </div>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Your Information</h2>
                  <p className={styles.stepSub}>We need your contact details to update you on your repair.</p>
                  <div className={styles.formGrid}>
                    <div className="form-group">
                      <label className="form-label">Full Name <span className={styles.req}>*</span></label>
                      <input
                        className={`form-input ${errors.customerName ? 'error' : ''}`}
                        placeholder="e.g. Sourav Samanta"
                        value={form.customerName}
                        onChange={e => set('customerName', e.target.value)}
                      />
                      {errors.customerName && <span className="form-error"><AlertCircle size={12}/>{errors.customerName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number <span className={styles.req}>*</span></label>
                      <input
                        className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                        placeholder="e.g. 8345904304"
                        value={form.phoneNumber}
                        onChange={e => set('phoneNumber', e.target.value)}
                      />
                      {errors.phoneNumber && <span className="form-error"><AlertCircle size={12}/>{errors.phoneNumber}</span>}
                    </div>
                  </div>
                  <div className="alert alert-info" style={{ marginTop: 20 }}>
                    <AlertCircle size={15}/>
                    Your details are used only to communicate about your repair.
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Device Details</h2>
                  <p className={styles.stepSub}>Tell us about the device you're bringing in.</p>
                  <div className={styles.formGrid}>
                    <div className="form-group">
                      <label className="form-label">Device Brand <span className={styles.req}>*</span></label>
                      <input
                        className={`form-input ${errors.deviceBrand ? 'error' : ''}`}
                        placeholder="e.g. Samsung, Apple, Xiaomi"
                        value={form.deviceBrand}
                        onChange={e => set('deviceBrand', e.target.value)}
                      />
                      {errors.deviceBrand && <span className="form-error"><AlertCircle size={12}/>{errors.deviceBrand}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Device Model <span className={styles.req}>*</span></label>
                      <input
                        className={`form-input ${errors.deviceModel ? 'error' : ''}`}
                        placeholder="e.g. Galaxy S22, iPhone 14 Pro"
                        value={form.deviceModel}
                        onChange={e => set('deviceModel', e.target.value)}
                      />
                      {errors.deviceModel && <span className="form-error"><AlertCircle size={12}/>{errors.deviceModel}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className={styles.stepContent}>
                  <h2 className={styles.stepTitle}>Problem Details</h2>
                  <p className={styles.stepSub}>Select the type of problem and describe it in detail.</p>

                  <div className="form-group" style={{ marginBottom: 24 }}>
                    <label className="form-label">Problem Type <span className={styles.req}>*</span></label>
                    <div className={styles.problemGrid}>
                      {PROBLEM_TYPES.map(p => (
                        <button
                          key={p.value}
                          type="button"
                          className={`${styles.problemBtn} ${form.problemType === p.value ? styles.problemBtnActive : ''}`}
                          onClick={() => set('problemType', p.value)}
                        >
                          <span className={styles.problemIcon}>{p.icon}</span>
                          <span className={styles.problemLabel}>{p.label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.problemType && <span className="form-error"><AlertCircle size={12}/>{errors.problemType}</span>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 24 }}>
                    <label className="form-label">Describe the Problem <span className={styles.req}>*</span></label>
                    <textarea
                      className={`form-textarea ${errors.problemDescription ? 'error' : ''}`}
                      placeholder="Describe what's happening in detail — e.g. 'Screen cracked at the top right corner, touch is unresponsive in that area.'"
                      value={form.problemDescription}
                      onChange={e => set('problemDescription', e.target.value)}
                    />
                    <div className={styles.charCount}>{form.problemDescription.length} / 1000</div>
                    {errors.problemDescription && <span className="form-error"><AlertCircle size={12}/>{errors.problemDescription}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Photo of Damage <span className={styles.optional}>(optional)</span></label>
                    <div
                      className={`${styles.uploadZone} ${drag ? styles.uploadDrag : ''}`}
                      onDragOver={e  => { e.preventDefault(); setDrag(true) }}
                      onDragLeave={() => setDrag(false)}
                      onDrop={e      => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]) }}
                      onClick={() => fileRef.current?.click()}
                    >
                      <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])}/>
                      <Upload size={24} className={styles.uploadIcon}/>
                      <p className={styles.uploadText}>Drop image here or <span>click to browse</span></p>
                      <p className={styles.uploadHint}>JPG, PNG or WebP · Max 5 MB</p>
                    </div>
                    {image && (
                      <div className={styles.uploadPreview}>
                        <div className={styles.uploadPreviewImg}>
                          <img src={URL.createObjectURL(image)} alt="preview"/>
                        </div>
                        <div className={styles.uploadPreviewName}>{image.name}</div>
                        <button className="btn btn-ghost btn-sm" onClick={() => setImage(null)} style={{ padding: '6px' }}>
                          <X size={15}/>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom nav */}
              <div className={styles.navBtns}>
                <div>
                  {step > 1 && (
                    <button className="btn btn-ghost" onClick={goBack}>
                      <ArrowLeft size={16}/> Back
                    </button>
                  )}
                </div>
                <div className={styles.navRight}>
                  <span className={styles.stepCount}>Step {step} of {STEPS.length}</span>
                  {step < 3
                    ? <button className="btn btn-primary" onClick={goNext}>
                        Continue <ArrowRight size={16}/>
                      </button>
                    : <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                        {loading
                          ? <><div className="spinner"/> Submitting…</>
                          : <><CheckCircle size={16}/> Submit Request</>
                        }
                      </button>
                  }
                </div>
              </div>
            </div>

            <p className={`${styles.hint} anim-fade-in d4`}>
              All fields marked <span className={styles.req}>*</span> are required
            </p>
          </>
        )}

      </div>
    </div>
  )
}
