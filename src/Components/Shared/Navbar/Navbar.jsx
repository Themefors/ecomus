"use client"

import { useState, useEffect } from "react"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import axios from "axios"
import Link from "next/link"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
]

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logo, setLogo] = useState({ url: "", width: 120 }) // Default logo object

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get("/api/general-settings")
        if (res.data.logo) {
          setLogo({
            url: res.data.logo.url || "",
            width: res.data.logo.width || 120,
          })
        }
      } catch (error) {
        console.error("Error fetching logo:", error)
      }
    }
    fetchLogo()
  }, [])

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                {logo.url ? (
                  <img
                    src={logo.url}
                    alt="Logo"
                    style={{ width: `${logo.width}px`, height: "auto" }}
                  />
                ) : (
                  <span className="text-xl font-bold">Ecomus</span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
                <User className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2" autoFocus />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
