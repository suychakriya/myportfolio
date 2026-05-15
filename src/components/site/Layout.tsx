import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MoodProvider } from "@/lib/mood-context";
import { MoodToast } from "@/components/site/MoodToast";
import { MoodFAB } from "@/components/site/MoodFAB";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <MoodProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-700">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
        <MoodToast />
        <MoodFAB />
      </div>
    </MoodProvider>
  );
}
