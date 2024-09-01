"use client";

import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";
import { cn } from "@/lib/utils";

const HelloStep = () => {
    const { form } = useMultiStepFormContext();
    const { name } = form.getValues();

    return (
        <div className="h-[inherit] p-16">
            <div className="text-center">
                <h1 className={cn("text-4xl font-light text-white", "sm:text-5xl md:text-6xl lg:text-7xl")}>Bienvenue</h1>
                <h2 className={cn("text-5xl font-semibold text-white mt-2", "sm:text-6xl md:text-7xl lg:text-8xl")}>{name}</h2>
            </div>
        </div>
    );
};

export default HelloStep;
