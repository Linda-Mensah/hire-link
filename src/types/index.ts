export type Job = {
  id: string;
  title: string;
  location: string;
  description: string;
  department: string;
  salaryRange: string;
  postedDate: string;
};

export type Candidate = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  skills: string[];
  portfolioUrl?: string;
  resumeUrl?: string;
  applicationDate: string;
  stage: StageType;
  score?: number;
  notes?: string;
  interviewDate?: string;
  offerLetter?: string;
};

export type StageType =
  | "applied"
  | "reviewed"
  | "interview_scheduled"
  | "offer_sent";

export type ApplicationFormData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  experience: {
    yearsOfExperience: number;
    skills: string;
    portfolioUrl?: string;
  };
  resume: File | null;
};
