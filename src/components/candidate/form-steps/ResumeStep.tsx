import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, FileText, CheckCircle, X } from "lucide-react";

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
      // check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setValue("resume", file, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setValue("resume", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setFileName("");
    // reset file input
    const fileInput = document.getElementById("resume") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader className="px-0 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-5 w-5 text-amber-600" />
          Resume Upload
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 sm:px-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="resume" className="text-stone-700">
            Upload Resume (PDF, DOC, DOCX - Max 5MB)
          </Label>

          <div
            className={`
            border-2 border-dashed rounded-xl p-6 sm:p-8 text-center
            transition-all duration-200
            ${
              errors.resume
                ? "border-red-300 bg-red-50"
                : "border-stone-300 hover:border-amber-400 hover:bg-amber-50/50"
            }
          `}
          >
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />

            {resumeFile ? (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mb-4" />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-stone-100 transition-colors"
                  >
                    <X className="h-4 w-4 text-stone-500" />
                  </button>
                </div>

                <p className="font-medium text-stone-800 break-all max-w-full px-4">
                  {fileName}
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

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
              <label htmlFor="resume" className="cursor-pointer block">
                <Upload className="h-12 w-12 mx-auto mb-4 text-stone-400" />
                <p className="font-medium text-stone-700 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-stone-500">
                  PDF, DOC, DOCX up to 5MB
                </p>
              </label>
            )}
          </div>

          {errors.resume && (
            <p className="text-sm text-red-600">{errors.resume.message}</p>
          )}

          <input type="hidden" {...register("resume")} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeStep;
