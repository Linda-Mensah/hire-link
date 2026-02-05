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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">
          Candidate Not Found
        </h2>
        <Button asChild className="mt-4">
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <a
            href={`/recruiter/candidate/${candidateId}`}
            className="text-amber-700"
          >
            ← Back to Candidate
          </a>
        </Button>
        <h1 className="text-3xl font-bold text-stone-800">
          Schedule Interview
        </h1>
        <p className="text-stone-600">
          Schedule an interview with {candidate.fullName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Interview Date</Label>
                <div className="mt-2">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="time">Interview Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="mt-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "09:00",
                      "10:00",
                      "11:00",
                      "13:00",
                      "14:00",
                      "15:00",
                      "16:00",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Interview Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="mt-2">
                    {type === "video" ? (
                      <Video className="h-4 w-4 mr-2" />
                    ) : (
                      <User className="h-4 w-4 mr-2" />
                    )}
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="interviewer">Interviewer</Label>
                <Input
                  id="interviewer"
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  placeholder="Interviewer's name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="notes">Interview Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add interview details, topics to cover, etc."
                  className="mt-2 min-h-25"
                />
              </div>
            </div>

            <Button onClick={handleSchedule} className="w-full" size="lg">
              <Send className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {candidate.fullName}
                  </h3>
                  <p className="text-stone-600">{candidate.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-600">Position Applied</span>
                  <span className="font-medium">Frontend Developer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Experience</span>
                  <span className="font-medium">
                    {candidate.yearsOfExperience} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Current Stage</span>
                  <span className="font-medium capitalize">
                    {candidate.stage.replace("_", " ")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interview Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    1
                  </div>
                  <span>Send calendar invite to candidate and interviewer</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    2
                  </div>
                  <span>Include meeting link for video calls</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    3
                  </div>
                  <span>
                    Share interview preparation materials 24 hours in advance
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    4
                  </div>
                  <span>Submit feedback within 24 hours of interview</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
