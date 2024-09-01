import { MultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";
import { useContext } from "react";

export function useMultiStepFormContext() {
    const context = useContext(MultiStepFormContext);
   
    if (!context) {
      throw new Error(
        'useMultiStepFormContext must be used within a MultiStepForm',
      );
    }
   
    return context;
  }