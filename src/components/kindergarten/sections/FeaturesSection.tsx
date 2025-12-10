import { Utensils, Languages, Camera, Heart, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Utensils,
    title: "برنامه تغذیه سالم و میان‌وعده مقوی",
    description:
      "صرف میان‌وعده‌های سالم و متنوع زیر نظر مربیان، با رعایت بهداشت و اصول تغذیه کودک، تا انرژی لازم برای بازی و یادگیری را داشته باشند.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Languages,
    title: "آموزش زبان انگلیسی به‌صورت جذاب",
    description:
      "آشنایی با واژگان و مکالمه‌های ساده انگلیسی از طریق بازی، آهنگ، شعر و فلش‌کارت برای ایجاد علاقه طبیعی به زبان دوم.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Camera,
    title: "گزارش تصویری از فعالیت‌های روزانه",
    description:
      "ثبت لحظات شیرین حضور کودکان در کلاس‌ها و کارگاه‌ها و اشتراک‌گذاری منظم در گالری و شبکه‌های ارتباطی با والدین.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Heart,
    title: "محیطی شاد، امن و سرشار از محبت",
    description:
      "تمرکز بر عزت‌نفس، احترام متقابل و ایجاد احساس تعلق؛ هر کودک در روما دیده می‌شود و مهم است.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Shield,
    title: "ایمنی و نظارت دقیق",
    description:
      "فضای استاندارد، کنترل ورود و خروج، نظارت مداوم مربیان و رعایت اصول ایمنی برای آرامش خاطر والدین.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Clock,
    title: "ساعت کاری مناسب والدین شاغل",
    description:
      "پذیرش از ساعت ۶:۳۰ تا ۱۵:۳۰ با برنامه‌های هدفمند، تا فرزندتان در تمام این زمان در محیطی امن و آموزشی باشد.",
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
            ویژگی‌های متمایز کودکستان روما
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            آنچه روما را از سایر مهدکودک‌ها متفاوت می‌کند
          </h2>
          <p className="text-gray-600">
            ترکیب محیطی امن و شاد، کادر مجرب و برنامه‌های استاندارد، روما را به
            انتخابی مطمئن برای سال‌های طلایی کودکی تبدیل کرده است.
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
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
