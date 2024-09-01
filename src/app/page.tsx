import { Button } from "@/components/shadcn/button";
import { auth } from "@/lib/auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/register");
    }

    return (
        <div className="relative">
            <Button
                className="absolute top-0 right-0"
                onClick={signOut as any}
            >
                Logout
            </Button>
            <p>login as : {session?.user.email}</p>
        </div>
    );
}
