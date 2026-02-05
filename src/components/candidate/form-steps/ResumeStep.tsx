import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResumeStep: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("resume.resume", file);
      setFileName(file.name);
    }
  };

  const resumeFile = watch("resume.resume");

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
          <Label htmlFor="resume">Upload Resume (PDF or DOC/DOCX)</Label>

          <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors">
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
                <p className="text-lg font-medium text-stone-800">{fileName}</p>
                <p className="text-sm text-stone-500 mt-1">
                  {(resumeFile as File).size / 1024 / 1024 > 1
                    ? `${((resumeFile as File).size / 1024 / 1024).toFixed(2)} MB`
                    : `${Math.round((resumeFile as File).size / 1024)} KB`}
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
              <label htmlFor="resume" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-stone-400 mb-4" />
                  <p className="text-lg font-medium text-stone-800 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-stone-500">
                    PDF or DOC/DOCX (Max 5MB)
                  </p>
                  <Button type="button" variant="outline" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              </label>
            )}
          </div>

          {errors.resume?.resume && (
            <p className="text-sm text-red-500 mt-2">
              {errors.resume.resume.message}
            </p>
          )}

          <input type="hidden" {...register("resume.resume")} />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">Resume Tips</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Make sure your contact information is up to date</li>
            <li>• Highlight relevant experience for this position</li>
            <li>• Include measurable achievements and results</li>
            <li>• Keep it concise (1-2 pages recommended)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeStep;
