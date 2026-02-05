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
            min={0}
            max={50}
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
            className={`min-h-[100px] ${
              errors.experience?.skills ? "border-red-500" : ""
            }`}
            placeholder="React, TypeScript, Project Management"
          />

          {errors.experience?.skills && (
            <p className="text-sm text-red-500">
              {errors.experience.skills.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioUrl">
            <LinkIcon className="inline h-4 w-4 mr-2" />
            Portfolio / Website
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

export default ExperienceStep;
