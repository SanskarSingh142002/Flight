import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    body: `By accessing or using the FareOracle website (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, do not use the Service. FareOracle reserves the right to update or change these Terms at any time. Continued use of the Service after any such changes constitutes your acceptance of the new Terms.`,
  },
  {
    id: 'services',
    title: '2. Description of Services',
    body: `FareOracle provides a flight search and booking facilitation platform. We aggregate flight information from airlines and travel partners to help customers find and request flight bookings. FareOracle acts as an intermediary and does not operate flights. Final pricing, availability, and booking confirmation are subject to airline terms and real-time seat availability.`,
  },
  {
    id: 'eligibility',
    title: '3. Eligibility',
    body: `You must be at least 18 years of age to use this Service. By using FareOracle, you represent and warrant that you are 18 or older and have the legal capacity to enter into a binding agreement. You also confirm that all information you provide is accurate and complete.`,
  },
  {
    id: 'booking',
    title: '4. Booking & Payment',
    body: `All bookings made through FareOracle are subject to availability and airline confirmation. Prices displayed are estimates and may change. Once you submit a booking request, a FareOracle representative will contact you to finalize and confirm the booking. Payments are processed securely. FareOracle does not store full credit card details. All transactions are PCI-DSS compliant. We accept Visa and Mastercard.`,
  },
  {
    id: 'cancellation',
    title: '5. Cancellations & Refunds',
    body: `Cancellation and refund policies depend on the fare rules set by the operating airline. FareOracle will communicate applicable policies to you at the time of booking. In general: Non-refundable fares cannot be refunded once confirmed. Partially refundable or flexible fares may allow refunds subject to cancellation fees. Processing of refunds may take 7–14 business days depending on your bank or payment provider. To request a cancellation, contact our support team at Info@fareoracle.com or call +1 888 584 4337.`,
  },
  {
    id: 'changes',
    title: '6. Changes to Bookings',
    body: `Requests to change passenger names, dates, or routes after booking confirmation are subject to airline change fees and fare differences. FareOracle will assist in facilitating changes but cannot guarantee availability or waive airline-imposed fees. Please contact our support team as soon as possible if you need to make a change.`,
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    body: `FareOracle acts solely as a booking facilitator and is not liable for: Delays, cancellations, or changes initiated by airlines; Loss of baggage or personal belongings; Any injury, illness, or damage sustained during travel; Events of force majeure (natural disasters, strikes, pandemics, etc.). To the maximum extent permitted by law, FareOracle's total liability to you for any claim arising out of or in connection with the Service shall not exceed the amount you paid for the affected booking.`,
  },
  {
    id: 'privacy',
    title: '8. Privacy & Data',
    body: `Your personal information is collected and used in accordance with our Privacy Policy. By using FareOracle, you consent to the collection, processing, and storage of your data for the purpose of facilitating bookings and improving our Service. We do not sell your personal information to third parties. Data is shared only with airlines, payment processors, and service providers necessary to complete your booking.`,
  },
  {
    id: 'conduct',
    title: '9. User Conduct',
    body: `You agree not to: Use the Service for any unlawful purpose; Provide false or misleading information; Attempt to gain unauthorized access to our systems; Interfere with the normal operation of the Service; Scrape or harvest data from our platform without permission. Violations may result in immediate suspension or termination of your access.`,
  },
  {
    id: 'intellectual',
    title: '10. Intellectual Property',
    body: `All content on the FareOracle platform, including logos, graphics, text, and software, is the property of FareOracle or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
  },
  {
    id: 'governing',
    title: '11. Governing Law',
    body: `These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Los Angeles County, California.`,
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    body: `If you have any questions about these Terms and Conditions, please contact us:\n\nFareOracle\n626 Wilshire Blvd Suite 410\nLos Angeles, CA 90017\n\nEmail: Info@fareoracle.com\nPhone: Toll Free # +1 888 584 4337\nSupport Hours: Monday–Saturday, 9am–8pm PST`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#0d1716] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300 mb-5">Legal</p>
            <h1 className="max-w-3xl text-4xl sm:text-6xl font-black leading-tight">Terms & Conditions</h1>
            <p className="max-w-2xl mt-6 text-base sm:text-lg leading-relaxed text-white/65">
              Please read these terms carefully before using FareOracle. By booking a flight through our platform, you agree to the terms described below.
            </p>
            <p className="mt-4 text-sm text-white/40">Last updated: September 2026</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

            {/* Sidebar TOC — hidden on mobile, sticky on desktop */}
            <aside className="hidden lg:block sticky top-24 card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-gray-600 hover:text-emerald-700 py-1.5 border-l-2 border-transparent hover:border-emerald-600 pl-3 transition-all"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <article className="space-y-10">
              <div className="card p-6 sm:p-8 bg-emerald-50 border-emerald-200">
                <p className="text-sm leading-relaxed text-emerald-900">
                  <strong>Summary:</strong> FareOracle is a flight booking facilitator. We help you find and request flights. Your booking is subject to airline rules. By using our service, you accept these terms. For questions, contact us at{' '}
                  <a href="mailto:Info@fareoracle.com" className="underline hover:no-underline">Info@fareoracle.com</a>.
                </p>
              </div>

              {sections.map((s) => (
                <div key={s.id} id={s.id} className="card p-6 sm:p-8 scroll-mt-24">
                  <h2 className="text-xl font-black text-gray-900 mb-4">{s.title}</h2>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 whitespace-pre-line">{s.body}</p>
                </div>
              ))}

              <div className="card p-6 sm:p-8 bg-gray-900 text-white border-gray-800">
                <p className="text-sm text-gray-400 mb-4">Need help or have a question about these terms?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="tel:+18885844337"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                  >
                    +1 888 584 4337
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
