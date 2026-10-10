import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Hero } from "./components/sections/Hero";
import { Philosophy } from "./components/sections/Philosophy";
import { SeoLocalStrip } from "./components/sections/SeoLocalStrip";
import { Services } from "./components/sections/Services";
import { Visit } from "./components/sections/Visit";
import { PackagesSection } from "./components/packages/PackagesSection";
import { useReveal } from "./hooks/useReveal";
import { TreatmentsPage } from "./pages/TreatmentsPage";

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <PackagesSection />
      <SeoLocalStrip />
      <Philosophy />
      <About />
      <Experience />
      <Visit />
    </main>
  );
}

function Shell() {
  const mainRef = useReveal();

  return (
    <div
      ref={mainRef}
      id="top"
      className="max-w-[100vw] overflow-x-clip bg-surface text-text selection:bg-icicle"
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<TreatmentsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>
  );
}
