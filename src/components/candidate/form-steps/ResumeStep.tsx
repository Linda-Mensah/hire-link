import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, FileText, CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import type { ApplicationFormData } from "../../../types";

const ResumeStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  const [fileName, setFileName] = useState("");

  const resumeFile = watch("resume");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      setValue("resume", file, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setFileName(file.name);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Resume Upload
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="resume">Upload Resume</Label>

          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />

            {resumeFile ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-emerald-500 mb-4" />
                <p className="font-medium">{fileName}</p>

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("resume")?.click()}
                >
                  Change File
                </Button>
              </div>
            ) : (
              <label htmlFor="resume" className="cursor-pointer">
                <Upload className="h-12 w-12 mb-4 text-stone-400" />
                <p>Click to upload</p>
              </label>
            )}
          </div>

          {errors.resume && (
            <p className="text-sm text-red-500">{errors.resume.message}</p>
          )}

          <input type="hidden" {...register("resume")} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeStep;
