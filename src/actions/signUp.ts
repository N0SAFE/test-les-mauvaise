"use server";

import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema";
import { passwordToSalt } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    mood: z.string().min(1, "Mood is required"),
    age: z.string().min(1, "Age is required"),
    whyHere: z.string().min(1, "Why here is required"),
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(100)
});

export const signUp = async (data: z.infer<typeof signupSchema>) => {
    "use server";

    const saltedPassword = passwordToSalt(data.password);
    const userInDb = await db.query.users.findFirst({
        where: eq(users.email, data.email)
    });

    if (userInDb) {
        return {
            error: "User already exists at this email" // TODO: change the function to send email to user that it already exists to not expose the email
        };
    }

    const user = await db
        .insert(users)
        .values({
            id: crypto.randomUUID(),
            email: data.email,
            password: saltedPassword,
            name: data.name,
            mood: data.mood,
            age: data.age,
            whyHere: data.whyHere
        })
        .returning();
    return { data: user.pop() };
};
