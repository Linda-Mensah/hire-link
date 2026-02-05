import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Eye,
  Calendar,
  Mail,
  ChevronRight,
  MoreVertical,
  User,
  FileText,
  Star,
  Phone,
} from "lucide-react";
import { useApplicationStore } from "../../stores/applicationStore";
import type { Candidate, StageType } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { STAGES } from "../../constants/stages";

const PipelineBoard: React.FC = () => {
  const getCandidatesByStage = useApplicationStore(
    (state) => state.getCandidatesByStage,
  );
  const updateCandidateStage = useApplicationStore(
    (state) => state.updateCandidateStage,
  );
  const applications = useApplicationStore((state) => state.applications);

  // const handleMoveCandidate = (candidateId: string, newStage: StageType) => {
  //   updateCandidateStage(candidateId, newStage);
  // };

  const getStageIndex = (stage: StageType): number => {
    return STAGES.findIndex((s) => s.id === stage);
  };

  // const canMoveBack = (candidate: Candidate): boolean => {
  //   const currentIndex = getStageIndex(candidate.stage);
  //   return currentIndex > 0;
  // };

  // const canMoveForward = (candidate: Candidate): boolean => {
  //   const currentIndex = getStageIndex(candidate.stage);
  //   return currentIndex < STAGES.length - 1;
  // };

  const moveToNextStage = (candidateId: string, currentStage: StageType) => {
    const currentIndex = getStageIndex(currentStage);
    if (currentIndex < STAGES.length - 1) {
      updateCandidateStage(candidateId, STAGES[currentIndex + 1].id);
    }
  };

  const moveToPrevStage = (candidateId: string, currentStage: StageType) => {
    const currentIndex = getStageIndex(currentStage);
    if (currentIndex > 0) {
      updateCandidateStage(candidateId, STAGES[currentIndex - 1].id);
    }
  };

  const getCandidateStageActions = (candidate: Candidate) => {
    const currentIndex = getStageIndex(candidate.stage);
    const actions = [];

    if (currentIndex > 0) {
      actions.push({
        label: `Move to ${STAGES[currentIndex - 1].title}`,
        stage: STAGES[currentIndex - 1].id,
        action: () => moveToPrevStage(candidate.id, candidate.stage),
      });
    }

    if (currentIndex < STAGES.length - 1) {
      actions.push({
        label: `Move to ${STAGES[currentIndex + 1].title}`,
        stage: STAGES[currentIndex + 1].id,
        action: () => moveToNextStage(candidate.id, candidate.stage),
      });
    }

    return actions;
  };

  const getScoreColor = (score?: number) => {
    if (!score) return "text-stone-500";
    if (score >= 4) return "text-emerald-600";
    if (score >= 3) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score?: number) => {
    if (!score) return "bg-stone-100";
    if (score >= 4) return "bg-emerald-100";
    if (score >= 3) return "bg-amber-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            Candidate Pipeline
          </h1>
          <p className="text-stone-600">
            Track and manage candidates through the hiring process
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-stone-700">
            <Users className="h-5 w-5" />
            <span className="font-medium">
              {applications.length} candidates
            </span>
          </div>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAGES.map((stage) => {
          const candidates = getCandidatesByStage(stage.id);

          return (
            <Card key={stage.id} className="border-stone-200 shadow-sm">
              <CardHeader className={`pb-3 ${stage.bgColor} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-lg font-semibold ${stage.color}`}>
                    {stage.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={`${stage.color} ${stage.bgColor} font-bold`}
                  >
                    {candidates.length}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                {candidates.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm text-stone-500">
                      No candidates in this stage
                    </p>
                  </div>
                ) : (
                  candidates.map((candidate) => {
                    const actions = getCandidateStageActions(candidate);

                    return (
                      <div
                        key={candidate.id}
                        className="group relative p-4 border border-stone-200 rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="h-4 w-4 text-stone-400 shrink-0" />
                              <Link
                                to={`/recruiter/candidate/${candidate.id}`}
                                className="font-medium text-stone-800 hover:text-amber-700 truncate"
                              >
                                {candidate.fullName}
                              </Link>
                            </div>

                            <div className="space-y-1 pl-6">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3 text-stone-400" />
                                <p className="text-sm text-stone-600 truncate">
                                  {candidate.email}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-stone-400" />
                                <p className="text-sm text-stone-600">
                                  {candidate.phone}
                                </p>
                              </div>
                            </div>
                          </div>

                          {candidate.score !== undefined && (
                            <Badge
                              variant="outline"
                              className={`${getScoreBgColor(candidate.score)} ${getScoreColor(candidate.score)} border-0 font-medium`}
                            >
                              <Star className="h-3 w-3 mr-1" />
                              {candidate.score}/5
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                          <div className="text-xs text-stone-500">
                            {candidate.yearsOfExperience} years exp
                          </div>

                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                  <Link
                                    to={`/recruiter/candidate/${candidate.id}`}
                                    className="cursor-pointer"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>

                                {candidate.stage !== "interview_scheduled" &&
                                  candidate.stage !== "offer_sent" && (
                                    <DropdownMenuItem asChild>
                                      <Link
                                        to={`/recruiter/schedule/${candidate.id}`}
                                        className="cursor-pointer"
                                      >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Schedule Interview
                                      </Link>
                                    </DropdownMenuItem>
                                  )}

                                {candidate.stage === "interview_scheduled" && (
                                  <DropdownMenuItem asChild>
                                    <Link
                                      to={`/recruiter/offer/${candidate.id}`}
                                      className="cursor-pointer"
                                    >
                                      <FileText className="h-4 w-4 mr-2" />
                                      Prepare Offer
                                    </Link>
                                  </DropdownMenuItem>
                                )}

                                <Separator className="my-1" />

                                {actions.map((action, idx) => (
                                  <DropdownMenuItem
                                    key={idx}
                                    onClick={action.action}
                                    className="cursor-pointer"
                                  >
                                    <ChevronRight className="h-4 w-4 mr-2" />
                                    {action.label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Skills preview */}
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-md truncate max-w-25"
                                title={skill}
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 bg-stone-100 text-stone-500 text-xs rounded-md">
                                +{candidate.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pipeline Stats */}
      <Card className="border-stone-200">
        <CardHeader>
          <CardTitle>Pipeline Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STAGES.map((stage) => {
              const candidates = getCandidatesByStage(stage.id);
              const percentage =
                applications.length > 0
                  ? Math.round((candidates.length / applications.length) * 100)
                  : 0;

              return (
                <div key={stage.id} className="text-center">
                  <div
                    className={`h-16 w-16 ${stage.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <span className={`text-2xl font-bold ${stage.color}`}>
                      {candidates.length}
                    </span>
                  </div>
                  <h3 className="font-medium text-stone-800 mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-stone-500">
                    {percentage}% of total
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-stone-200">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-lg">
              <div className="h-8 w-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-stone-800">
                  <span className="font-medium">Sarah Chen</span> applied for
                  Frontend Developer
                </p>
                <p className="text-xs text-stone-500">2 hours ago</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Applied
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-lg">
              <div className="h-8 w-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-stone-800">
                  Interview scheduled with{" "}
                  <span className="font-medium">Alex Johnson</span>
                </p>
                <p className="text-xs text-stone-500">Yesterday, 10:30 AM</p>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                Scheduled
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-lg">
              <div className="h-8 w-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-stone-800">
                  <span className="font-medium">Sam Smith</span> scored 5/5 by
                  hiring manager
                </p>
                <p className="text-xs text-stone-500">2 days ago</p>
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Reviewed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineBoard;
