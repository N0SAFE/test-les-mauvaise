import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { handleError } from "./utils";

async function getUserFromDb(email: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    });
    return user;
}

export const {
    handlers: { GET, POST },
    auth
} = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials.email as string;
                const password = credentials.password as string;

                if (!email || !password) {
                    return null;
                }

                const user = await getUserFromDb(email);

                console.log("user", user);

                if (user) {
                    if (!user.password) {
                        return null;
                    }

                    const isAuthenciated = await bcrypt.compare(password, user.password);
                    if (isAuthenciated) {
                        return user;
                    } else {
                        return null;
                    }
                }

                if (!user) {
                    class InvalidLoginError extends CredentialsSignin {
                        code = "Invalid identifier or password";
                    }
                    throw new InvalidLoginError();
                }
                
                return user
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }: any) {
            console.log("session", session, user, token);
            return session;
        }
    },
    session: {
        strategy: "jwt"
    }
});
