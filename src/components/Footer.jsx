import { Phone, Mail, MapPin, Globe, MessageCircle, Camera, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="flex-shrink-0 bg-gray-900 text-gray-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-black text-white">FareOracle</span>
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
              {[
                { label: 'Home', href: '/' },
                { label: 'Search Flights', href: '/#search' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">{link.label}</a>
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
                  <p className="text-sm text-white font-medium">Toll Free # +1 888 584 4337</p>
                  <p className="text-xs text-gray-500">Mon–Sat, 9am–8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">Info@fareoracle.com</p>
                  <p className="text-xs text-gray-500">24hr email response</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400">626 Wilshire Blvd Suite 410<br />Los Angeles, CA 90017</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 FareOracle. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="h-7 min-w-12 px-2 bg-white rounded-md flex items-center justify-center">
              <img src="https://cdn.simpleicons.org/visa/1A1F71" alt="Visa" className="h-4 w-auto" />
            </span>
            <span className="h-7 min-w-12 px-2 bg-white rounded-md flex items-center justify-center">
              <img src="https://cdn.simpleicons.org/mastercard/EB001B" alt="Mastercard" className="h-4 w-auto" />
            </span>
            <span className="text-xs text-gray-600 ml-2">PCI-DSS Compliant · Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
