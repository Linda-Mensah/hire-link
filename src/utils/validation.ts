import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone number"),
});

export const experienceSchema = z.object({
  yearsOfExperience: z.number().min(0).max(50),
  skills: z
    .string()
    .min(10, "Please provide at least 10 characters describing your skills"),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const resumeSchema = z.object({
  resume: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    )
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "File must be PDF or DOC/DOCX",
    ),
});
