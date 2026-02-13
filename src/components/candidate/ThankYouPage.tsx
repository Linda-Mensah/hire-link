import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, FileText, Mail, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const ThankYouPage: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="max-w-2xl w-full mx-auto">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="text-center px-4 sm:px-6 pt-8 sm:pt-10">
            <div className="flex justify-center mb-4">
              <div
                className="h-16 w-16 sm:h-20 sm:w-20 bg-emerald-100 rounded-full 
                            flex items-center justify-center"
              >
                <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-600" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl text-stone-800">
              Application Submitted!
            </CardTitle>
            <p className="text-stone-600 mt-2 text-sm sm:text-base px-4">
              Thank you for applying. We'll review your application and get back
              to you soon.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="bg-stone-50 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-stone-500 mr-2" />
                <h3 className="text-base sm:text-lg font-medium text-stone-800">
                  Application Details
                </h3>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-stone-600 mb-2">
                  Your application ID:
                </p>
                <p
                  className="text-lg sm:text-xl font-mono font-bold text-amber-600 
                            bg-amber-50 py-2 px-4 rounded-lg inline-block break-all max-w-full"
                >
                  {applicationId}
                </p>
                <p className="text-xs sm:text-sm text-stone-500 mt-3">
                  Please save this ID for future reference
                </p>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <h4 className="font-medium text-stone-800 mb-4 flex items-center text-base sm:text-lg">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-stone-500" />
                What's Next?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-100 
                                text-blue-600 flex items-center justify-center 
                                text-xs sm:text-sm font-medium mr-3 flex-shrink-0"
                  >
                    1
                  </div>
                  <span className="text-sm sm:text-base text-stone-700">
                    You'll receive a confirmation email shortly
                  </span>
                </li>
                <li className="flex items-start">
                  <div
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-100 
                                text-blue-600 flex items-center justify-center 
                                text-xs sm:text-sm font-medium mr-3 flex-shrink-0"
                  >
                    2
                  </div>
                  <span className="text-sm sm:text-base text-stone-700">
                    Our team will review your application within 3-5 business
                    days
                  </span>
                </li>
                <li className="flex items-start">
                  <div
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-100 
                                text-blue-600 flex items-center justify-center 
                                text-xs sm:text-sm font-medium mr-3 flex-shrink-0"
                  >
                    3
                  </div>
                  <span className="text-sm sm:text-base text-stone-700">
                    If selected, you'll be contacted for the next steps
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1 w-full sm:w-auto">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex-1 w-full sm:w-auto"
              >
                <a
                  href="mailto:careers@hirelink.com"
                  className="inline-flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYouPage;
