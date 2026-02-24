import Navbar from "@/components/Navbar";
import PhotoSection from "@/components/PhotoSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

function Divider() {
  return (
    <div className="max-w-content mx-auto px-6" aria-hidden>
      <p className="text-[#1e1e1e] text-xs text-center tracking-widest select-none leading-none py-2">
        ···············································
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E8E8E8]">
      <Navbar />
      <PhotoSection />
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <EducationSection />
      <Divider />
      <ExperienceSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
