import { useFormContext } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import type { ApplicationFormData } from "../../../types";

const PersonalInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">
          Personal Information
        </h2>
        <p className="text-stone-600">Tell us about yourself</p>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            <User className="inline h-4 w-4 mr-2 text-stone-400" />
            Full Name
          </label>

          <input
            type="text"
            {...register("personalInfo.fullName")}
            className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500
              ${errors.personalInfo?.fullName ? "border-red-300" : "border-stone-300"}
            `}
            placeholder="John Doe"
          />

          {errors.personalInfo?.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.personalInfo.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            <Mail className="inline h-4 w-4 mr-2 text-stone-400" />
            Email Address
          </label>

          <input
            type="email"
            {...register("personalInfo.email")}
            className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500
              ${errors.personalInfo?.email ? "border-red-300" : "border-stone-300"}
            `}
            placeholder="john@example.com"
          />

          {errors.personalInfo?.email && (
            <p className="mt-2 text-sm text-red-600">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            <Phone className="inline h-4 w-4 mr-2 text-stone-400" />
            Phone Number
          </label>

          <input
            type="tel"
            {...register("personalInfo.phone")}
            className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500
              ${errors.personalInfo?.phone ? "border-red-300" : "border-stone-300"}
            `}
            placeholder="+1234567890"
          />

          {errors.personalInfo?.phone && (
            <p className="mt-2 text-sm text-red-600">
              {errors.personalInfo.phone.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
