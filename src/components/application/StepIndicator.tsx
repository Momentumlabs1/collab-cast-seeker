import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  "Persönliche Infos",
  "Deine Tools",
  "Portfolio",
  "Kontakt",
];

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  step <= currentStep
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: step === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {step < currentStep ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                ) : (
                  step
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  step <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stepTitles[step - 1]}
              </span>
            </div>
            {step < totalSteps && (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors duration-300 ${
                  step < currentStep ? "bg-foreground" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
