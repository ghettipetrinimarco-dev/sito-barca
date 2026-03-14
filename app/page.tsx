import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Watersports from "./components/Watersports";
import CruisePlan from "./components/CruisePlan";
import VentumStory from "./components/VentumStory";
import CaptainMarco from "./components/CaptainMarco";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#0b0e14" }}>
      <Navigation />
      <Hero />
      <Services />
      <Watersports />
      <CruisePlan />
      <VentumStory />
      <CaptainMarco />
      <Contact />
      <Footer />
    </main>
  );
}
