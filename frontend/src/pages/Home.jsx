import Hero from '../components/home/Hero.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import Features from '../components/home/Features.jsx';
import Statistics from '../components/home/Statistics.jsx';
import FAQ from '../components/home/FAQ.jsx';
import CTA from '../components/home/CTA.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Statistics />
      <FAQ />
      <CTA />
    </>
  );
}
