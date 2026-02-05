// CandidateReview.tsx - improved styling
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Mail, Phone, Star, FileText, Briefcase } from "lucide-react";
import { useApplicationStore } from "../../stores/applicationStore";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const CandidateReview: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const { applications, updateCandidateScore, addNote } = useApplicationStore();
  const [score, setScore] = useState<number>(3);
  const [notes, setNotes] = useState<string>("");

  const candidate = applications.find((app) => app.id === candidateId);

  if (!candidate) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="h-24 w-24 rounded-full bg-linear-to-br from-stone-100 to-stone-50 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm">
          <FileText className="h-12 w-12 text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-3">
          Candidate Not Found
        </h2>
        <p className="text-stone-600 mb-8 max-w-md">
          The candidate you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="rounded-lg px-6">
          <Link to="/recruiter">Back to Pipeline</Link>
        </Button>
      </div>
    );
  }

  const handleSaveScore = () => {
    updateCandidateScore(candidateId!, score);
    toast.success("Score updated successfully");
  };

  const handleSaveNotes = () => {
    addNote(candidateId!, notes);
    toast.success("Notes saved successfully");
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "applied":
        return "bg-linear-to-r from-blue-50 to-blue-100 text-blue-800 ring-1 ring-blue-200";
      case "reviewed":
        return "bg-linear-to-r from-purple-50 to-purple-100 text-purple-800 ring-1 ring-purple-200";
      case "interview_scheduled":
        return "bg-linear-to-r from-amber-50 to-amber-100 text-amber-800 ring-1 ring-amber-200";
      case "offer_sent":
        return "bg-linear-to-r from-emerald-50 to-emerald-100 text-emerald-800 ring-1 ring-emerald-200";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeInUp">
      {/* header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-0">
        <div className="space-y-2">
          <Link
            to="/recruiter"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors group"
          >
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              ←
            </div>
            Back to Pipeline
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-linear-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
              Candidate Review
            </h1>
            <Badge
              className={`
                text-sm font-semibold px-4 py-1.5 rounded-full
                ${getStageColor(candidate.stage)}
              `}
            >
              {candidate.stage.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-linear-to-r from-amber-50 to-amber-50/50 px-5 py-3 rounded-xl ring-1 ring-amber-200">
          <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
          <div>
            <div className="text-2xl font-bold text-amber-900">
              {candidate.score || "—"}
            </div>
            <div className="text-xs text-amber-700 font-medium">SCORE /5</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* candidate info card */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Candidate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 bg-linear-to-br from-stone-50 to-white rounded-lg ring-1 ring-stone-100">
                  <div className="flex items-center gap-3 text-stone-700">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-500">
                        Experience
                      </div>
                      <p className="text-lg font-semibold text-stone-800">
                        {candidate.yearsOfExperience} years
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-linear-to-br from-stone-50 to-white rounded-lg ring-1 ring-stone-100">
                  <div className="flex items-center gap-3 text-stone-700">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-500">
                        Email
                      </div>
                      <p className="text-lg font-semibold text-stone-800 truncate">
                        {candidate.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-linear-to-br from-stone-50 to-white rounded-lg ring-1 ring-stone-100">
                  <div className="flex items-center gap-3 text-stone-700">
                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-500">
                        Phone
                      </div>
                      <p className="text-lg font-semibold text-stone-800">
                        {candidate.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {candidate.portfolioUrl && (
                  <div className="space-y-3 p-4 bg-linear-to-br from-stone-50 to-white rounded-lg ring-1 ring-stone-100">
                    <div className="flex items-center gap-3 text-stone-700">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-stone-500">
                          Portfolio
                        </div>
                        <a
                          href={candidate.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 font-semibold underline decoration-amber-300 hover:decoration-amber-400 transition-colors"
                        >
                          View Portfolio
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* skills */}
              <div>
                <h3 className="font-semibold text-stone-800 mb-4 text-lg">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {candidate.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-linear-to-br from-stone-50 to-white border-stone-200 text-stone-700 px-4 py-2 rounded-lg font-medium hover:border-amber-300 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* previous notes */}
              {candidate.notes && (
                <div className="pt-4 border-t border-stone-100">
                  <h3 className="font-semibold text-stone-800 mb-4 text-lg">
                    Previous Notes
                  </h3>
                  <div className="bg-linear-to-br from-stone-50 to-white rounded-xl p-5 ring-1 ring-stone-100">
                    <p className="text-stone-700 leading-relaxed">
                      {candidate.notes}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* scoring section */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Scoring & Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              {/* star rating */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-stone-700">
                  Rate this candidate (1-5)
                </Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-linear-to-br from-amber-50/50 to-amber-50/30 rounded-xl ring-1 ring-amber-200">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setScore(star)}
                        className="focus:outline-none transform transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`h-10 w-10 ${
                            star <= score
                              ? "text-amber-500 fill-amber-500"
                              : "text-stone-300"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-900">
                        {score}
                      </div>
                      <div className="text-sm text-amber-700 font-medium">
                        out of 5
                      </div>
                    </div>
                    <Button
                      onClick={handleSaveScore}
                      className="rounded-lg px-6 bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600"
                    >
                      Save Score
                    </Button>
                  </div>
                </div>
              </div>

              {/* notes */}
              <div className="space-y-4">
                <Label
                  htmlFor="notes"
                  className="text-lg font-medium text-stone-700"
                >
                  Add Evaluation Notes
                </Label>
                <div className="space-y-4">
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your detailed evaluation notes here... Consider experience, skills, cultural fit, and any concerns."
                    className="min-h-35 p-4 border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 rounded-xl text-stone-700 placeholder:text-stone-400"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveNotes}
                      className="rounded-lg px-8 bg-linear-to-r from-stone-800 to-stone-700 hover:from-stone-900 hover:to-stone-800"
                    >
                      Save Notes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* right column */}
        <div className="space-y-6">
          {/* actions card */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Candidate Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Button
                asChild
                className="w-full rounded-lg h-12 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                <Link to={`/recruiter/schedule/${candidate.id}`}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-lg h-12 border-stone-300 hover:border-amber-400 hover:bg-amber-50"
              >
                <Link to={`/recruiter/offer/${candidate.id}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Prepare Offer
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full rounded-lg h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Reject Candidate
              </Button>
            </CardContent>
          </Card>

          {/* application details */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="flex justify-between items-center py-2.5 border-b border-stone-100 last:border-0">
                <span className="text-stone-600 font-medium">Applied on</span>
                <span className="font-semibold text-stone-800">
                  {new Date(candidate.applicationDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-100 last:border-0">
                <span className="text-stone-600 font-medium">
                  Application ID
                </span>
                <code className="text-sm font-mono text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                  {candidate.id.slice(0, 8)}
                </code>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-stone-100 last:border-0">
                <span className="text-stone-600 font-medium">Status</span>
                <Badge
                  variant="outline"
                  className="border-stone-200 bg-stone-50 text-stone-700 font-medium"
                >
                  {candidate.stage.replace("_", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateReview;
