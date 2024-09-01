import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useMultiStepFormContext } from "@/hooks/useMultiStepFormContext";
import { useEffect, useRef } from "react";

const NameStep = () => {
    const { form } = useMultiStepFormContext();
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <Form {...form}>
            <div className={"flex flex-col gap-4 justify-between h-[inherit]"}>
                <FormField
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <input {...field} className="w-full bg-transparent h-9 border-b p-4 hover:outline-none focus:outline-none" ref={inputRef} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </Form>
    );
};

export default NameStep;
