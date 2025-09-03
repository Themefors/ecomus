import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"

const navigationLinks = [
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Press", href: "/press" },
  { name: "Blog", href: "/blog" },
]

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Contact Us", href: "/contact" },
  { name: "Returns", href: "/returns" },
  { name: "Size Guide", href: "/size-guide" },
]

const paymentMethods = [
  { name: "Visa", src: "/visa-logo-generic.png" },
  { name: "Mastercard", src: "/mastercard-logo.png" },
  { name: "PayPal", src: "/paypal-logo.png" },
  { name: "Apple Pay", src: "/apple-pay-logo.png" },
  { name: "Google Pay", src: "src/assets/google-pay.png" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Top Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ecomus</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your trusted partner for sustainable and eco-friendly products. We're committed to providing
                high-quality items that make a positive impact on the environment.
              </p>
            </div>
          </div>

          {/* Center Column - Navigation & Support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Support</h4>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Newsletter</h4>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to get updates on new products and exclusive offers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">© 2025 Ecomus. All rights reserved.</div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 mr-2">We accept:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method) => (
                  <img
                    key={method.name}
                    src={method.src || "/placeholder.svg"}
                    alt={method.name}
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
