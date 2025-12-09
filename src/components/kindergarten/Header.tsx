import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "خانه", href: "/kindergarten" },
  { label: "برنامه‌ها", href: "/kindergarten/programs" },
  { label: "گالری", href: "/kindergarten/gallery" },
  { label: "تماس", href: "/kindergarten/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/kindergarten" className="flex items-center gap-3">
            <div className="relative h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🌻</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800">مهدکودک رُما</span>
              <span className="text-xs text-amber-600">Roma Kindergarten</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/kindergarten/login">
              <Button 
                size="lg" 
                className="gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold shadow-lg shadow-amber-200/50 transition-all hover:scale-105"
              >
                <User className="h-5 w-5" />
                ورود والدین
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="block py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors font-medium text-slate-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <Link to="/kindergarten/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold">
                  <User className="h-5 w-5" />
                  ورود والدین
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
