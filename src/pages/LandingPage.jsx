import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import StatsBanner from '../components/landing/StatsBanner'
import DesignExperienceShowcase from '../components/landing/DesignExperienceShowcase'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import AIBuilderShowcase from '../components/landing/AIBuilderShowcase'
import CustomerJourneyTimeline from '../components/landing/CustomerJourneyTimeline'
import DemoSplitView from '../components/landing/DemoSplitView'
import DesignStudioFeatures from '../components/landing/DesignStudioFeatures'
import CostEstimationSection from '../components/landing/CostEstimationSection'
import ProcurementHub from '../components/landing/ProcurementHub'
import ConstructionTracker from '../components/landing/ConstructionTracker'
import SmartHomeSection from '../components/landing/SmartHomeSection'
import TrustSignals from '../components/landing/TrustSignals'
import { FinalCTA, Footer } from '../components/landing/FinalCTA'
import StickyCTA from '../components/landing/StickyCTA'

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBanner />
      <DesignExperienceShowcase />
      <HowItWorksSection />
      <AIBuilderShowcase />
      <CustomerJourneyTimeline />
      <DemoSplitView />
      <DesignStudioFeatures />
      <CostEstimationSection />
      <ProcurementHub />
      <ConstructionTracker />
      <SmartHomeSection />
      <TrustSignals />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </div>
  )
}
