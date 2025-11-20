import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EntryForm({ onAdded }) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        amount: parseFloat(amount),
        currency,
        screenshot_url: screenshotUrl || null,
        note: note || null,
        category: category || null,
        occurred_at: date ? new Date(date).toISOString() : null,
      }
      const res = await fetch(`${API_BASE}/api/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to add entry')
      const data = await res.json()
      setAmount('')
      setScreenshotUrl('')
      setNote('')
      setCategory('')
      setDate('')
      if (onAdded) onAdded(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="add" className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Add a new entry</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/80 mb-1">Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" step="0.01" className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Currency</label>
            <input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} maxLength={5} className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80 mb-1">Screenshot URL (optional)</label>
            <input value={screenshotUrl} onChange={(e) => setScreenshotUrl(e.target.value)} placeholder="https://..." className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80 mb-1">Note</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/40" />
          </div>
          {error && <p className="text-red-300 text-sm md:col-span-2">{error}</p>}
          <div className="md:col-span-2">
            <button disabled={loading} className="px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:opacity-90 transition disabled:opacity-50">
              {loading ? 'Adding...' : 'Add entry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
