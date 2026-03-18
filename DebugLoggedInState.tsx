"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const DebugLoggedInState = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const loggedIn = status === "authenticated";
    const user = session?.user;
    //console.log("SESSION STATUS:", status);
    useEffect(() => {
        console.log("LOADING:", loading);
        console.log("LOGGED IN:", loggedIn);
        console.log("STATUS:", status);
        console.log("SESSION USER DATA:", user);
    }, [loggedIn, loading, status, user]);
    return (
        <div></div>
    )
}

export default DebugLoggedInState