import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { JOBS } from "../../constants/jobs";
import { useApplicationStore } from "../../stores/applicationStore";
import {
  personalInfoSchema,
  experienceSchema,
  resumeSchema,
} from "../../lib/validation";
import { steps } from "../../constants/steps";

const formSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: experienceSchema,
  resume: resumeSchema,
});

type FormData = z.infer<typeof formSchema>;

const ApplicationForm: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const submitApplication = useApplicationStore(
    (state) => state.submitApplication,
  );
  const [currentStep, setCurrentStep] = useState(0);

  const job = JOBS.find((j) => j.id === jobId);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
      },
      experience: {
        yearsOfExperience: 0,
        skills: "",
        portfolioUrl: "",
      },
      resume: null,
    },
    mode: "onChange",
  });

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = await methods.trigger("personalInfo");
        break;
      case 1:
        isValid = await methods.trigger("experience");
        break;
      case 2:
        isValid = await methods.trigger("resume");
        break;
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        // Scroll to top when changing steps
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await handleSubmit();
      }
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    try {
      const values = methods.getValues();

      const applicationId = submitApplication({
        fullName: values.personalInfo.fullName,
        email: values.personalInfo.email,
        phone: values.personalInfo.phone,
        yearsOfExperience: values.experience.yearsOfExperience,
        skills: values.experience.skills
          .split(",")
          .map((skill) => skill.trim()),
        portfolioUrl: values.experience.portfolioUrl || undefined,
      });

      toast.success("Application submitted successfully!");
      navigate(`/thank-you/${applicationId}`);
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      console.log(error);
    }
  };

  if (!job) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-stone-700 mb-4">
            Job Not Found
          </h2>
          <p className="text-stone-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </Link>
      </div>

      {/* Job Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2 break-words">
          {job.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-stone-600">
          <span className="inline-flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-2" />
            {job.location}
          </span>
          <span className="text-stone-300">•</span>
          <span>{job.department}</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Progress Steps - Redesigned for better responsiveness */}
        <div className="border-b border-stone-200 bg-stone-50/50">
          <div className="px-4 sm:px-6 py-4">
            {/* Desktop/Tablet Progress Steps */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <React.Fragment key={step.title}>
                    <div className="flex items-center">
                      <div
                        className={`
                          flex items-center justify-center w-10 h-10 rounded-full 
                          font-medium text-sm transition-all duration-200
                          ${
                            index <= currentStep
                              ? "bg-amber-600 text-white shadow-md"
                              : "bg-white border-2 border-stone-300 text-stone-500"
                          }
                        `}
                      >
                        {index < currentStep ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`
                          ml-3 font-medium text-sm hidden md:block
                          ${index <= currentStep ? "text-stone-800" : "text-stone-400"}
                        `}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`
                          flex-1 h-0.5 mx-4 transition-colors duration-200
                          ${index < currentStep ? "bg-amber-600" : "bg-stone-300"}
                        `}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile Progress Indicator */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-600">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium text-amber-600">
                  {steps[currentStep].title}
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`
                      text-xs font-medium
                      ${index <= currentStep ? "text-amber-600" : "text-stone-400"}
                    `}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div className="mb-8">
                <CurrentStepComponent />
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all duration-200
                    flex items-center justify-center order-2 sm:order-1
                    ${
                      currentStep === 0
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200 active:bg-stone-300"
                    }
                  `}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 
                           text-white font-medium rounded-lg transition-all duration-200
                           flex items-center justify-center order-1 sm:order-2
                           shadow-sm hover:shadow-md"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Submit Application
                      <Check className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
