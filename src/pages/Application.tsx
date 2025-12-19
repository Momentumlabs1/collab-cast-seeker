import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/application/StepIndicator";
import StepOne from "@/components/application/StepOne";
import StepTwo from "@/components/application/StepTwo";
import StepThree from "@/components/application/StepThree";
import StepFour from "@/components/application/StepFour";
import ConfirmationPage from "@/components/application/ConfirmationPage";

export interface ApplicationData {
  name: string;
  location: string;
  instagram: string;
  whatsapp: string;
  tools: string[];
  otherTool: string;
  experience: string;
  portfolioLinks: string[];
  uploadedFiles: File[];
  contactPreference: "instagram" | "whatsapp";
}

const initialData: ApplicationData = {
  name: "",
  location: "",
  instagram: "",
  whatsapp: "",
  tools: [],
  otherTool: "",
  experience: "",
  portfolioLinks: [""],
  uploadedFiles: [],
  contactPreference: "instagram",
};

const Application = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const updateData = (updates: Partial<ApplicationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isSubmitted) {
    return <ConfirmationPage data={data} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="font-display text-xl font-bold tracking-tight">
              EDITOR APPLICATION
            </h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 h-1 bg-muted">
        <motion.div
          className="h-full bg-foreground"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <StepOne
                key="step1"
                data={data}
                updateData={updateData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                key="step2"
                data={data}
                updateData={updateData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                key="step3"
                data={data}
                updateData={updateData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 4 && (
              <StepFour
                key="step4"
                data={data}
                updateData={updateData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Application;