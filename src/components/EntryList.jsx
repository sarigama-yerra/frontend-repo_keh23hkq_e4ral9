import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EntryList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const total = useMemo(() => items.reduce((acc, i) => acc + (i.amount || 0), 0), [items])

  const fetchEntries = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/entries`)
      if (!res.ok) throw new Error('Failed to load entries')
      const data = await res.json()
      setItems(data.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEntries() }, [])

  return (
    <section id="entries" className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Entries</h2>
        <button onClick={fetchEntries} className="text-sm px-3 py-2 rounded-lg bg-white text-slate-900 font-medium">Refresh</button>
      </div>
      {loading && <p className="text-white/70">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}
      {!loading && !items.length && <p className="text-white/70">No entries yet.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <article key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {item.screenshot_url && (
              <div className="aspect-video bg-black/30">
                <img src={item.screenshot_url} alt={item.note || 'screenshot'} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4 text-white">
              <div className="flex items-center justify-between mb-1">
                <p className="text-lg font-semibold">{item.amount?.toFixed ? item.amount.toFixed(2) : item.amount} {item.currency}</p>
                {item.category && <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">{item.category}</span>}
              </div>
              {item.note && <p className="text-white/80 text-sm mb-2">{item.note}</p>}
              <p className="text-xs text-white/60">{item.occurred_at ? new Date(item.occurred_at).toLocaleString() : 'Date not set'}</p>
            </div>
          </article>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 text-white">
          <p className="font-medium">Total recorded: <span className="text-white">{total.toFixed(2)}</span> {items[0]?.currency || 'USD'}</p>
        </div>
      )}
    </section>
  )
}
