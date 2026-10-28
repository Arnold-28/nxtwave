import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SimulatedDataBanner } from './components/common/SimulatedDataBanner';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { ReferralPage } from './pages/ReferralPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { OverviewPage } from './pages/admin/OverviewPage';
import { RegistrationsPage } from './pages/admin/RegistrationsPage';
import { ChannelsPage } from './pages/admin/ChannelsPage';
import { AmbassadorsPage } from './pages/admin/AmbassadorsPage';
import { InsightsPage } from './pages/admin/InsightsPage';
import { PlannerPage } from './pages/admin/PlannerPage';
import { BudgetPage } from './pages/admin/BudgetPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Public Layout Wrapper with Nav & Footer
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SimulatedDataBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/r/:referralCode"
            element={
              <PublicLayout>
                <ReferralPage />
              </PublicLayout>
            }
          />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="registrations" element={<RegistrationsPage />} />
            <Route path="channels" element={<ChannelsPage />} />
            <Route path="ambassadors" element={<AmbassadorsPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="budget" element={<BudgetPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
