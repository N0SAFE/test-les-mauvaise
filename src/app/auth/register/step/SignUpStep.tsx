"use client";

import { Button } from "@/components/shadcn/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";
import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";

type SignUpStepProps = {
    onSignUp: (values: any) => void;
};

const SignUpStep = ({ onSignUp }: SignUpStepProps) => {
    const { form } = useMultiStepFormContext();

    return (
        <div className="h-full overflow-hidden flex flex-col ">
            <div className="flex-1 h-full">
                <div className="flex justify-center w-full h-full">
                    <Form {...form}>
                        <form className="flex flex-col space-y-8 w-full pt-20 px-20 justify-between h-full">
                            <div className="flex flex-col gap-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <input {...field} className="w-full bg-transparent h-9 border-b p-4 hover:outline-none focus:outline-none" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <input {...field} type="password" className="w-full bg-transparent h-9 border-b p-4 hover:outline-none focus:outline-none" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="button" onClick={form.handleSubmit(onSignUp)}>Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignUpStep;
