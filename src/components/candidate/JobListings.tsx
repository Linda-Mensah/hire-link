import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Briefcase, Banknote } from "lucide-react";
import { JOBS } from "../../constants/jobs";

export const JobListings: React.FC = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">
          Find Your Next Opportunity
        </h1>
        <p className="text-stone-600">
          Join our team and grow your career with us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {JOBS.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 hover-lift transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full mb-2">
                  {job.department}
                </span>
                <h3 className="text-xl font-semibold text-stone-800">
                  {job.title}
                </h3>
              </div>
              <Briefcase className="h-6 w-6 text-stone-400" />
            </div>

            <p className="text-stone-600 mb-6 line-clamp-3">
              {job.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-stone-700">
                <MapPin className="h-5 w-5 text-stone-400 mr-3" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-stone-700">
                <Banknote className="h-5 w-5 text-stone-400 mr-3" />
                <span>{job.salaryRange}</span>
              </div>
              <div className="flex items-center text-stone-700">
                <Calendar className="h-5 w-5 text-stone-400 mr-3" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>

            <Link
              to={`/apply/${job.id}`}
              className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Apply Now
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-stone-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Why Join Our Team?
          </h2>
          <p className="text-stone-600">
            We're building a diverse and inclusive workplace where everyone can
            thrive. We offer competitive compensation, flexible work
            arrangements, and opportunities for professional growth.
          </p>
        </div>
      </div>
    </div>
  );
};
