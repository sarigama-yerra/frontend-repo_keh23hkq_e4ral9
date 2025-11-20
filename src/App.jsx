import Hero from './components/Hero'
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <main className="relative z-10 -mt-10">
        <div className="max-w-6xl mx-auto">
          <EntryForm onAdded={() => { /* list updates handled by refresh button */ }} />
          <EntryList />
        </div>
      </main>
      <footer className="text-center text-white/60 py-10">
        Built for modern, minimalist finance tracking.
      </footer>
    </div>
  )
}

export default App
