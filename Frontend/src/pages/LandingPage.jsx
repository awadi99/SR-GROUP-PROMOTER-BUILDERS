import React from 'react';
import Navbar from '../components/common/Navbar'; // Update path as needed
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import ProjectGrid from '../components/landing/ProjectGrid';
import Amenities from '../components/landing/Amenities';
import AboutUs from '../components/landing/AboutUs';
import ContactUs from '../components/landing/ContactUs';
import OurTeams from '../components/landing/OurTeams';
import Footer from '../components/common/Footer';
import FAQ from '../components/landing/FAQ';

export default function LandingPage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      {/* Navbar is added here */}
      <Navbar />
      
      <Hero />
      
      <div> 
        <Stats />
        <ProjectGrid />
        <Amenities />
        <AboutUs/>
        <OurTeams />
        <FAQ/>
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
}