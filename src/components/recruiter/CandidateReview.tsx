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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">
          Candidate Not Found
        </h2>
        <p className="text-stone-600">
          The candidate you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-4">
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to="/recruiter"
            className="text-amber-700 hover:text-amber-800 mb-2 inline-flex items-center"
          >
            ← Back to Pipeline
          </Link>
          <h1 className="text-3xl font-bold text-stone-800">
            Candidate Review
          </h1>
        </div>

        <Badge
          className={`
          text-sm font-medium px-4 py-2
          ${
            candidate.stage === "applied"
              ? "bg-blue-100 text-blue-800"
              : candidate.stage === "reviewed"
                ? "bg-purple-100 text-purple-800"
                : candidate.stage === "interview_scheduled"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800"
          }
        `}
        >
          {candidate.stage.replace("_", " ").toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Candidate Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Candidate Information</span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 mr-1" />
                  <span className="font-bold text-xl">
                    {candidate.score || "Not scored"}
                  </span>
                  <span className="text-stone-500 ml-1">/5</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-stone-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {candidate.yearsOfExperience} years
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-stone-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-lg">{candidate.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-stone-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">Phone</span>
                  </div>
                  <p className="text-lg">{candidate.phone}</p>
                </div>

                {candidate.portfolioUrl && (
                  <div className="space-y-2">
                    <div className="flex items-center text-stone-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="font-medium">Portfolio</span>
                    </div>
                    <a
                      href={candidate.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 underline"
                    >
                      View Portfolio
                    </a>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium text-stone-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="bg-stone-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {candidate.notes && (
                <div>
                  <h3 className="font-medium text-stone-800 mb-3">
                    Previous Notes
                  </h3>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <p className="text-stone-700">{candidate.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scoring Section */}
          <Card>
            <CardHeader>
              <CardTitle>Scoring & Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-4 block">Rate this candidate (1-5)</Label>
                <div className="flex items-center space-x-6">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setScore(star)}
                        className="text-2xl focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= score
                              ? "text-amber-500 fill-amber-500"
                              : "text-stone-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-lg font-semibold">
                    <span className="text-amber-600">{score}</span>
                    <span className="text-stone-500">/5</span>
                  </div>
                  <Button onClick={handleSaveScore}>Save Score</Button>
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="mb-3 block">
                  Add Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your evaluation notes here..."
                  className="min-h-[120px]"
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link to={`/recruiter/schedule/${candidate.id}`}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link to={`/recruiter/offer/${candidate.id}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Prepare Offer
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Reject Candidate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-stone-600">Applied on</span>
                <span className="font-medium">
                  {new Date(candidate.applicationDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Application ID</span>
                <code className="text-sm font-mono text-amber-600">
                  {candidate.id}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Stage</span>
                <Badge variant="outline">{candidate.stage}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateReview;
