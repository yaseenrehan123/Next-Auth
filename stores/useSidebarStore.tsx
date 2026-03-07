"use client";
import type { SidebarStore } from "@/lib/types";
import { create } from "zustand";

export const useSidebarStore = create<SidebarStore>((set) => ({
    enabled: false,
    setEnabled: (newVal: boolean) => set(() => ({ enabled: newVal }))
}));