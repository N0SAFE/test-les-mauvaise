import type { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { createContext } from "react";

export const MultiStepFormContext = createContext<ReturnType<typeof useMultiStepForm> | null>(null);
