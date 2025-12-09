import { Check, Star } from "lucide-react";

const benefits = [
  "مربیان دارای مدرک تخصصی و تجربه کافی",
  "برنامه غذایی سالم و متنوع",
  "سرویس رفت و آمد اختصاصی",
  "کلاس‌های فوق‌برنامه رایگان",
  "گزارش‌دهی روزانه به والدین",
  "محیط بازی امن و استاندارد",
];

export default function WhyUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?w=400&q=80"
                  alt="کودکان در حال یادگیری"
                  className="rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=80"
                  alt="کلاس درس"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="mt-8">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80"
                  alt="بازی کودکان"
                  className="rounded-2xl shadow-lg h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 right-8 bg-white rounded-2xl p-4 shadow-xl border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold">۴.۹</span> از ۵
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                بر اساس نظر ۲۰۰+ والدین
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium">
              چرا ما؟
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              بهترین انتخاب برای{" "}
              <span className="text-amber-500">آینده فرزند</span> شما
            </h2>
            <p className="text-gray-600 text-lg">
              ما بیش از ۱۵ سال است که با عشق و تعهد به آموزش و پرورش کودکان مشغول هستیم. 
              هدف ما ایجاد محیطی است که کودکان در آن با شادی یاد بگیرند و رشد کنند.
            </p>

            {/* Benefits List */}
            <ul className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-sky-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">برترین مهدکودک</div>
                  <div className="text-xs text-gray-500">سال ۱۴۰۲</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-xl">📜</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">گواهی ISO</div>
                  <div className="text-xs text-gray-500">استاندارد بین‌المللی</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
