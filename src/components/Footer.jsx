import { Plane, Phone, Mail, MapPin, Globe, MessageCircle, Camera, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white -rotate-45" />
              </div>
              <span className="text-xl font-bold text-white">FlightConnect</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Your trusted partner for seamless flight search and booking. Live prices, professional service, and real-time support.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Camera, LinkIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Search Flights', 'How It Works', 'About Us', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-5">Support</h3>
            <ul className="space-y-3">
              {['FAQs', 'Cancellation Policy', 'Refund Policy', 'Baggage Policy', 'Terms & Conditions', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">1800-001-234</p>
                  <p className="text-xs text-gray-500">Mon–Sat, 9am–8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">support@flightconnect.in</p>
                  <p className="text-xs text-gray-500">24hr email response</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400">New Delhi, India 110001</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 FlightConnect. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-50" />
            <span className="text-xs text-gray-600 ml-2">PCI-DSS Compliant · Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
