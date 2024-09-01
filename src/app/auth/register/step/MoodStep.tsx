"use client";

import { Sun, Cloud, Flower, Link, Wind, Sparkles, Zap, Heart, Loader } from "lucide-react";
import { useMemo, useState } from "react";
import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import { cn } from "@/lib/utils";

const emotions = [
    { icon: <Flower className="w-6 h-6" />, label: "Calme" },
    { icon: <Cloud className="w-6 h-6" />, label: "Triste" },
    { icon: <Sun className="w-6 h-6" />, label: "Heureuse" },
    { icon: <Link className="w-6 h-6" />, label: "Confiante" },
    { icon: <Wind className="w-6 h-6" />, label: "Angoissée" },
    { icon: <Sparkles className="w-6 h-6" />, label: "Épanouie" },
    { icon: <Zap className="w-6 h-6" />, label: "Préoccupé" },
    { icon: <Heart className="w-6 h-6" />, label: "Délivrée" },
    { icon: <Loader className="w-6 h-6" />, label: "Désorientée" }
];

const MoodStep = () => {
    const { form } = useMultiStepFormContext();

    return (
        <Form {...form}>
            <div className="flex flex-col items-center justify-between h-full p-6 text-white">
                <div className="w-full max-w-md">
                    <div className="w-full max-w-md">
                        <div className="grid grid-cols-3 gap-6">
                            <FormField
                                name="mood"
                                render={({ field }) => (
                                    <>
                                        {emotions.map((emotion, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center hover:cursor-pointer"
                                                onClick={(e) => {
                                                    field.onChange(emotion.label);
                                                }}
                                            >
                                                <div
                                                    className={cn(
                                                        "flex items-center justify-center w-16 h-16 mb-2 bg-white bg-opacity-20 rounded-2xl",
                                                        field.value === emotion.label ? "bg-white bg-opacity-70" : ""
                                                    )}
                                                >
                                                    {emotion.icon}
                                                </div>
                                                <span className="text-xs text-white select-none">{emotion.label}</span>
                                            </div>
                                        ))}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default MoodStep;
