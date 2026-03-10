"use client";
import type { AuthStore } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: '',
            setAccessToken: (newVal: string) => set({ accessToken: newVal }),
            loggedIn: false,
            setLoggedIn: (val: boolean) => set({ loggedIn: val }),
            refreshToken: "",
            setRefreshToken: (newVal: string) => {
                set({ refreshToken: newVal })
                localStorage.setItem("refreshToken", newVal)
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken
            }),
        }
    )
);