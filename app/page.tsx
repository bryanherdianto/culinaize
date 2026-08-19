"use client";

// components
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

// sections
import Hero from "../components/hero";
import AboutProduct from "../components/about-product";
import WhyChooseUs from "../components/why-choose-us";
import HowItWorks from "../components/how-it-works";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutProduct />
      <WhyChooseUs />
      <HowItWorks />
      <Footer />
    </>
  );
}
