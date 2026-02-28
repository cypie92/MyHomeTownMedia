import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import NetworkMap from "@/components/NetworkMap";
import Services from "@/components/Services";
import WhyDifferent from "@/components/WhyDifferent";
import TrustedBy from "@/components/TrustedBy";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Stats />
      <About />
      <NetworkMap />
      <Services />
      <Team />
      <WhyDifferent />
      <TrustedBy />
      <Contact />
      <Footer />
    </>
  );
}
