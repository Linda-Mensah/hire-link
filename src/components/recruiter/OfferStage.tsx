import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Download, Send, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useApplicationStore } from "../../stores/applicationStore";
import { toast } from "react-toastify";

const OfferStage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const { applications, generateOffer } = useApplicationStore();
  const [salary, setSalary] = useState("85000");
  const [equity, setEquity] = useState("0.1");
  const [bonus, setBonus] = useState("10");
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");

  const candidate = applications.find((app) => app.id === candidateId);

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-stone-700 mb-4">
          Candidate Not Found
        </h2>
        <Button asChild className="mt-4">
          <a href="/recruiter">Back to Pipeline</a>
        </Button>
      </div>
    );
  }

  const handleGenerateOffer = () => {
    generateOffer(candidateId!);
    toast.success("Offer letter generated successfully!");

    // Mock sending email
    setTimeout(() => {
      toast.info("Offer email sent to candidate");
      navigate("/recruiter");
    }, 1500);
  };

  const handleDownloadOffer = () => {
    if (!candidate.offerLetter) {
      toast.error("No offer letter generated yet");
      return;
    }

    // Mock download
    const element = document.createElement("a");
    const file = new Blob([candidate.offerLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `offer-${candidate.fullName}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Offer letter downloaded");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <a
            href={`/recruiter/candidate/${candidateId}`}
            className="text-amber-700"
          >
            ← Back to Candidate
          </a>
        </Button>
        <h1 className="text-3xl font-bold text-stone-800">Prepare Offer</h1>
        <p className="text-stone-600">
          Create and send an offer letter to {candidate.fullName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Compensation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="salary">Base Salary ($)</Label>
                <div className="flex items-center mt-2">
                  <span className="text-stone-500 mr-2">$</span>
                  <Input
                    id="salary"
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="text-lg"
                  />
                  <span className="text-stone-500 ml-2">per year</span>
                </div>
              </div>

              <div>
                <Label htmlFor="equity">Equity (%)</Label>
                <Select value={equity} onValueChange={setEquity}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select equity" />
                  </SelectTrigger>
                  <SelectContent>
                    {["0", "0.05", "0.1", "0.15", "0.2", "0.25"].map(
                      (value) => (
                        <SelectItem key={value} value={value}>
                          {value}%
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bonus">Target Bonus (%)</Label>
                <Select value={bonus} onValueChange={setBonus}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select bonus" />
                  </SelectTrigger>
                  <SelectContent>
                    {["0", "5", "10", "15", "20", "25"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Proposed Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label htmlFor="notes">Offer Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional details about the offer..."
                  className="mt-2 min-h-25"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleGenerateOffer}
                className="flex-1"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Generate & Send Offer
              </Button>
              {candidate.offerLetter && (
                <Button
                  onClick={handleDownloadOffer}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Offer
                </Button>
              )}
            </div>
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
                  <FileText className="h-6 w-6 text-amber-600" />
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
                  <span className="text-stone-600">Position</span>
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
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      candidate.stage === "offer_sent"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {candidate.stage.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offer Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-stone-50 rounded-lg p-4 max-h-75 overflow-y-auto">
                <pre className="text-sm text-stone-700 whitespace-pre-wrap">
                  {candidate.offerLetter ||
                    `OFFER LETTER

Dear ${candidate.fullName},

We are pleased to extend an offer for the position of Frontend Developer at our company.

COMPENSATION PACKAGE:
• Base Salary: $${parseInt(salary).toLocaleString()} per year
• Equity: ${equity}%
• Target Bonus: ${bonus}%
• Proposed Start Date: ${startDate || "To be determined"}

Please review this offer and let us know your decision within 7 days.

We look forward to welcoming you to our team!

Sincerely,
The Hiring Team
HireLink`}
                </pre>
              </div>
              <div className="mt-4 text-sm text-stone-600">
                <p>
                  This is a preview of the offer letter. The final version will
                  include all details entered above.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    1
                  </div>
                  <span>Generate and review the offer letter</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    2
                  </div>
                  <span>Send offer to candidate via email</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    3
                  </div>
                  <span>Follow up within 3-5 business days</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    4
                  </div>
                  <span>Once accepted, begin onboarding process</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OfferStage;
