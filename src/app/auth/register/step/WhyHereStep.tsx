"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";

const options = ["Je souhaite m'informer", "Je m'apprête à réaliser une IVG", "Je viens de faire une IVG", "Je réalise une IVG", "Autre Chose", "Je ne sais pas"];

const WhyHereStep = () => {
    const { form } = useMultiStepFormContext();

    const optionsPlacement = useMemo(() => {
        return options.map((option, index) => {
            // decaler de 50% / nombre d'option
            const angle = (index / options.length) * 2 * Math.PI - Math.PI / 2 + Math.PI / 2;
            const x = Math.cos(angle) * 120 + 128;
            const y = Math.sin(angle) * 120 + 128;
            const textPlacementX = x > 128 ? "right" : "left";
            const textPlacementY = y > 128 ? "bottom" : "top";
            return {
                option,
                angle,
                x,
                y,
                textPlacementX,
                textPlacementY
            };
        });
    }, []);

    return (
        <Form {...form}>
            <div className="flex flex-col items-center justify-between h-full p-6 text-white">
                <div className="w-full max-w-md">
                    <p className="text-xl text-center mb-8">Aujourd&apos;hui, je télécharge cette application parce que...</p>
                    <div className="relative w-64 h-64 mx-auto mb-8">
                        <FormField
                            name="whyHere"
                            render={({ field, fieldState, formState }) => (
                                <>
                                    <div className="absolute inset-0 border-4 border-white rounded-full"></div>
                                    <p className="absolute inset-0 flex items-center justify-center text-lg p-4 text-center ">{field.value || "Déplace le curseur"}</p>

                                    {optionsPlacement.map((optionPlacement, index) => {
                                        return (
                                            <div className="relative" key={index}>
                                                <button
                                                    className="absolute w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform"
                                                    style={{
                                                        left: optionPlacement.x + (optionPlacement.textPlacementX === "left" ? -4 : 4),
                                                        top: optionPlacement.y + (optionPlacement.textPlacementY === "top" ? -4 : 4)
                                                    }}
                                                    onClick={() => field.onChange(optionPlacement.option)}
                                                ></button>
                                                <span
                                                onClick={() => field.onChange(optionPlacement.option)}
                                                    className="absolute w-max select-none"
                                                    style={{
                                                        left: optionPlacement.x + (optionPlacement.textPlacementX === "left" ? -8 : 8),
                                                        top: optionPlacement.y + (optionPlacement.textPlacementY === "top" ? -8 : 8),
                                                        transform: `translateX(${optionPlacement.textPlacementX === "left" ? "-100%" : "0"}) translateY(${
                                                            optionPlacement.textPlacementY === "top" ? "-100%" : "0"
                                                        })`
                                                    }}
                                                >
                                                    {optionPlacement.option}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default WhyHereStep;
