import FeaturedProfiles from '../../components/home/FeaturedProfiles'
import Faq from '../../components/home/Faq'
import Hero from '../../components/home/Hero'
import HowItWorks from '../../components/home/HowItWorks'
import ReviewFeedback from '../../components/home/ReviewFeedback'
import Specialities from '../../components/home/Specialities'
import TrustSection from '../../components/home/TrustSection'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import Seo from '../../components/common/Seo'

function Home() {
  const structuredData = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'mediTrust', url: window.location.origin, description: 'Find clearer professional information for doctors and care categories.', potentialAction: { '@type': 'SearchAction', target: `${window.location.origin}/explore?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }
  return <><Seo title="mediTrust — Find doctors with more clarity" description="Search doctor profiles by name, speciality, city, and appointment method. mediTrust presents clearly labelled professional information." structuredData={structuredData} /><Header /><main><Hero /><Specialities /><HowItWorks /><TrustSection /><FeaturedProfiles /><ReviewFeedback /><Faq /></main><Footer /></>
}

export default Home
