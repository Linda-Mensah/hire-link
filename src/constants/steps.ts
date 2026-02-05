import ExperienceStep from "../components/candidate/form-steps/ExperienceStep";
import PersonalInfoStep from "../components/candidate/form-steps/PersonalInfoStep";
import ResumeStep from "../components/candidate/form-steps/ResumeStep";

export const steps = [
  { title: "Personal Info", component: PersonalInfoStep },
  { title: "Experience", component: ExperienceStep },
  { title: "Resume", component: ResumeStep },
];
