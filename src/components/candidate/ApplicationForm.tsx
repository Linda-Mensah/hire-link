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

  // methods

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

  // get current step
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
      } else {
        await handleSubmit();
      }
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  // back to prev step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // handle form submit
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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">
          Job Not Found
        </h2>
        <p className="text-stone-600">
          The job you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">{job.title}</h1>
        <p className="text-stone-600">
          {job.location} • {job.department}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
        {/* progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${index <= currentStep ? "border-amber-600 bg-amber-600 text-white" : "border-stone-300 text-stone-400"}
                  ${index < currentStep ? "bg-amber-600" : ""}
                  font-medium
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
                  ml-2 font-medium
                  ${index <= currentStep ? "text-stone-800" : "text-stone-400"}
                `}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`
                    w-16 h-0.5 mx-4
                    ${index < currentStep ? "bg-amber-600" : "bg-stone-300"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className="mb-8">
              <CurrentStepComponent />
            </div>

            <div className="flex justify-between pt-6 border-t border-stone-200">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-colors
                  ${
                    currentStep === 0
                      ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }
                `}
              >
                <ArrowLeft className="inline h-4 w-4 mr-2" />
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Submit Application
                    <Check className="inline h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="inline h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ApplicationForm;
