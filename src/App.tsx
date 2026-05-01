import { AIAgent } from "./components/site/AIAgent";
import { Catalog } from "./components/site/Catalog";
import { Contact } from "./components/site/Contact";
import { Footer } from "./components/site/Footer";
import { HeroSlider } from "./components/site/HeroSlider";
import { Navbar } from "./components/site/Navbar";
import { Portfolio } from "./components/site/Portfolio";
import { Process } from "./components/site/Process";
import { Services } from "./components/site/Services";
import { Stats } from "./components/site/Stats";
import { WhatsAppFab } from "./components/site/WhatsAppFab";


export default function App() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSlider />
      <Services />
      <Stats />
      <Process />
      <Portfolio />
      <Catalog />
      <Contact />
      <Footer />
      <AIAgent />
      <WhatsAppFab />
    </main>
  );
}