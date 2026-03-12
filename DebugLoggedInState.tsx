"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const DebugLoggedInState = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const loggedIn = status === "authenticated";
    //console.log("SESSION STATUS:", status);
    useEffect(() => {
        console.log("LOADING:", loading);
        console.log("LOGGED IN:", loggedIn);
        console.log("STATUS:", status);
    }, [loggedIn, loading, status]);
    return (
        <div></div>
    )
}

export default DebugLoggedInState