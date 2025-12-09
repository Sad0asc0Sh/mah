import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-pink-50" dir="rtl">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
