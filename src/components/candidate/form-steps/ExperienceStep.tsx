import { useFormContext } from "react-hook-form";
import { Briefcase, Link as LinkIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import type { ApplicationFormData } from "../../../types";

const ExperienceStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader className="px-0 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Briefcase className="h-5 w-5 text-amber-600" />
          Experience & Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 sm:px-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience" className="text-stone-700">
            Years of Experience
          </Label>

          <Input
            id="yearsOfExperience"
            type="number"
            min={0}
            max={50}
            step="0.5"
            {...register("experience.yearsOfExperience", {
              valueAsNumber: true,
            })}
            className={`
              w-full transition-all
              ${
                errors.experience?.yearsOfExperience
                  ? "border-red-300 focus:ring-red-500"
                  : "focus:ring-amber-500"
              }
            `}
          />

          {errors.experience?.yearsOfExperience && (
            <p className="text-sm text-red-600">
              {errors.experience.yearsOfExperience.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills" className="text-stone-700">
            Skills & Expertise
          </Label>

          <Textarea
            id="skills"
            {...register("experience.skills")}
            className={`
              w-full min-h-[120px] transition-all
              ${
                errors.experience?.skills
                  ? "border-red-300 focus:ring-red-500"
                  : "focus:ring-amber-500"
              }
            `}
            placeholder="React, TypeScript, Project Management, UI/UX Design"
          />

          {errors.experience?.skills && (
            <p className="text-sm text-red-600">
              {errors.experience.skills.message}
            </p>
          )}
          <p className="text-xs text-stone-500 mt-1">
            Separate skills with commas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioUrl" className="text-stone-700">
            <LinkIcon className="inline h-4 w-4 mr-2" />
            Portfolio / Website
          </Label>

          <Input
            id="portfolioUrl"
            type="url"
            {...register("experience.portfolioUrl")}
            placeholder="https://yourportfolio.com"
            className={`
              w-full transition-all
              ${
                errors.experience?.portfolioUrl
                  ? "border-red-300 focus:ring-red-500"
                  : "focus:ring-amber-500"
              }
            `}
          />

          {errors.experience?.portfolioUrl && (
            <p className="text-sm text-red-600">
              {errors.experience.portfolioUrl.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceStep;
