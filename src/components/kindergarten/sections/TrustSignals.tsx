import { Utensils, Camera, Languages } from "lucide-react";

const signals = [
  {
    icon: Utensils,
    title: "تغذیه زیر نظر متخصص",
    description: "منوی غذایی سالم و متنوع با نظارت کارشناس تغذیه",
    color: "bg-amber-400",
  },
  {
    icon: Camera,
    title: "امنیت و نظارت تصویری",
    description: "دوربین مداربسته با امکان مشاهده آنلاین برای والدین",
    color: "bg-slate-700",
  },
  {
    icon: Languages,
    title: "رویکرد دوزبانه",
    description: "آموزش همزمان فارسی و انگلیسی با مربیان مجرب",
    color: "bg-amber-400",
  },
];

export default function TrustSignals() {
  return (
    <section className="py-6 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div
                className={`w-14 h-14 ${signal.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <signal.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{signal.title}</h3>
                <p className="text-sm text-gray-500">{signal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
