import { Award, Trophy, Sparkles } from "lucide-react";

export default function DirectorSection() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Director Message */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              سخن مدیر
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              پیام مدیریت کودکستان روما
            </h2>
            <p className="text-slate-600 leading-relaxed">
              به عنوان مدیر مجموعه آموزشی کودکستان روما افتخار دارم اعلام کنم که ما
              با بهره‌گیری از کادری مجرب، محیطی ایمن و برنامه‌های آموزشی استاندارد،
              آماده همراهی با فرزندان عزیز شما در پایه‌های پیش‌یک و پیش‌دو هستیم.
            </p>
            <p className="text-slate-600 leading-relaxed">
              هدف ما تنها آموزش مهارت‌های اولیه نیست؛ بلکه تلاش می‌کنیم کودکان در
              محیطی شاد، پویا و محبت‌آمیز، مهارت‌های اجتماعی، خلاقیت، اعتمادبه‌نفس
              و آمادگی تحصیلی واقعی را تجربه کنند.
            </p>
            <p className="text-slate-600 leading-relaxed">
              در مجموعه ما، هر کودک با توجه به توانایی‌ها و روحیات خود دیده می‌شود و
              یادگیری در قالب بازی، کارگاه‌های خلاق، فعالیت‌های گروهی و برنامه‌های
              تقویت مهارت‌های فردی شکل می‌گیرد.
            </p>
            <p className="text-slate-600 leading-relaxed">
              از شما دعوت می‌کنم برای بازدید از محیط مجموعه و آشنایی نزدیک با
              برنامه‌های آموزشی ما، با دفتر کودکستان تماس بگیرید. با افتخار، میزبان
              آینده‌سازان سرزمینمان خواهیم بود.
            </p>
            <div className="pt-2 text-sm text-slate-500">
              <p className="font-semibold text-slate-700">
                مدیریت: سرکار خانم سیاحی
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              افتخارات و رزومه مجموعه
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              فعالیت‌های آموزشی و مهارتی در روما تنها در سطح کلاس باقی نمی‌ماند؛
              کودکان ما توانسته‌اند در عرصه‌های مختلف بدرخشند و افتخارآفرینی کنند.
            </p>
            <ul className="space-y-5 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">
                    افتخارآفرینی در مسابقات شطرنج
                  </p>
                  <p className="leading-relaxed">
                    کودکان با شرکت در دوره‌های تخصصی شطرنج و با هدایت مربی مجرب
                    مجموعه، موفق به کسب مقام‌های برتر در مسابقات گروهی و انفرادی
                    شده‌اند. این موفقیت‌ها نتیجه تمرکز بر تقویت مهارت‌های فکری، حل
                    مسئله و اعتماد‌به‌نفس کودکان است.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">
                    موفقیت در دوره‌های آی‌مث و کسب مقام‌های استانی و کشوری
                  </p>
                  <p className="leading-relaxed">
                    نوآموزان ما در دوره‌های آی‌مث، با روش‌های نوین آموزش ریاضی آشنا
                    می‌شوند و بارها توانسته‌اند رتبه‌های ممتاز در ارزیابی‌ها و
                    آزمون‌های آی‌مث کسب کنند. یادگیری مفاهیم پایه‌ای ریاضی در روما
                    به شکلی جذاب، مؤثر و استاندارد انجام می‌شود.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">
                    حضور فعال در برنامه‌ها و جشنواره‌های آموزشی و مهارتی
                  </p>
                  <p className="leading-relaxed">
                    با برگزاری کارگاه‌ها، جشنواره‌های داخلی، پروژه‌های خلاقانه و
                    فعالیت‌های گروهی، بستری فراهم شده تا کودکان بتوانند استعدادهای
                    واقعی خود را نشان دهند و موفقیت‌های قابل‌توجهی کسب کنند.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
