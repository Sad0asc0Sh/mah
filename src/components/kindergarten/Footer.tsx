import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  MessageCircle,
  Heart 
} from "lucide-react";

const quickLinks = [
  { label: "خانه", href: "/kindergarten" },
  { label: "ورود والدین", href: "/kindergarten/login" },
  { label: "گالری", href: "/kindergarten/gallery" },
  { label: "تماس با ما", href: "/kindergarten/contact" },
];

const programs = [
  { label: "پیش‌دبستانی", href: "/kindergarten/programs/preschool" },
  { label: "خلاقیت و هنر", href: "/kindergarten/programs/creativity" },
  { label: "ورزش و بازی", href: "/kindergarten/programs/sports" },
  { label: "زبان انگلیسی", href: "/kindergarten/programs/english" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🌻</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">مهدکودک رُما</span>
                <span className="text-xs text-amber-400">Roma Kindergarten</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ما با عشق و تعهد، محیطی امن و شاد برای رشد و یادگیری کودکان شما فراهم می‌کنیم. 
              هر کودک برای ما یک ستاره است.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition-colors text-slate-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition-colors text-slate-400"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">برنامه‌های آموزشی</h3>
            <ul className="space-y-2">
              {programs.map((program) => (
                <li key={program.label}>
                  <Link
                    to={program.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">اطلاعات تماس</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، کوچه گل‌ها، پلاک ۱۲</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <span>info@roma-kindergarten.ir</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <span>شنبه تا چهارشنبه: ۷:۳۰ - ۱۸:۰۰</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p className="flex items-center gap-1">
              ساخته شده با <Heart className="h-4 w-4 text-red-500 fill-red-500" /> در تهران
            </p>
            <p>
              © ۱۴۰۳ مهدکودک رُما. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
