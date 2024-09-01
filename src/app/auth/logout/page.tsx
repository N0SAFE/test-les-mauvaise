'use client'

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
    useEffect(() => {
        signOut({ callbackUrl: "/auth/register" });
    }, [])
    return <div>Logging out...</div>;
};
export default LogoutPage;
