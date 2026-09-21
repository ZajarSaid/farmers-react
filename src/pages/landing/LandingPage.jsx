import LandingNavbar from './LandingNavbar.jsx'
import HeroCarousel from './HeroCarousel.jsx'
import LandingFooter from './LandingFooter.jsx'
import { StatsSection, AboutSection, ServicesSection, HowItWorksSection, CtaBanner } from './LandingSections.jsx'

export default function LandingPage() {
  return (
    <div className="site">
      <LandingNavbar />
      <header>
        <HeroCarousel />
      </header>
      <main>
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <HowItWorksSection />
        <CtaBanner />
      </main>
      <LandingFooter />
    </div>
  )
}