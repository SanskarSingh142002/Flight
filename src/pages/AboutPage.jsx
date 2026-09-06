import { ArrowRight, CheckCircle, Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const principles = [
  { icon: Globe2, title: 'A clearer way to travel', text: 'We bring live flight options, useful details, and a human support team into one simple booking journey.' },
  { icon: ShieldCheck, title: 'Confidence at every step', text: 'Your booking information is handled carefully, with secure payment processing and transparent updates.' },
  { icon: Users, title: 'People behind the service', text: 'When your plans matter, our team is here to help review requests and keep you informed.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#0d1716] text-white">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)', backgroundSize: '34px 34px' }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300 mb-5">About FareOracle</p>
            <h1 className="max-w-3xl text-4xl sm:text-6xl font-black leading-tight">Travel planning should feel clear, not complicated.</h1>
            <p className="max-w-2xl mt-6 text-base sm:text-lg leading-relaxed text-white/65">FareOracle helps travelers compare real flight options, make confident choices, and move from search to booking with a little more ease.</p>
            <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors">
              Search flights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <div className="flex items-center gap-2 text-emerald-700 mb-4"><Sparkles className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">Our approach</span></div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">A smarter search, backed by real support.</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">From domestic journeys to international plans, FareOracle keeps the experience focused on what matters: accurate choices, clear information, and dependable help when you need it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card p-6 sm:p-7">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5"><Icon className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">Built for modern travelers</p><h2 className="text-3xl font-black text-gray-900">From the first search to the final confirmation.</h2></div>
            <div className="space-y-4 text-sm text-gray-600">
              {['Live flight choices from trusted travel data', 'A guided passenger and payment flow', 'Booking visibility and support after checkout'].map(item => <p key={item} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />{item}</p>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
