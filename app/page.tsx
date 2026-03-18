import Navigation from "./components/Navigation";
import CustomScrollbar from "./components/CustomScrollbar";
import ScrollReset from "./components/ScrollReset";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import Yacht from "./components/Yacht";
import Services from "./components/Services";
import CruisePlan from "./components/CruisePlan";
import CruisePlans from "./components/CruisePlans";
import VentumStory from "./components/VentumStory";
import CaptainMarco from "./components/CaptainMarco";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)" }}>
      <CustomScrollbar />
      <ScrollReset />
      <ScrollToTop />
      <Navigation />
      <Hero />
      <Yacht />
      <Services />
      <CruisePlan />
      <CruisePlans />
      <VentumStory />
      <CaptainMarco />
      <Contact />
      <Footer />
    </main>
  );
}
