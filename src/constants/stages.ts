import type { StageType } from "../types";

// form stages
export const STAGES: {
  id: StageType;
  title: string;
  color: string;
  bgColor: string;
}[] = [
  {
    id: "applied",
    title: "Applied",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    id: "reviewed",
    title: "Reviewed",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  {
    id: "interview_scheduled",
    title: "Interview Scheduled",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  {
    id: "offer_sent",
    title: "Offer Sent",
    color: "text-emerald-700",
    bgColor: "bg-emerald-100",
  },
];
