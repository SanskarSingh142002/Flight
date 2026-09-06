import { useState } from 'react'
import { Clock3, Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const contactItems = [
  { icon: Phone, label: 'Call us', value: 'Toll Free # +1 888 584 4337', href: 'tel:+18885844337' },
  { icon: Mail, label: 'Email us', value: 'Info@fareoracle.com', href: 'mailto:Info@fareoracle.com' },
  { icon: MapPin, label: 'Visit us', value: '626 Wilshire Blvd Suite 410, Los Angeles, CA 90017' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
    }, 600)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setStatus('idle')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="bg-[#0d1716] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300 mb-5">Contact FareOracle</p>
            <h1 className="max-w-3xl text-4xl sm:text-6xl font-black leading-tight">A real person is never far away.</h1>
            <p className="max-w-2xl mt-6 text-base sm:text-lg leading-relaxed text-white/65">Need help with a booking, a flight search, or a question before you travel? Reach out and our team will help you find the next step.</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
                  <p className="mt-2 text-sm font-bold leading-relaxed text-gray-900">{value}</p>
                </>
              )
              return (
                <article key={label} className="card p-6">
                  {href ? <a href={href} className="block hover:text-emerald-700 transition-colors">{content}</a> : content}
                </article>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
            <div className="card p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">Send us a message</h2>
                  <p className="text-sm text-gray-500">We will get back to you as soon as possible.</p>
                </div>
              </div>

              {status === 'sent' ? (
                <div className="py-8 px-4 text-center animate-fade-in bg-emerald-50/70 rounded-2xl border border-emerald-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out, <span className="font-bold text-gray-800">{formData.name}</span>. Your message has been sent successfully. Our support team will review it and reply to <span className="font-bold text-gray-800">{formData.email}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-primary inline-flex items-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" /> Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Name *</label>
                      <input
                        required
                        type="text"
                        className="input-field"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                      <input
                        required
                        type="email"
                        className="input-field"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="What can we help with?"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                    <textarea
                      required
                      className="input-field min-h-36 resize-y"
                      placeholder="Tell us a little more..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      disabled={status === 'sending'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <aside className="card p-5 sm:p-8 bg-[#10201e] text-white border-[#21413c]">
              <Clock3 className="w-6 h-6 text-emerald-300 mb-5" />
              <h2 className="text-xl font-black">Support hours</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">Our support team is available Monday through Saturday, 9am to 8pm.</p>
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-widest text-white/40">Prefer to start online?</p>
                <Link to="/" className="mt-3 inline-flex items-center text-sm font-bold text-emerald-300 hover:text-emerald-200">
                  Search available flights <span className="ml-2">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
