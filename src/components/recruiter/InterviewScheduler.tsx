// InterviewScheduler.tsx - improved styling
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, Video, User, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { useApplicationStore } from "../../stores/applicationStore";
import { toast } from "react-toastify";
import { Input } from "../ui/input";

const InterviewScheduler: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { applications, scheduleInterview } = useApplicationStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("10:00");
  const [type, setType] = useState("video");
  const [interviewer, setInterviewer] = useState("");
  const [notes, setNotes] = useState("");

  const candidate = applications.find((app) => app.id === candidateId);

  if (!candidate) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="h-24 w-24 rounded-full bg-linear-to-br from-stone-100 to-stone-50 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm">
          <User className="h-12 w-12 text-stone-400" />
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

  const handleSchedule = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const interviewDateTime = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    interviewDateTime.setHours(hours, minutes);

    scheduleInterview(candidateId!, interviewDateTime.toISOString());
    toast.success("Interview scheduled successfully!");

    // Send confirmation email (mock)
    setTimeout(() => {
      toast.info("Confirmation email sent to candidate");
      navigate("/recruiter");
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 mr-2" />;
      case "in-person":
        return <User className="h-4 w-4 mr-2" />;
      case "phone":
        return <Clock className="h-4 w-4 mr-2" />;
      default:
        return <Video className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeInUp">
      {/* header */}
      <div className="space-y-2">
        <Button variant="ghost" asChild className="mb-2 group">
          <Link
            to={`/recruiter/candidate/${candidateId}`}
            className="text-amber-700 hover:text-amber-800 font-medium"
          >
            <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              ←
            </div>
            Back to Candidate
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
              Schedule Interview
            </h1>
            <p className="text-stone-600 mt-2">
              Schedule an interview with{" "}
              <span className="font-semibold text-stone-800">
                {candidate.fullName}
              </span>
            </p>
          </div>
          <div className="h-14 w-14 rounded-full bg-linear-to-br from-amber-100 to-amber-50 flex items-center justify-center ring-4 ring-white shadow-sm">
            <Calendar className="h-7 w-7 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* schedule details */}
        <Card className="border-stone-200 shadow-sm hover-lift">
          <CardHeader className="border-b border-stone-100 pb-4">
            <CardTitle className="text-xl font-semibold text-stone-800 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              Schedule Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <div className="space-y-6">
              {/* date picker */}
              <div className="space-y-3">
                <Label
                  htmlFor="date"
                  className="text-base font-semibold text-stone-700"
                >
                  Interview Date
                </Label>
                <div className="mt-2 border border-stone-200 rounded-xl p-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    disabled={(date) => date < new Date()}
                    classNames={{
                      day_selected:
                        "bg-linear-to-br from-amber-600 to-amber-500 text-white",
                      day_today:
                        "bg-linear-to-br from-stone-100 to-stone-50 text-stone-800 border border-stone-200",
                    }}
                  />
                </div>
              </div>

              {/* time selection */}
              <div className="space-y-3">
                <Label
                  htmlFor="time"
                  className="text-base font-semibold text-stone-700"
                >
                  Interview Time
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="h-12 rounded-xl border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100">
                    <Clock className="h-4 w-4 mr-3 text-stone-500" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-stone-200">
                    {[
                      "09:00",
                      "09:30",
                      "10:00",
                      "10:30",
                      "11:00",
                      "11:30",
                      "13:00",
                      "13:30",
                      "14:00",
                      "14:30",
                      "15:00",
                      "15:30",
                      "16:00",
                      "16:30",
                    ].map((t) => (
                      <SelectItem
                        key={t}
                        value={t}
                        className="rounded-lg focus:bg-amber-50"
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* interview type */}
              <div className="space-y-3">
                <Label
                  htmlFor="type"
                  className="text-base font-semibold text-stone-700"
                >
                  Interview Type
                </Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-12 rounded-xl border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100">
                    {getTypeIcon(type)}
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-stone-200">
                    <SelectItem
                      value="video"
                      className="rounded-lg focus:bg-amber-50"
                    >
                      Video Call
                    </SelectItem>
                    <SelectItem
                      value="in-person"
                      className="rounded-lg focus:bg-amber-50"
                    >
                      In-Person
                    </SelectItem>
                    <SelectItem
                      value="phone"
                      className="rounded-lg focus:bg-amber-50"
                    >
                      Phone Call
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* interviewer */}
              <div className="space-y-3">
                <Label
                  htmlFor="interviewer"
                  className="text-base font-semibold text-stone-700"
                >
                  Interviewer Name
                </Label>
                <Input
                  id="interviewer"
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  placeholder="Enter interviewer's full name"
                  className="h-12 rounded-xl border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              {/* notes */}
              <div className="space-y-3">
                <Label
                  htmlFor="notes"
                  className="text-base font-semibold text-stone-700"
                >
                  Interview Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add interview details, topics to cover, preparation materials, etc."
                  className="min-h-30 rounded-xl border-stone-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 placeholder:text-stone-400"
                />
              </div>
            </div>

            <Button
              onClick={handleSchedule}
              className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-lg font-semibold"
            >
              <Send className="h-5 w-5 mr-3" />
              Schedule Interview
            </Button>
          </CardContent>
        </Card>

        {/* right column */}
        <div className="space-y-8">
          {/* candidate info */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Candidate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-5 mb-6 p-4 bg-linear-to-br from-stone-50 to-white rounded-xl ring-1 ring-stone-100">
                <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-100 to-amber-50 flex items-center justify-center ring-4 ring-white shadow-sm">
                  <User className="h-7 w-7 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-stone-800">
                    {candidate.fullName}
                  </h3>
                  <p className="text-stone-600">{candidate.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
                  <span className="text-stone-600 font-medium">
                    Position Applied
                  </span>
                  <span className="font-semibold text-stone-800">
                    Frontend Developer
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
                  <span className="text-stone-600 font-medium">Experience</span>
                  <span className="font-semibold text-stone-800">
                    {candidate.yearsOfExperience} years
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
                  <span className="text-stone-600 font-medium">
                    Current Stage
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-linear-to-r from-amber-50 to-amber-100 text-amber-800 text-sm font-semibold">
                    {candidate.stage.replace("_", " ")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* guidelines */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Interview Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  "Send calendar invite to candidate and interviewer",
                  "Include meeting link for video calls",
                  "Share interview preparation materials 24 hours in advance",
                  "Submit feedback within 24 hours of interview",
                ].map((guideline, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="h-7 w-7 rounded-full bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-stone-700">{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
