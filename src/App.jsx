import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FarmersProvider } from './context/FarmersContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import Layout from './components/layout/Layout.jsx'
import Toaster from './components/Toaster.jsx'
import { RequireAdmin, RequireAuth } from './components/guards.jsx'
import LandingPage from './pages/landing/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import FarmersPage from './pages/FarmersPage.jsx'
import FarmerDetailsPage from './pages/FarmerDetailsPage.jsx'
import FarmsPage from './pages/FarmsPage.jsx'
import CropsPage from './pages/CropsPage.jsx'
import RegionalPricesPage from './pages/RegionalPricesPage.jsx'
import OutputVerificationPage from './pages/OutputVerificationPage.jsx'
import ProductionPage from './pages/ProductionPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import FarmerLayout from './pages/portal/FarmerLayout.jsx'
import FarmerHome from './pages/portal/FarmerHome.jsx'
import FarmerHistory from './pages/portal/FarmerHistory.jsx'
import FarmerPrices from './pages/portal/FarmerPrices.jsx'
import FarmerRegisterFarm from './pages/portal/FarmerRegisterFarm.jsx'
import FarmerProfile from './pages/portal/FarmerProfile.jsx'
import FarmerPassword from './pages/portal/FarmerPassword.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <FarmersProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<RequireAuth><FarmerLayout /></RequireAuth>}>
                <Route path="/me" element={<FarmerHome />} />
                <Route path="/me/history" element={<FarmerHistory />} />
                <Route path="/me/prices" element={<FarmerPrices />} />
                <Route path="/me/register-farm" element={<FarmerRegisterFarm />} />
                <Route path="/me/profile" element={<FarmerProfile />} />
                <Route path="/me/password" element={<FarmerPassword />} />
              </Route>

              <Route element={<RequireAdmin><Layout /></RequireAdmin>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/farmers" element={<FarmersPage />} />
                <Route path="/farmers/:id" element={<FarmerDetailsPage />} />
                <Route path="/farms" element={<FarmsPage />} />
                <Route path="/crops" element={<CropsPage />} />
                <Route path="/regional-prices" element={<RegionalPricesPage />} />
                <Route path="/output-verification" element={<OutputVerificationPage />} />
                <Route path="/production" element={<ProductionPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/profile" element={<FarmerProfile />} />
                <Route path="/password" element={<FarmerPassword />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
          </FarmersProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}