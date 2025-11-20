import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">Your finances, beautifully organized</h1>
          <p className="text-white/80 mb-6">Track amounts, attach receipt screenshots, and see a clear picture of where your money goes. Simple, modern, and secure.</p>
          <div className="flex gap-3">
            <a href="#add" className="px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:opacity-90 transition">Add an entry</a>
            <a href="#entries" className="px-5 py-3 rounded-xl border border-white/40 text-white font-medium hover:bg-white/10 transition">View entries</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
    </section>
  );
}
