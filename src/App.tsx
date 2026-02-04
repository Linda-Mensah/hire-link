import "./index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/shared/Layout";
import { JobListings } from "./components/candidate/JobListings";
import { ApplicationForm } from "./components/candidate/ApplicationForm";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ThankYouPage from "./components/candidate/ThankYouPage";
import InterviewScheduler from "./components/recruiter/InterviewScheduler";
import CandidateReview from "./components/recruiter/CandidateReview";
import OfferStage from "./components/recruiter/OfferStage";
import PipelineBoard from "./components/recruiter/PipelineBoard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50">
        <Routes>
          {/* Public Routes */}
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

          {/* Recruiter Routes */}
          <Route
            path="/recruiter"
            element={
              <Layout>
                <PipelineBoard />
              </Layout>
            }
          />
          <Route
            path="/recruiter/candidate/:candidateId"
            element={
              <Layout>
                <CandidateReview />
              </Layout>
            }
          />
          <Route
            path="/recruiter/schedule/:candidateId"
            element={
              <Layout>
                <InterviewScheduler />
              </Layout>
            }
          />
          <Route
            path="/recruiter/offer/:candidateId"
            element={
              <Layout>
                <OfferStage />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
  );
}

export default App;
