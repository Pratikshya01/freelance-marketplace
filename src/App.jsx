import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Layout components
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

// Page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import MyBids from "./pages/dashboard/MyBids";
import ActiveJobs from "./pages/dashboard/ActiveJobs";
import ClientDashboard from "./pages/client/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PostJob from "./pages/PostJob";
import JobDetailsPage from "./pages/JobDetailsPage";
// import Dashboard from "./pages/dashboard/Dashboard";
// import JobList from "./pages/jobs/JobList";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            className: '!bg-primary',
          },
          error: {
            className: '!bg-red-500',
          },
        }}
      />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="verify-email" element={<EmailVerification />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* Semi-public routes (accessible to both authenticated and non-authenticated users) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:id" element={<JobDetailsPage />} />
            
            {/* Protected routes that need layout */}
            <Route element={<ProtectedRoute />}>
              <Route path="post-job" element={<PostJob />} />
            </Route>
          </Route>

          {/* Protected routes without layout */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard routes */}
            <Route path="dashboard" element={<MyBids />} />
            <Route path="dashboard/bids" element={<MyBids />} />
            <Route path="dashboard/active-jobs" element={<ActiveJobs />} />
            <Route
              path="dashboard/profile"
              element={
                <DashboardLayout>
                  <Profile isClient={false} />
                </DashboardLayout>
              }
            />

            {/* Client dashboard routes */}
            <Route path="client/dashboard/*" element={<ClientDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
