// job
export type Job = {
  id: string;
  title: string;
  location: string;
  description: string;
  department: string;
  salaryRange: string;
  postedDate: string;
};

// candidate

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

// stage

export type StageType =
  | "applied"
  | "reviewed"
  | "interview_scheduled"
  | "offer_sent";

// app form data

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

// admin
export type Admin = {
  email: string;
  password: string;
};
