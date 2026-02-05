import type { StageType } from "../types";

export const getScoreColor = (score?: number) => {
  if (!score) return "text-stone-500";
  if (score >= 4) return "text-emerald-600";
  if (score >= 3) return "text-amber-600";
  return "text-red-600";
};

export const getScoreBgColor = (score?: number) => {
  if (!score) return "bg-stone-100";
  if (score >= 4) return "bg-emerald-100";
  if (score >= 3) return "bg-amber-100";
  return "bg-red-100";
};

export const getStageColors = (stageId: StageType) => {
  switch (stageId) {
    case "applied":
      return {
        bg: "bg-linear-to-b from-blue-50/80 to-blue-50/40",
        text: "text-blue-700",
        border: "border-blue-200",
        accent: "bg-blue-100",
      };
    case "reviewed":
      return {
        bg: "bg-gradient-to-b from-purple-50/80 to-purple-50/40",
        text: "text-purple-700",
        border: "border-purple-200",
        accent: "bg-purple-100",
      };
    case "interview_scheduled":
      return {
        bg: "bg-gradient-to-b from-amber-50/80 to-amber-50/40",
        text: "text-amber-700",
        border: "border-amber-200",
        accent: "bg-amber-100",
      };
    case "offer_sent":
      return {
        bg: "bg-gradient-to-b from-emerald-50/80 to-emerald-50/40",
        text: "text-emerald-700",
        border: "border-emerald-200",
        accent: "bg-emerald-100",
      };
    default:
      return {
        bg: "bg-gradient-to-b from-stone-50/80 to-stone-50/40",
        text: "text-stone-700",
        border: "border-stone-200",
        accent: "bg-stone-100",
      };
  }
};
