"use client";

import redirect from "@/actions/redirect";
import { Button } from "@/components/shadcn/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(100)
});

const Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        });
        if (!res?.error && !res?.code) {
            redirect("/");
            return;
        }
        form.setError("email", {
            type: "manual",
            message: "Invalid email or password"
        });
    }
    return (
        <div className="h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-0% to-40% from-pink-200 to-purple-300 flex flex-col relative ">
            <Button className="absolute top-0 right-0" onClick={() => {
                redirect('/auth/register')
            }}>
                don&apos;t have an account ?
            </Button>
            <div className="flex flex-col pt-32 pb-20">
                <h1 className="text-4xl font-bold mb-4 text-center text-white">SIMONE</h1>
            </div>
            <div className="flex-1 h-full">
                <div className="flex justify-center w-full h-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 w-full p-20 justify-between h-full">
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

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Page;
