import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";
import Header from "@/components/kindergarten/Header";
import Footer from "@/components/kindergarten/Footer";
import HeroSection from "@/components/kindergarten/sections/HeroSection";
import TrustSignals from "@/components/kindergarten/sections/TrustSignals";
import DirectorSection from "@/components/kindergarten/sections/DirectorSection";
import FeaturesSection from "@/components/kindergarten/sections/FeaturesSection";
import ProgramsSection from "@/components/kindergarten/sections/ProgramsSection";
import TestimonialsSection from "@/components/kindergarten/sections/TestimonialsSection";
import CTASection from "@/components/kindergarten/sections/CTASection";
import HomeGallerySection from "@/components/kindergarten/sections/HomeGallerySection";
import HomeNewsSection from "@/components/kindergarten/sections/HomeNewsSection";

interface GalleryItem {
  id: string;
  caption: string | null;
  url: string;
  category: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
}

export default function HomePage() {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    fetchGallery();
    fetchNews();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, caption, url, category")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setGalleryImages([]);
    } finally {
      setLoadingGallery(false);
    }
  };

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_updates")
        .select("id, title, content, image_url, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          کودکستان روما | پیش‌دبستانی پیش‌یک و پیش‌دو در مشهد
        </title>
        <meta
          name="description"
          content="کودکستان روما در مشهد با پذیرش کودکان ۳ تا ۷ سال (مختلط) در پایه‌های پیش‌یک و پیش‌دو، با کادری مجرب و برنامه‌های آموزشی استاندارد، محیطی امن، شاد و یادگیرنده فراهم کرده است. آدرس: مشهد، بلوار صیاد شیرازی، صیاد شیرازی ۸، صارمی ۴۹، سرو ۱۱. تلفن: ۰۹۱۵۵۱۰۹۲۶۹ - ۰۵۱۳۸۹۲۴۵۲۴."
        />
        <meta
          name="keywords"
          content="کودکستان روما, مهدکودک روما, پیش‌دبستانی مشهد, مهد کودک مشهد, پیش‌یک, پیش‌دو, مهد کودک ۳ تا ۷ سال, آی مث, رباتیک کودک, آموزش زبان انگلیسی کودکان, مهارت‌های زندگی"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://roma-kindergarten.ir" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="کودکستان روما | پیش‌دبستانی پیش‌یک و پیش‌دو در مشهد"
        />
        <meta
          property="og:description"
          content="پذیرش کودکان ۳ تا ۷ سال (مختلط) در پایه‌های پیش‌یک و پیش‌دو با برنامه‌های آموزشی استاندارد، کلاس‌های آی‌مث، رباتیک، زبان انگلیسی، مهارت‌های زندگی، نقاشی و قصه‌گویی در کودکستان روما مشهد."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80"
        />
        <meta property="og:url" content="https://roma-kindergarten.ir" />
        <meta property="og:locale" content="fa_IR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="کودکستان روما | پیش‌دبستانی مشهد"
        />
        <meta
          name="twitter:description"
          content="کودکستان روما با محیطی امن، شاد و استاندارد، پذیرای کودکان ۳ تا ۷ سال است."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white" dir="rtl">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <TrustSignals />
          <DirectorSection />
          <FeaturesSection />
          <HomeGallerySection images={galleryImages} loading={loadingGallery} />
          <ProgramsSection />
          {(loadingNews || news.length > 0) && (
            <HomeNewsSection news={news} loading={loadingNews} />
          )}
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
