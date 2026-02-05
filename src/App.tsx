import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/shared/Layout";
import { JobListings } from "./components/candidate/JobListings";
import ThankYouPage from "./components/candidate/ThankYouPage";
import InterviewScheduler from "./components/recruiter/InterviewScheduler";
import CandidateReview from "./components/recruiter/CandidateReview";
import OfferStage from "./components/recruiter/OfferStage";
import PipelineBoard from "./components/recruiter/PipelineBoard";
import AdminLoginPage from "./components/pages/AdminLoginPage";
import { useAuthStore } from "./stores/authStore";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import ApplicationForm from "./components/candidate/ApplicationForm";

const RecruiterRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/admin-login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route
        path="/"
        element={
          <Layout>
            <JobListings />
          </Layout>
        }
      />
      <Route
        path="/apply/:jobId"
        element={
          <Layout>
            <ApplicationForm />
          </Layout>
        }
      />
      <Route
        path="/thank-you/:applicationId"
        element={
          <Layout>
            <ThankYouPage />
          </Layout>
        }
      />

      {/* admin login */}
      <Route path="/admin-login" element={<AdminLoginPage />} />

      {/* protected admin routes */}
      <Route
        path="/recruiter"
        element={
          <RecruiterRoute>
            <Layout>
              <PipelineBoard />
            </Layout>
          </RecruiterRoute>
        }
      />
      <Route
        path="/recruiter/candidate/:candidateId"
        element={
          <RecruiterRoute>
            <Layout>
              <CandidateReview />
            </Layout>
          </RecruiterRoute>
        }
      />
      <Route
        path="/recruiter/schedule/:candidateId"
        element={
          <RecruiterRoute>
            <Layout>
              <InterviewScheduler />
            </Layout>
          </RecruiterRoute>
        }
      />
      <Route
        path="/recruiter/offer/:candidateId"
        element={
          <RecruiterRoute>
            <Layout>
              <OfferStage />
            </Layout>
          </RecruiterRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-stone-50">
          <AppRoutes />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
