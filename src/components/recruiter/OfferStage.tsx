import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Send,
  CheckCircle,
  Award,
  ArrowLeft,
  Percent,
  Banknote,
} from "lucide-react";
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
  const [bonus, setBonus] = useState("10");
  const [notes, setNotes] = useState("");

  const candidate = applications.find((app) => app.id === candidateId);

  if (!candidate) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="h-24 w-24 rounded-full bg-linear-to-br from-stone-100 to-stone-50 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm">
          <Award className="h-12 w-12 text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-3">
          Candidate Not Found
        </h2>
        <p className="text-stone-600 mb-8 max-w-md">
          The candidate you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="rounded-lg px-6">
          <a href="/recruiter">Back to Pipeline</a>
        </Button>
      </div>
    );
  }

  const handleGenerateOffer = () => {
    generateOffer(candidateId!);
    toast.success("Offer letter generated successfully!");

    // mock sending email
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

    // mock download
    const element = document.createElement("a");
    const file = new Blob([candidate.offerLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `offer-${candidate.fullName}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Offer letter downloaded");
  };

  const totalCompensation = parseInt(salary) * (1 + parseInt(bonus) / 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeInUp">
      {/* header */}
      <div className="space-y-2">
        <Button variant="ghost" asChild className="mb-2 group">
          <a
            href={`/recruiter/candidate/${candidateId}`}
            className="text-amber-700 hover:text-amber-800 font-medium flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Candidate
          </a>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
              Prepare Offer
            </h1>
            <p className="text-stone-600 mt-2">
              Create and send an offer letter to{" "}
              <span className="font-semibold text-stone-800">
                {candidate.fullName}
              </span>
            </p>
          </div>
          <div className="h-14 w-14 rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center ring-4 ring-white shadow-sm">
            <Award className="h-7 w-7 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* compensation details */}
        <Card className="border-stone-200 shadow-sm hover-lift">
          <CardHeader className="border-b border-stone-100 pb-4">
            <CardTitle className="text-xl font-semibold text-stone-800 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                <Banknote className="h-5 w-5 text-emerald-600" />
              </div>
              Compensation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <div className="space-y-6">
              {/* base salary */}
              <div className="space-y-3">
                <Label
                  htmlFor="salary"
                  className="text-base font-semibold text-stone-700"
                >
                  Base Salary
                </Label>
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-500 text-lg font-medium">
                        ₵
                      </span>
                      <Input
                        id="salary"
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="h-12 rounded-xl border-stone-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 pl-10 text-lg font-semibold"
                        min="0"
                        step="1000"
                      />
                    </div>
                    <p className="text-sm text-stone-500 mt-2">
                      Annual base compensation in Ghana Cedis
                    </p>
                  </div>
                </div>
              </div>

              {/* bonus */}
              <div className="space-y-3">
                <Label
                  htmlFor="bonus"
                  className="text-base font-semibold text-stone-700"
                >
                  Target Bonus
                </Label>
                <div className="flex items-center gap-4">
                  <Select value={bonus} onValueChange={setBonus}>
                    <SelectTrigger className="h-12 rounded-xl border-stone-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100">
                      <Percent className="h-4 w-4 mr-2 text-stone-500" />
                      <SelectValue placeholder="Select bonus percentage" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-white border-stone-200">
                      {["0", "5", "10", "15", "20", "25", "30"].map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="rounded-lg focus:bg-emerald-50"
                        >
                          {value}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-stone-600 font-medium">
                    = ₵
                    {(
                      (parseInt(salary) * parseInt(bonus)) /
                      100
                    ).toLocaleString()}{" "}
                    bonus
                  </div>
                </div>
              </div>

              {/* notes */}
              <div className="space-y-3">
                <Label
                  htmlFor="notes"
                  className="text-base font-semibold text-stone-700"
                >
                  Offer Notes & Additional Benefits
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Include additional benefits, expectations, start date expectations, or any other important details..."
                  className="min-h-35 rounded-xl border-stone-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* total compensation */}
            <div className="p-5 bg-linear-to-br from-emerald-50/50 to-emerald-50/30 rounded-xl ring-1 ring-emerald-200">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-sm font-medium text-emerald-700 mb-1">
                    Base Salary
                  </div>
                  <div className="text-xl font-bold text-emerald-900">
                    ₵{parseInt(salary).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-emerald-700 mb-1">
                    Target Bonus ({bonus}%)
                  </div>
                  <div className="text-xl font-bold text-emerald-900">
                    ₵
                    {(
                      (parseInt(salary) * parseInt(bonus)) /
                      100
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800">
                    Total Compensation
                  </span>
                  <span className="text-2xl font-bold text-emerald-900">
                    ₵{totalCompensation.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-emerald-700 mt-2">
                  Annual total including base salary + target bonus
                </p>
              </div>
            </div>

            {/* action buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleGenerateOffer}
                className="flex-1 h-12 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-lg font-semibold"
              >
                <Send className="h-5 w-5 mr-3" />
                Generate & Send Offer
              </Button>
              {candidate.offerLetter && (
                <Button
                  onClick={handleDownloadOffer}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-stone-300 hover:border-emerald-400 hover:bg-emerald-50"
                >
                  <Download className="h-5 w-5 mr-3" />
                  Download Offer
                </Button>
              )}
            </div>
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
                <div className="h-16 w-16 rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center ring-4 ring-white shadow-sm">
                  <FileText className="h-7 w-7 text-emerald-600" />
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
                  <span className="text-stone-600 font-medium">Position</span>
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
                  <span
                    className={`px-4 py-1.5 rounded-full font-semibold ${
                      candidate.stage === "offer_sent"
                        ? "bg-linear-to-r from-emerald-100 to-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                        : "bg-linear-to-r from-amber-100 to-amber-50 text-amber-800 ring-1 ring-amber-200"
                    }`}
                  >
                    {candidate.stage.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* offer preview */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Offer Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-linear-to-br from-stone-50 to-white rounded-xl p-5 ring-1 ring-stone-100 max-h-80 overflow-y-auto">
                <pre className="text-sm text-stone-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {candidate.offerLetter ||
                    `OFFER LETTER

Dear ${candidate.fullName},

We are pleased to extend an offer for the position of Frontend Developer at HireLink.

COMPENSATION PACKAGE:
• Base Salary: ₵${parseInt(salary).toLocaleString()} per annum
• Target Bonus: ${bonus}% of base salary
• Total Annual Compensation: ₵${totalCompensation.toLocaleString()}

ADDITIONAL BENEFITS:
• Comprehensive health insurance
• Professional development allowance
• Flexible working arrangements
• Annual leave: 25 days per year

${notes ? `ADDITIONAL NOTES:\n${notes}` : ""}

Please review this offer and let us know your decision within 7 business days.

We look forward to welcoming you to our team!

Sincerely,
The Hiring Team
HireLink`}
                </pre>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <p>
                  This is a preview of the offer letter. The final version will
                  include all details entered above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* next steps */}
          <Card className="border-stone-200 shadow-sm hover-lift">
            <CardHeader className="border-b border-stone-100 pb-4">
              <CardTitle className="text-xl font-semibold text-stone-800">
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  "Generate and review the offer letter",
                  "Send offer to candidate via email",
                  "Follow up within 3-5 business days",
                  "Once accepted, begin onboarding process",
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="h-7 w-7 rounded-full bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-stone-700">{step}</span>
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

export default OfferStage;
