"use client";

import { MultiStepForm } from "@/components/multi-step-form/MultiStepForm";
import { MultiStepFormStep } from "@/components/multi-step-form/MultiStepFormStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NameStep from "./step/NameStep";
import AgeStep from "./step/AgeStep";
import MoodStep from "./step/MoodStep";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";
import { ChevronRight } from "lucide-react";
import { MultiStepFormFooter } from "@/components/multi-step-form/MultiStepFormFooter";
import WhyHereStep from "./step/WhyHereStep";
import HelloStep from "./step/HelloStep";
import SignUpStep from "./step/SignUpStep";
import redirect from "@/actions/redirect";
import { signIn } from "next-auth/react";
import { signUp } from "@/actions/signUp";
import { Button } from "@/components/shadcn/button";
// import SignUpStep from "./step/SignUpStep";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    mood: z.string().min(1, "Mood is required"),
    age: z.string().min(1, "Age is required"),
    whyHere: z.string().min(1, "Why here is required"),
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(100)
});

const Page = () => {
    const [actualStep, setActualStep] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            mood: "",
            age: "",
            whyHere: "",
            email: "",
            password: ""
        }
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        // const res = await signIn("credentials", {
        //     email: values.email,
        //     password: values.password,
        //     redirect: false
        // });
        // if (!res?.error && !res?.code) {
        //     redirect("/");
        //     return
        // }
        // form.setError("email", {
        //     type: "manual",
        //     message: "Invalid email or password"
        // });
    }

    return (
        <div
            className={cn(
                "h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-0% from-pink-200 to-purple-300 flex flex-col relative",
                actualStep === 0 ? "to-20%" : actualStep === 1 ? "to-30%" : actualStep === 2 ? "to-40%" : actualStep === 3 ? "to-50%" : actualStep === 4 ? "to-60%" : "to-70%"
            )}
        >
            <Button className="absolute top-0 right-0" onClick={() => {
                redirect('/auth/login')
            }}>
                already have an account ?
            </Button>
            <div className="flex flex-col pt-32 pb-20">
                <h1 className="text-4xl font-bold mb-4 text-center text-white">SIMONE</h1>
            </div>
            <div className="flex-1 h-full">
                <MultiStepForm className={"space-y-10 px-8 pb-8"} schema={formSchema} form={form} onSubmit={onSubmit} onStepChange={setActualStep}>
                    <MultiStepFormStep className="h-[inherit]" name="name">
                        <NameStep />
                    </MultiStepFormStep>

                    <MultiStepFormStep className="h-[inherit]" name="age">
                        <AgeStep />
                    </MultiStepFormStep>

                    <MultiStepFormStep className="h-[inherit]" name="whyHere">
                        <WhyHereStep />
                    </MultiStepFormStep>

                    <MultiStepFormStep className="h-[inherit]" name="mood">
                        <MoodStep />
                    </MultiStepFormStep>

                    <MultiStepFormStep className="h-[inherit]" name="hello">
                        <HelloStep />
                    </MultiStepFormStep>

                    <MultiStepFormStep className="h-[inherit]" name="signUp">
                        <SignUpStep
                            onSignUp={async (values: z.infer<typeof formSchema>) => {
                                // Do something with the form values.
                                // ✅ This will be type-safe and validated.
                                console.log(values);

                                const signUpRes = await signUp(values);

                                if (!signUpRes.error) {
                                    const singInRes = await signIn("credentials", {
                                        email: values.email,
                                        password: values.password,
                                        redirect: false
                                    });
                                    if (!singInRes?.error && !singInRes?.code) {
                                        redirect("/");
                                        return;
                                    }
                                    alert("Invalid email or password");
                                    return
                                }
                                form.setError("email", {
                                    type: "manual",
                                    message: signUpRes.error
                                });
                            }}
                        />
                    </MultiStepFormStep>

                    <MultiStepFormFooter className="flex justify-center">
                        <NextButton />
                    </MultiStepFormFooter>
                </MultiStepForm>
            </div>
        </div>
    );
};

const NextButton = () => {
    const { nextStep, isStepValid, currentStepIndex, totalSteps, isLastStep } = useMultiStepFormContext();
    
    if (isLastStep) {
        return null
    }

    return (
        <div className="w-full max-w-md">
            <div className="flex justify-center space-x-2 mb-4">
                {[...Array(totalSteps)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === currentStepIndex ? "bg-orange-500" : "bg-white"}`}></div>
                ))}
            </div>
            <button
                className="w-full bg-white text-purple-600 rounded-full py-3 font-semibold flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                onClick={nextStep}
                disabled={!isStepValid()}
            >
                Continuer
                <ChevronRight className="ml-2" />
            </button>
        </div>
    );
};

export default Page;
