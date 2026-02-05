import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Eye,
  Calendar,
  Mail,
  MoreVertical,
  User,
  FileText,
  Star,
  Phone,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Clock,
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
import {
  getScoreBgColor,
  getScoreColor,
  getStageColors,
} from "../../constants/pipelineColors";

const PipelineBoard: React.FC = () => {
  const getCandidatesByStage = useApplicationStore(
    (state) => state.getCandidatesByStage,
  );
  const updateCandidateStage = useApplicationStore(
    (state) => state.updateCandidateStage,
  );
  const applications = useApplicationStore((state) => state.applications);

  const getStageIndex = (stage: StageType): number => {
    return STAGES.findIndex((s) => s.id === stage);
  };

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

  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center ring-4 ring-white shadow-sm">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
                Candidate Pipeline
              </h1>
              <p className="text-stone-600">
                Track and manage candidates through the hiring process
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-3 bg-linear-to-r from-stone-50 to-stone-50/50 rounded-xl ring-1 ring-stone-200">
            <Users className="h-5 w-5 text-stone-600" />
            <div>
              <span className="font-bold text-xl text-stone-800">
                {applications.length}
              </span>
              <span className="text-sm text-stone-600 ml-2">candidates</span>
            </div>
          </div>
        </div>
      </div>

      {/* pipeline board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAGES.map((stage) => {
          const candidates = getCandidatesByStage(stage.id);
          const colors = getStageColors(stage.id);

          return (
            <Card
              key={stage.id}
              className={`border-stone-200 shadow-sm hover-lift overflow-hidden ${colors.border}`}
            >
              <CardHeader
                className={`pb-3 pt-5 ${colors.bg} border-b ${colors.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg ${colors.accent} flex items-center justify-center`}
                    >
                      {stage.id === "applied" && (
                        <FileText
                          className="h-5 w-5"
                          style={{ color: colors.text }}
                        />
                      )}
                      {stage.id === "reviewed" && (
                        <Eye
                          className="h-5 w-5"
                          style={{ color: colors.text }}
                        />
                      )}
                      {stage.id === "interview_scheduled" && (
                        <Calendar
                          className="h-5 w-5"
                          style={{ color: colors.text }}
                        />
                      )}
                      {stage.id === "offer_sent" && (
                        <TrendingUp
                          className="h-5 w-5"
                          style={{ color: colors.text }}
                        />
                      )}
                    </div>
                    <div>
                      <CardTitle className={`text-lg font-bold ${colors.text}`}>
                        {stage.title}
                      </CardTitle>
                      <p className="text-xs text-stone-500 mt-1">
                        {candidates.length} candidates
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${colors.text} ${colors.accent} font-bold px-3 py-1 rounded-full`}
                  >
                    {candidates.length}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                {candidates.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="h-16 w-16 rounded-full bg-linear-to-br from-stone-100 to-stone-50 flex items-center justify-center mx-auto mb-4 ring-4 ring-white">
                      <Users className="h-8 w-8 text-stone-300" />
                    </div>
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
                        className="group relative p-4 bg-white border border-stone-100 rounded-xl hover:border-stone-200 hover:shadow-sm transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-8 w-8 rounded-full bg-linear-to-br from-stone-100 to-stone-50 flex items-center justify-center ring-2 ring-white">
                                <User className="h-4 w-4 text-stone-600" />
                              </div>
                              <Link
                                to={`/recruiter/candidate/${candidate.id}`}
                                className="font-semibold text-stone-800 hover:text-amber-700 truncate transition-colors"
                              >
                                {candidate.fullName}
                              </Link>
                            </div>

                            <div className="space-y-2 pl-10">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-stone-400" />
                                <p className="text-sm text-stone-600 truncate">
                                  {candidate.email}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-stone-400" />
                                <p className="text-sm text-stone-600">
                                  {candidate.phone}
                                </p>
                              </div>
                            </div>
                          </div>

                          {candidate.score !== undefined && (
                            <Badge
                              variant="outline"
                              className={`${getScoreBgColor(candidate.score)} ${getScoreColor(candidate.score)} border-0 font-semibold px-3 py-1.5 rounded-lg`}
                            >
                              <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
                              {candidate.score}/5
                            </Badge>
                          )}
                        </div>

                        {/* skills preview */}
                        <div className="mt-4 mb-3">
                          <div className="flex flex-wrap gap-1.5">
                            {candidate.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-linear-to-br from-stone-50 to-white text-stone-700 text-xs rounded-lg font-medium border border-stone-200 truncate max-w-28"
                                title={skill}
                              >
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2.5 py-1 bg-stone-100 text-stone-500 text-xs rounded-lg font-medium">
                                +{candidate.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <Clock className="h-3 w-3" />
                            {candidate.yearsOfExperience} years exp
                          </div>

                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 cursor-pointer p-0 rounded-lg hover:bg-stone-100"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-xl bg-white border-stone-200 shadow-lg p-2"
                              >
                                <DropdownMenuItem
                                  asChild
                                  className="rounded-lg"
                                >
                                  <Link
                                    to={`/recruiter/candidate/${candidate.id}`}
                                    className="cursor-pointer px-3 py-2.5"
                                  >
                                    <Eye className="h-4 w-4 mr-3 text-stone-500" />
                                    <span className="font-medium">
                                      View Details
                                    </span>
                                  </Link>
                                </DropdownMenuItem>

                                {candidate.stage !== "interview_scheduled" &&
                                  candidate.stage !== "offer_sent" && (
                                    <DropdownMenuItem
                                      asChild
                                      className="rounded-lg"
                                    >
                                      <Link
                                        to={`/recruiter/schedule/${candidate.id}`}
                                        className="cursor-pointer px-3 py-2.5"
                                      >
                                        <Calendar className="h-4 w-4 mr-3 text-stone-500" />
                                        <span className="font-medium">
                                          Schedule Interview
                                        </span>
                                      </Link>
                                    </DropdownMenuItem>
                                  )}

                                {candidate.stage === "interview_scheduled" && (
                                  <DropdownMenuItem
                                    asChild
                                    className="rounded-lg"
                                  >
                                    <Link
                                      to={`/recruiter/offer/${candidate.id}`}
                                      className="cursor-pointer px-3 py-2.5"
                                    >
                                      <FileText className="h-4 w-4 mr-3 text-stone-500" />
                                      <span className="font-medium">
                                        Prepare Offer
                                      </span>
                                    </Link>
                                  </DropdownMenuItem>
                                )}

                                <Separator className="my-2" />

                                {actions.map((action, idx) => (
                                  <DropdownMenuItem
                                    key={idx}
                                    onClick={action.action}
                                    className="cursor-pointer px-3 py-2.5 rounded-lg"
                                  >
                                    <ArrowRight className="h-4 w-4 mr-3 text-stone-500" />
                                    <span className="font-medium">
                                      {action.label}
                                    </span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
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

      {/* pipeline stats */}
      <Card className="border-stone-200 shadow-sm hover-lift">
        <CardHeader className="border-b border-stone-100 pb-4">
          <CardTitle className="text-xl font-semibold text-stone-800 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            Pipeline Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STAGES.map((stage) => {
              const candidates = getCandidatesByStage(stage.id);
              const percentage =
                applications.length > 0
                  ? Math.round((candidates.length / applications.length) * 100)
                  : 0;
              const colors = getStageColors(stage.id);

              return (
                <div key={stage.id} className="text-center group">
                  <div
                    className={`h-20 w-20 ${colors.accent} rounded-2xl flex items-center justify-center mx-auto mb-4 ring-4 ring-white shadow-sm transition-transform group-hover:scale-105`}
                  >
                    <span className={`text-3xl font-bold ${colors.text}`}>
                      {candidates.length}
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-800 mb-1">
                    {stage.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-16 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bg.split(" ")[0].replace("bg-linear-to-b", "")} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-stone-700">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* recent activity */}
      <Card className="border-stone-200 shadow-sm hover-lift">
        <CardHeader className="border-b border-stone-100 pb-4">
          <CardTitle className="text-xl font-semibold text-stone-800 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-linear-to-br from-amber-100 to-amber-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              {
                icon: <FileText className="h-5 w-5" />,
                title: "Sarah Chen applied for Frontend Developer",
                time: "2 hours ago",
                stage: "Applied",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: <Calendar className="h-5 w-5" />,
                title: "Interview scheduled with Alex Johnson",
                time: "Yesterday, 10:30 AM",
                stage: "Scheduled",
                color: "bg-amber-100 text-amber-600",
              },
              {
                icon: <Star className="h-5 w-5" />,
                title: "Sam Smith scored 5/5 by hiring manager",
                time: "2 days ago",
                stage: "Reviewed",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 hover:bg-stone-50 rounded-xl transition-colors group"
              >
                <div
                  className={`h-12 w-12 rounded-xl ${activity.color} flex items-center justify-center ring-4 ring-white shadow-sm`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 group-hover:text-stone-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">{activity.time}</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-white text-stone-700 border-stone-300 font-medium px-3 py-1.5 rounded-lg"
                >
                  {activity.stage}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineBoard;
