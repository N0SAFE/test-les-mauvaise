import React, { useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { MultiStepFormStep } from "./MultiStepFormStep";
import { MultiStepFormHeader } from "./MultiStepFormHeader";
import { MultiStepFormFooter } from "./MultiStepFormFooter";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { MultiStepFormContext } from "./MultiStepFormContext";
import { cn } from "@/lib/utils";
import { AnimatedStep } from "./AnimatedStep";

interface MultiStepFormProps<T extends z.ZodType> {
    schema: T;
    form: UseFormReturn<z.infer<T>>;
    onSubmit: (data: z.infer<T>) => void;
    useStepTransition?: boolean;
    className?: string;
    onStepChange?: (stepIndex: number) => void;
}

type StepProps = React.PropsWithChildren<
    {
        name: string;
        asChild?: boolean;
    } & React.HTMLProps<HTMLDivElement>
>;

export function MultiStepForm<T extends z.ZodType>({ schema, form, onSubmit, children, className, onStepChange }: React.PropsWithChildren<MultiStepFormProps<T>>) {
    const steps = useMemo(
        () => React.Children.toArray(children).filter((child): child is React.ReactElement<StepProps> => React.isValidElement(child) && child.type === MultiStepFormStep),
        [children]
    );

    const header = useMemo(() => {
        return React.Children.toArray(children).find((child) => React.isValidElement(child) && child.type === MultiStepFormHeader);
    }, [children]);

    const footer = useMemo(() => {
        return React.Children.toArray(children).find((child) => React.isValidElement(child) && child.type === MultiStepFormFooter);
    }, [children]);

    const stepNames = steps.map((step) => step.props.name);
    const multiStepForm = useMultiStepForm(schema, form, stepNames);

    useEffect(() => {
        if (onStepChange) {
            onStepChange(multiStepForm.currentStepIndex);
        }
    }, [multiStepForm.currentStepIndex]);

    return (
        <MultiStepFormContext.Provider value={multiStepForm}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className, "flex size-full flex-col overflow-hidden")}>
                {header}

                <div className="relative transition-transform duration-500 flex flex-col h-[inherit] flex-1">
                    {steps.map((step, index) => {
                        const isActive = index === multiStepForm.currentStepIndex;

                        return (
                            <AnimatedStep key={step.props.name} direction={multiStepForm.direction} isActive={isActive} index={index} currentIndex={multiStepForm.currentStepIndex}>
                                {step}
                            </AnimatedStep>
                        );
                    })}
                </div>

                {footer}
            </form>
        </MultiStepFormContext.Provider>
    );
}
