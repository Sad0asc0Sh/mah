import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Sparkles, Star, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-amber-400/30 blur-3xl" />
      </div>
      
      {/* Floating stars */}
      <div className="absolute top-32 right-20 animate-float">
        <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
      </div>
      <div className="absolute top-40 left-32 animate-bounce-slow">
        <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
      </div>
      <div className="absolute bottom-40 right-1/4 animate-wiggle">
        <Sparkles className="w-8 h-8 text-amber-400/60" />
      </div>
      <div className="absolute top-1/3 left-16 animate-float" style={{ animationDelay: "1s" }}>
        <Rocket className="w-10 h-10 text-amber-400/50" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>پذیرش دانش‌آموز جدید آغاز شد!</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white">کودکی،</span>
              <br />
              <span className="text-amber-400">
                آغاز یک ماجراجویی
              </span>
              <br />
              <span className="text-white">بزرگ</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              در مهدکودک روما، هر روز یک ماجراجویی جدید است. ما با عشق و تخصص، 
              آینده‌سازان فردا را پرورش می‌دهیم.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/kindergarten/register">
                <Button 
                  size="lg" 
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-lg px-10 py-6 shadow-lg shadow-amber-400/30 transition-all hover:scale-105"
                >
                  پیش‌ثبت‌نام
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link to="/kindergarten/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-10 py-6 backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 ml-2" />
                  تماس با ما
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">+۱۵</div>
                <div className="text-sm text-slate-400 mt-1">سال تجربه</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">+۵۰۰</div>
                <div className="text-sm text-slate-400 mt-1">دانش‌آموز</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400">۹۸٪</div>
                <div className="text-sm text-slate-400 mt-1">رضایت والدین</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-amber-400/20">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80"
                alt="کودکان در حال بازی"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-400/30 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-amber-400/20 blur-3xl" />

            {/* Floating card */}
            <div className="absolute -bottom-4 lg:-right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
                <div>
                  <div className="font-bold text-white">یادگیری با بازی</div>
                  <div className="text-sm text-slate-300">روش‌های نوین آموزشی</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
