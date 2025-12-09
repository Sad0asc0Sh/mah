import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Calendar, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { formatJalaliDate } from "@/lib/jalali-date";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
  is_published: boolean;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              اخبار و اطلاعیه‌ها
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              آخرین <span className="text-amber-500">رویدادها</span>
            </h2>
          </div>
          <Link to="/kindergarten/news">
            <Button variant="outline" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 self-start md:self-auto">
              مشاهده همه اخبار
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">به زودی!</h3>
            <p className="text-slate-500">
              اخبار و اطلاعیه‌های مهدکودک به زودی در این بخش قرار می‌گیرد.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {item.image_url ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                    <Newspaper className="w-16 h-16 text-amber-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatJalaliDate(item.published_at)}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {item.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
