import { Footer } from './components/layout/Footer'; 
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Philosophy } from './components/sections/Philosophy';
import { Services } from './components/sections/Services';
import { Visit } from './components/sections/Visit';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const mainRef = useReveal();

  return (
    <div
      ref={mainRef}
      id="top"
      className="max-w-[100vw] overflow-x-clip bg-surface text-text selection:bg-icicle"
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <About />
        <Experience />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
