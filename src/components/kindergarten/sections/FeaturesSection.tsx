import { Utensils, Languages, Camera, Heart, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Utensils,
    title: "تغذیه ارگانیک",
    description: "غذای سالم و ارگانیک با منوی متنوع هفتگی تحت نظر متخصص تغذیه",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Languages,
    title: "مربیان دوزبانه",
    description: "آموزش همزمان فارسی و انگلیسی با مربیان مجرب و دوزبانه",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Camera,
    title: "دوربین مداربسته",
    description: "نظارت ۲۴ ساعته با امکان مشاهده آنلاین برای والدین",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Heart,
    title: "مراقبت با عشق",
    description: "محیطی گرم و صمیمی با توجه ویژه به هر کودک",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Shield,
    title: "محیط امن",
    description: "استانداردهای بالای ایمنی و بهداشت در تمام فضاها",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Clock,
    title: "ساعات انعطاف‌پذیر",
    description: "برنامه‌ریزی متناسب با نیاز خانواده‌ها از ۷:۳۰ تا ۱۸:۰۰",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
            ویژگی‌های ما
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            چرا والدین <span className="text-sky-600">ما را انتخاب</span> می‌کنند؟
          </h2>
          <p className="text-gray-600">
            ما به بهترین‌ها برای فرزندان شما متعهد هستیم
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 bg-white"
            >
              <CardContent className="p-6">
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
