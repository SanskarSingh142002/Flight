import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, FileText, CheckCircle, AlertTriangle, Phone, Mail,
  Plane, Clock, DollarSign, HelpCircle, ArrowRight, BookOpen,
  Scale, Globe, Briefcase, RefreshCw
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sections = [
  {
    id: 'agency-role',
    title: '1. Travel Agency & Intermediary Role',
    icon: Briefcase,
    summary: 'FareOracle acts as an independent travel agency and booking intermediary between you and the operating airline.',
    body: `FareOracle ("we", "our", "us") operates as an independent online travel agency (OTA) and flight booking facilitator. We connect consumers and corporate travelers with airline inventory through Global Distribution Systems (GDS), airline aggregators, and consolidator networks.

IMPORTANT NOTICE: FareOracle does not operate any aircraft, schedule flights, or manage airport ground services. When you book a flight through our platform, two distinct contracts are created:
1. A service agreement with FareOracle for search, reservation handling, ticketing assistance, and customer support.
2. A Contract of Carriage directly between you (the passenger) and the operating airline(s).

All flights, baggage handling, boarding procedures, in-flight services, and carriage conditions are strictly governed by the respective airline's Conditions of Carriage and applicable international treaties (such as the Warsaw Convention or Montreal Convention).`,
  },
  {
    id: 'pricing-fares',
    title: '2. Live Fares, Price Fluctuations & Quote Validity',
    icon: DollarSign,
    summary: 'Airfares fluctuate in real time and are guaranteed only after payment clearance and official e-ticket issuance.',
    body: `Flight fares and seat inventory are determined directly by airlines and dynamic yield management systems. As a result:
• Displayed Prices: Prices shown during search are real-time estimates based on available airline tariffs at that exact moment.
• Fare Changes Prior to Ticketing: Until full payment is successfully processed and the airline issues a confirmed Electronic Ticket (E-Ticket) and Passenger Name Record (PNR), airfares are subject to change without prior notice.
• Taxes & Government Fees: All quoted fares include applicable airport departure taxes, security charges, and government fees unless explicitly stated otherwise.
• Currency: Transactions are processed in the currency indicated on the checkout page (primarily USD / INR). International credit cards may incur foreign exchange or cross-border conversion fees from your card issuer.`,
  },
  {
    id: 'ticketing-names',
    title: '3. Ticketing, PNR Issuance & Name Accuracy Policy',
    icon: CheckCircle,
    summary: 'Names must match your passport/government ID exactly. Airlines strictly prohibit ticket transfers.',
    body: `Upon completing your booking and payment:
1. Booking Reference: You will receive an initial FareOracle confirmation reference while our ticketing desk processes the reservation with the airline.
2. Official Airline PNR & E-Ticket: Once finalized, an official 6-character Airline PNR and 13-digit e-ticket number will be issued.

PASSENGER NAME REQUIREMENT (CRITICAL):
• The first name, middle name (if applicable), and last name entered during booking must match the government-issued photo ID or passport used for travel EXACTLY.
• Airline regulations strictly forbid transferring tickets to another individual or changing passenger names after ticket issuance.
• Minor corrections (such as typos of 1–3 letters) are subject to airline approval, may require substantial airline administrative fees, or may necessitate ticket re-issuance at current market rates. FareOracle is not liable for denied boarding resulting from misspelled passenger details.`,
  },
  {
    id: 'cancellations-refunds',
    title: '4. Cancellations, Refunds & Agency Service Fees',
    icon: RefreshCw,
    summary: 'Refund eligibility is governed by airline tariff rules. Agency processing fees apply to voluntary cancellations.',
    body: `Cancellation and refund terms depend strictly on the fare category chosen (Non-Refundable, Partially Refundable, or Flexible):

• Non-Refundable Fares: Most discounted economy tickets are 100% non-refundable under airline tariff rules. Only unused statutory airport taxes may be eligible for recovery, subject to airline policy.
• Refundable Fares: If your ticket allows cancellation, the refund amount will equal the total fare paid minus:
  1. Airline-imposed cancellation penalties.
  2. FareOracle administrative processing fee ($35–$50 USD per passenger).
• Refund Processing Timeline: Once approved by the airline, refunds are credited back to the original method of payment within 7 to 21 business days, depending on banking institutions.
• Void Window: Certain tickets may be eligible for same-day cancellation within 24 hours of booking, subject to specific airline rules and agency void service charges.
• Involuntary Airline Cancellations: If the operating airline cancels or significantly delays your flight, FareOracle will assist you in applying for a full airline refund or rebooking on an alternative flight in accordance with the airline's policy and consumer protection guidelines.`,
  },
  {
    id: 'changes-rescheduling',
    title: '5. Date Changes, Route Modifications & No-Show Policy',
    icon: Clock,
    summary: 'Date changes are subject to airline penalty fees plus fare difference. No-shows forfeit ticket value.',
    body: `If your travel plans change:
• Voluntary Flight Changes: Requests to alter travel dates, times, or routes must be submitted at least 24 hours before original scheduled departure.
• Cost Calculation: Date change costs consist of:
  [Airline Change Penalty] + [Fare & Tax Difference between old and new flight] + [FareOracle Reissuance Fee].
  If the new flight fare is higher than the original, the passenger must pay the difference. If the new fare is lower, residual values are subject to airline rules.
• NO-SHOW POLICY (VERY IMPORTANT):
  If you fail to check in or board your flight without canceling your reservation prior to the scheduled departure time, the airline will categorize your booking as a "No-Show". In almost all cases, airlines immediately forfeit the entire value of no-show tickets, cancel all subsequent connecting/return legs, and deny any refund or rebooking.`,
  },
  {
    id: 'baggage-ancillary',
    title: '6. Baggage Allowances & Special Airline Services',
    icon: Plane,
    summary: 'Cabin and checked baggage limits are determined solely by operating airlines and fare class.',
    body: `Baggage policies vary significantly between carriers, routes, and cabin classes:
• Checked & Cabin Baggage: Your booking confirmation details the standard baggage allowance included with your fare. Any excess weight or additional pieces will incur excess baggage fees charged directly by the airline at the airport.
• Basic Economy / Low-Cost Carriers: Many low-cost carriers (e.g., IndiGo, SpiceJet, Ryanair) or basic economy fares do not include checked luggage or carry-on overhead space.
• Special Assistance & Ancillaries: Seat assignments, pre-ordered meals, wheelchair assistance, infant bassinets, and pet carriage requests can be requested through FareOracle, but their ultimate fulfillment remains at the sole discretion of the operating carrier.`,
  },
  {
    id: 'travel-documents',
    title: '7. Passports, Visas, Health & Entry Requirements',
    icon: Globe,
    summary: 'Passengers hold 100% responsibility for valid passports, transit visas, and health paperwork.',
    body: `It is the sole responsibility of each individual passenger to ensure compliance with all international travel documentation:
• Passport Validity: For international travel, passports must typically be valid for at least six (6) months beyond your planned return date, with sufficient blank visa pages.
• Visas & Transit Visas: Many flight routes include intermediate stops or airport changes that require transit visas, ESTA, or entry clearance, even if you do not leave the airport.
• Health & Vaccinations: Passengers must comply with all mandatory health declarations, vaccination requirements, and destination entry regulations.
• Denied Boarding: FareOracle cannot verify individual visa eligibility. We accept zero liability if an airline or border authority refuses boarding or entry due to inadequate documentation. No refunds will be issued under such circumstances.`,
  },
  {
    id: 'payments-security',
    title: '8. Payment Security, Credit Card Authorization & Fraud Verification',
    icon: Shield,
    summary: 'Payments are processed securely via PCI-DSS standards. We verify cardholder identity to prevent fraud.',
    body: `To protect both travelers and our platform against unauthorized credit card transactions:
• Security Standards: All card transactions are encrypted using TLS/SSL and processed through PCI-DSS compliant merchant gateways. FareOracle never stores complete credit card CVV numbers.
• Cardholder Authorization: By providing payment credentials, you confirm that you are the authorized cardholder or have express legal permission from the cardholder to complete the purchase.
• Fraud Screening & Verification: For high-value, last-minute, or international transactions, FareOracle's fraud prevention team may require additional verification (such as government photo ID or cardholder confirmation) before releasing e-tickets. If verification is not provided, the reservation may be cancelled and refunded.
• Chargeback Protection: In the event of an unjustified chargeback or payment dispute for a validly ticketed and confirmed flight, the customer agrees to reimburse FareOracle for the full fare amount plus applicable chargeback administrative fees.`,
  },
  {
    id: 'liability-limits',
    title: '9. Limitation of Liability & Force Majeure',
    icon: Scale,
    summary: 'FareOracle is not liable for airline operational delays, weather disruptions, or events beyond control.',
    body: `To the maximum extent permitted by applicable law:
• Operational Disruptions: FareOracle shall not be held liable for flight delays, route cancellations, lost or damaged baggage, overbooking, mechanical breakdowns, airport strikes, or changes to aircraft type executed by airlines.
• Force Majeure: Neither FareOracle nor the airline shall be held responsible for failure to perform travel services resulting from unforeseen events beyond reasonable control, including but not limited to acts of God, severe weather events, volcanic ash, pandemics, civil unrest, war, airspace closures, or government quarantine mandates.
• Cap on Liability: Under all circumstances, FareOracle's aggregate legal liability arising out of or related to any booking shall be capped strictly at the agency service fee received by FareOracle for that specific booking.`,
  },
  {
    id: 'privacy-conduct',
    title: '10. Privacy, Data Protection & User Conduct',
    icon: FileText,
    summary: 'Your personal data is encrypted and shared only with necessary travel providers and airlines.',
    body: `Your privacy is critically important to us:
• Data Sharing for Travel: In order to issue tickets, we transmit essential passenger data (name, date of birth, passport numbers, contact info) to airlines, Global Distribution Systems, and border control agencies.
• We Do Not Sell Data: FareOracle does not sell or rent customer personal information to third-party advertisers.
• Prohibited Use: Users agree not to use our platform for fraudulent bookings, screen scraping, automated crawling, or unauthorized commercial exploitation. Violators are subject to legal action and immediate termination of access.`,
  },
  {
    id: 'disputes-law',
    title: '11. Governing Law & Dispute Resolution',
    icon: AlertTriangle,
    summary: 'Disputes are resolved through friendly negotiation or binding arbitration under governing law.',
    body: `These Terms and Conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.

Any dispute, controversy, or claim arising out of or relating to your flight booking that cannot be resolved informally through our customer relations department shall be submitted to binding arbitration in Los Angeles County, California, or another mutually agreed jurisdiction.`,
  },
  {
    id: 'agency-contact',
    title: '12. Agency Contact Details & Support Desk',
    icon: Phone,
    summary: 'Our professional travel concierge team is available 24/7 to assist with your bookings.',
    body: `For booking inquiries, ticket modifications, cancellation requests, or legal notices, please reach out to our dedicated operations desk:

FareOracle Travel Services
626 Wilshire Blvd, Suite 410
Los Angeles, CA 90017, United States

• Customer Support Email: Info@fareoracle.com
• Toll-Free Phone: +1 888 584 4337
• Booking Support Hours: 24/7 Online Concierge
• Administrative Hours: Monday – Saturday, 9:00 AM – 8:00 PM PST`,
  },
]

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#0a1514] via-[#0e1d1c] to-[#122422] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6">
              <Scale className="w-3.5 h-3.5" />
              Travel Agency & Booking Agreement
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl">
              Terms & Conditions
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Please review these terms carefully before submitting your flight booking request. By booking tickets through FareOracle, you agree to our travel agency terms, airline carriage regulations, and fare policies.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/50 border-t border-white/10 pt-6">
              <span>Effective: September 2026</span>
              <span>•</span>
              <span>Governing: Passenger & Agency Facilitation</span>
              <span>•</span>
              <span>Support: 24/7 Customer Care</span>
            </div>
          </div>
        </section>

        {/* Agency Highlights Banner */}
        <section className="bg-emerald-900/10 border-b border-emerald-900/20 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Authorized Agency', desc: 'Accredited airline booking partner' },
                { label: 'Live GDS Fares', desc: 'Real-time airline seat inventory' },
                { label: 'Secure Payments', desc: 'PCI-DSS encrypted card checkout' },
                { label: 'Dedicated Concierge', desc: 'Assistance before & after travel' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">{item.label}</p>
                    <p className="text-[11px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">

            {/* Sidebar TOC */}
            <aside className="hidden lg:block sticky top-24 card p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Contents</p>
              </div>
              <nav className="space-y-1">
                {sections.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="group flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-emerald-700 py-1.5 border-l-2 border-transparent hover:border-emerald-600 pl-2.5 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </a>
                  )
                })}
              </nav>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                  Have a question regarding airline tariff rules or cancellation requests?
                </p>
                <a
                  href="tel:+18885844337"
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +1 888 584 4337
                </a>
              </div>
            </aside>

            {/* Content Sections */}
            <article className="space-y-8">
              {/* Executive Summary Card */}
              <div className="card p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/20">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-emerald-950 mb-1">Key Summary for Travelers</h2>
                    <p className="text-xs sm:text-sm text-emerald-800/90 leading-relaxed">
                      FareOracle is an independent travel agency facilitating flight bookings with global airlines. Your contract of carriage is directly with the operating airline. All cancellations, baggage allowances, date changes, and flight schedules are subject to airline fare conditions and governmental civil aviation rules. For queries, contact us 24/7 at{' '}
                      <a href="mailto:Info@fareoracle.com" className="font-semibold underline text-emerald-950 hover:text-emerald-700">
                        Info@fareoracle.com
                      </a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections list */}
              {sections.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.id}
                    id={s.id}
                    className="card p-6 sm:p-8 scroll-mt-24 border border-gray-200/90 hover:border-emerald-200 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-emerald-700" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                        {s.title}
                      </h2>
                    </div>

                    {s.summary && (
                      <p className="text-xs font-semibold text-emerald-800/80 bg-emerald-50/70 border border-emerald-100 rounded-lg px-3 py-2 mb-4">
                        💡 {s.summary}
                      </p>
                    )}

                    <div className="text-xs sm:text-sm leading-relaxed text-gray-600 whitespace-pre-line space-y-2">
                      {s.body}
                    </div>
                  </div>
                )
              })}

              {/* Help & Contact Banner */}
              <div className="card p-6 sm:p-8 bg-[#0e1d1c] text-white border-white/10 shadow-xl">
                <div className="max-w-xl">
                  <h3 className="text-lg font-bold text-white mb-2">Need Assistance or clarification on these terms?</h3>
                  <p className="text-xs sm:text-sm text-white/70 mb-6 leading-relaxed">
                    Our ticketing operations desk is available round-the-clock to guide you through airline policies, ticket re-issuance, and travel advisories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl transition-all text-xs shadow-lg shadow-emerald-950/40"
                    >
                      <span>Contact Support</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="tel:+18885844337"
                      className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl transition-all text-xs border border-white/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>+1 888 584 4337</span>
                    </a>
                  </div>
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
