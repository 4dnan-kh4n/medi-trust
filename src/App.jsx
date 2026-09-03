import { Route, Routes, useParams } from 'react-router-dom'
import Home from './pages/Home/Home'
import DoctorProfile from './pages/DoctorProfile/DoctorProfile'
import ExploreDoctors from './pages/ExploreDoctors/ExploreDoctors'
import PhasePreview from './pages/PhasePreview'
import SmoothScroll from './components/common/SmoothScroll'
import ScrollToTop from './components/common/ScrollToTop'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminDoctors from './pages/AdminDoctors'
import AdminDoctorForm from './pages/AdminDoctorForm'
import AdminFacilities from './pages/AdminFacilities'
import AdminFacilityForm from './pages/AdminFacilityForm'
import AdminSpecialities from './pages/AdminSpecialities'
import AdminSpecialityForm from './pages/AdminSpecialityForm'
import AdminCorrections from './pages/AdminCorrections'
import AdminVerifications from './pages/AdminVerifications'
import AdminReviews from './pages/AdminReviews'
import LegalPage from './pages/LegalPage'

function CitySpecialityPage() {
  const { city, speciality } = useParams()
  return <ExploreDoctors key={`city-${city}-${speciality}`} citySlug={city} specialitySlug={speciality} />
}

function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<ExploreDoctors key="explore" initialPath="search" />} />
      <Route path="/speciality-guide" element={<ExploreDoctors key="speciality-guide" initialPath="guide" />} />
      <Route path="/doctors/:city/:speciality" element={<CitySpecialityPage />} />
      <Route path="/doctors/:doctorSlug" element={<DoctorProfile />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/doctors" element={<AdminDoctors />} />
      <Route path="/admin/doctors/new" element={<AdminDoctorForm />} />
      <Route path="/admin/doctors/:id" element={<AdminDoctorForm />} />
      <Route path="/admin/facilities/:type" element={<AdminFacilities />} />
      <Route path="/admin/facilities/:type/new" element={<AdminFacilityForm />} />
      <Route path="/admin/facilities/:type/:id" element={<AdminFacilityForm />} />
      <Route path="/admin/specialities" element={<AdminSpecialities />} />
      <Route path="/admin/specialities/new" element={<AdminSpecialityForm />} />
      <Route path="/admin/specialities/:id" element={<AdminSpecialityForm />} />
      <Route path="/admin/corrections" element={<AdminCorrections />} />
      <Route path="/admin/verifications" element={<AdminVerifications />} />
      <Route path="/admin/reviews" element={<AdminReviews />} />
      <Route path="/privacy" element={<LegalPage documentKey="privacy" />} />
      <Route path="/terms" element={<LegalPage documentKey="terms" />} />
      <Route path="/disclaimer" element={<LegalPage documentKey="disclaimer" />} />
      <Route path="*" element={<PhasePreview title="This page is being prepared" />} />
      </Routes>
    </>
  )
}

export default App
