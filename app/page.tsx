// app/page.tsx
export const dynamic = 'force-dynamic';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProductsSection from '@/components/products-section';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import BetaForm from '@/components/beta-form';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <BetaForm />
      <Footer />
    </main>
  );
}