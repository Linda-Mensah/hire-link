import React from "react";
import { useFormContext } from "react-hook-form";
import { Briefcase, Link as LinkIcon, Award } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ExperienceStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Experience & Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            type="number"
            min="0"
            max="50"
            {...register("experience.yearsOfExperience", {
              valueAsNumber: true,
            })}
            className={
              errors.experience?.yearsOfExperience ? "border-red-500" : ""
            }
          />
          {errors.experience?.yearsOfExperience && (
            <p className="text-sm text-red-500">
              {errors.experience.yearsOfExperience.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills & Expertise</Label>
          <Textarea
            id="skills"
            {...register("experience.skills")}
            placeholder="List your technical skills, soft skills, and areas of expertise (comma separated)"
            className={`min-h-[100px] ${errors.experience?.skills ? "border-red-500" : ""}`}
          />
          <p className="text-sm text-stone-500">
            Separate skills with commas (e.g., React, TypeScript, Project
            Management)
          </p>
          {errors.experience?.skills && (
            <p className="text-sm text-red-500">
              {errors.experience.skills.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioUrl">
            <LinkIcon className="inline h-4 w-4 mr-2" />
            Portfolio/Website URL (Optional)
          </Label>
          <Input
            id="portfolioUrl"
            type="url"
            {...register("experience.portfolioUrl")}
            placeholder="https://yourportfolio.com"
            className={errors.experience?.portfolioUrl ? "border-red-500" : ""}
          />
          {errors.experience?.portfolioUrl && (
            <p className="text-sm text-red-500">
              {errors.experience.portfolioUrl.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
