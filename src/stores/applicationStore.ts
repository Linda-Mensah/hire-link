import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Candidate, Job, StageType } from "../types";

interface ApplicationStore {
  // Candidate state
  applications: Candidate[];
  currentApplication: Partial<Candidate> | null;

  // Recruiter state
  jobs: Job[];
  selectedCandidate: Candidate | null;

  // Actions
  submitApplication: (
    candidate: Omit<Candidate, "id" | "applicationDate" | "stage">,
  ) => string;
  updateCandidateStage: (candidateId: string, stage: StageType) => void;
  updateCandidateScore: (candidateId: string, score: number) => void;
  addNote: (candidateId: string, note: string) => void;
  scheduleInterview: (candidateId: string, date: string) => void;
  generateOffer: (candidateId: string) => void;

  // Getters
  getCandidatesByStage: (stage: StageType) => Candidate[];
  getJobById: (id: string) => Job | undefined;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      applications: [
        {
          id: "1",
          fullName: "Alex Johnson",
          email: "alex@example.com",
          phone: "+1234567890",
          yearsOfExperience: 3,
          skills: ["React", "TypeScript", "Node.js"],
          portfolioUrl: "https://alexjohnson.dev",
          applicationDate: "2024-01-10",
          stage: "applied",
          score: 4,
          notes: "Strong React skills, good communication",
        },
        {
          id: "2",
          fullName: "Sam Smith",
          email: "sam@example.com",
          phone: "+1234567891",
          yearsOfExperience: 5,
          skills: ["UX Design", "Figma", "User Research"],
          applicationDate: "2024-01-12",
          stage: "reviewed",
          score: 5,
          notes: "Excellent portfolio, senior level experience",
        },
      ],
      currentApplication: null,
      jobs: [],
      selectedCandidate: null,

      submitApplication: (candidateData) => {
        const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newCandidate: Candidate = {
          ...candidateData,
          id: applicationId,
          applicationDate: new Date().toISOString(),
          stage: "applied",
        };

        set((state) => ({
          applications: [...state.applications, newCandidate],
        }));

        return applicationId;
      },

      updateCandidateStage: (candidateId, stage) => {
        set((state) => ({
          applications: state.applications.map((candidate) =>
            candidate.id === candidateId ? { ...candidate, stage } : candidate,
          ),
        }));
      },

      updateCandidateScore: (candidateId, score) => {
        set((state) => ({
          applications: state.applications.map((candidate) =>
            candidate.id === candidateId ? { ...candidate, score } : candidate,
          ),
        }));
      },

      addNote: (candidateId, note) => {
        set((state) => ({
          applications: state.applications.map((candidate) =>
            candidate.id === candidateId
              ? { ...candidate, notes: note }
              : candidate,
          ),
        }));
      },

      scheduleInterview: (candidateId, date) => {
        set((state) => ({
          applications: state.applications.map((candidate) =>
            candidate.id === candidateId
              ? {
                  ...candidate,
                  interviewDate: date,
                  stage: "interview_scheduled",
                }
              : candidate,
          ),
        }));
      },

      generateOffer: (candidateId) => {
        const candidate = get().applications.find((c) => c.id === candidateId);
        if (candidate) {
          const offerLetter = `OFFER LETTER

Dear ${candidate.fullName},

We are pleased to offer you the position at our company.

Congratulations!

Sincerely,
The Hiring Team`;

          set((state) => ({
            applications: state.applications.map((c) =>
              c.id === candidateId
                ? { ...c, offerLetter, stage: "offer_sent" }
                : c,
            ),
          }));
        }
      },

      getCandidatesByStage: (stage) => {
        return get().applications.filter(
          (candidate) => candidate.stage === stage,
        );
      },

      getJobById: (id) => {
        return get().jobs.find((job) => job.id === id);
      },
    }),
    {
      name: "hirelink-storage",
    },
  ),
);
