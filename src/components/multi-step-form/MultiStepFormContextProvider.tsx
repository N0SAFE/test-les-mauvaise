import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";

export function MultiStepFormContextProvider(props: {
    children: (context: ReturnType<typeof useMultiStepForm>) => React.ReactNode;
  }) {
    const ctx = useMultiStepFormContext();
   
    if (Array.isArray(props.children)) {
      const [child] = props.children;
   
      return (
        child as (context: ReturnType<typeof useMultiStepForm>) => React.ReactNode
      )(ctx);
    }
   
    return props.children(ctx);
  }