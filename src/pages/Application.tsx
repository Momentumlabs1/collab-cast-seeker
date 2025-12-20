import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import StepIndicator from "@/components/application/StepIndicator";
import AccountSelection from "@/components/application/AccountSelection";
import StepOne from "@/components/application/StepOne";
import StepTwo from "@/components/application/StepTwo";
import StepThree from "@/components/application/StepThree";
import StepFour from "@/components/application/StepFour";
import ConfirmationPage from "@/components/application/ConfirmationPage";

export interface ApplicationData {
  selectedAccount: string;
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
  selectedAccount: "",
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
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

  const updateData = (updates: Partial<ApplicationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error } = await supabase.storage
        .from('application-files')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading file:', error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('application-files')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return uploadedUrls;
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    try {
      // Upload files first
      let fileUrls: string[] = [];
      if (data.uploadedFiles.length > 0) {
        fileUrls = await uploadFiles(data.uploadedFiles);
      }

      const { error } = await supabase.from("applications").insert({
        selected_account: data.selectedAccount,
        name: data.name,
        location: data.location,
        instagram: data.instagram || null,
        whatsapp: data.whatsapp || null,
        tools: data.tools,
        other_tool: data.otherTool || null,
        experience: data.experience || null,
        portfolio_links: data.portfolioLinks.filter(l => l.trim()),
        file_urls: fileUrls,
        contact_preference: data.contactPreference,
      });

      if (error) throw error;
      
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitApplication();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isSubmitted) {
    return <ConfirmationPage data={data} />;
  }

  const stepLabels = ["Account", "About You", "Tools", "Portfolio", "Contact"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => currentStep === 0 ? navigate("/") : prevStep()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="font-display text-xl font-bold tracking-tight">
              EDITOR APPLICATION
            </h1>
            <span className="text-sm text-muted-foreground">
              {stepLabels[currentStep]}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 h-1 bg-muted">
        <motion.div
          className="h-full bg-foreground"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <StepIndicator currentStep={currentStep + 1} totalSteps={totalSteps} />

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <AccountSelection
                key="step0"
                selectedAccount={data.selectedAccount}
                onSelect={(account) => updateData({ selectedAccount: account })}
                onNext={nextStep}
              />
            )}
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
                isSubmitting={isSubmitting}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Application;