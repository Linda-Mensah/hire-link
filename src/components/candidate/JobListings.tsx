import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Briefcase,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { JOBS } from "../../constants/jobs";

export const JobListings: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* header */}
      <div className="mb-8 sm:mb-12 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-3">
          Find Your Next Opportunity
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto sm:mx-0">
          Join our team and grow your career with us. We're always looking for
          talented individuals.
        </p>
      </div>

      {/* job grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {JOBS.map((job) => (
          <div
            key={job.id}
            className="group bg-white rounded-xl shadow-sm border border-stone-200 
                     hover:shadow-md transition-all duration-300 
                     hover:border-amber-200 overflow-hidden
                     flex flex-col"
          >
            {/* card header */}
            <div className="p-5 sm:p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block px-3 py-1 bg-amber-50 text-amber-700 
                                 text-xs font-medium rounded-full mb-3"
                  >
                    {job.department}
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-semibold text-stone-800 
                               leading-tight wrap-break-word pr-2"
                  >
                    {job.title}
                  </h3>
                </div>
                <Briefcase className="h-5 w-5 text-stone-400 shrink-0" />
              </div>

              <p className="text-stone-600 text-sm mb-5 line-clamp-3">
                {job.description}
              </p>

              {/* job details */}
              <div className="space-y-3">
                <div className="flex items-center text-stone-700 text-sm">
                  <MapPin className="h-4 w-4 text-stone-400 mr-3 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center text-stone-700 text-sm">
                  <Banknote className="h-4 w-4 text-stone-400 mr-3 shrink-0" />
                  <span className="truncate">{job.salaryRange}</span>
                </div>
                <div className="flex items-center text-stone-700 text-sm">
                  <Calendar className="h-4 w-4 text-stone-400 mr-3 shrink-0" />
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
            </div>

            {/* card footer */}
            <div className="p-5 sm:p-6 pt-0 sm:pt-0">
              <Link
                to={`/apply/${job.id}`}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white 
                         font-medium py-3 px-4 rounded-lg transition-all duration-200
                         flex items-center justify-center group-hover:shadow-md"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* why join us section */}
      <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-stone-200">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
            Why Join Our Team?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            We're building a diverse and inclusive workplace where everyone can
            thrive. We offer competitive compensation, flexible work
            arrangements, and opportunities for professional growth.
          </p>

          {/* benefits pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              "Competitive Salary",
              "Remote Work",
              "Health Insurance",
              "Growth Opportunities",
            ].map((benefit) => (
              <span
                key={benefit}
                className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
