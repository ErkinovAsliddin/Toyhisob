import { create } from "zustand";

interface BudgetState {
  step: number;
  city: string;
  guestCount: number;
  totalBudget: number;
  priorities: Record<string, number>;
  partnerName: string;
  weddingDate: string;
  setStep: (step: number) => void;
  setCity: (city: string) => void;
  setGuestCount: (count: number) => void;
  setTotalBudget: (budget: number) => void;
  setPriorities: (priorities: Record<string, number>) => void;
  setPartnerName: (name: string) => void;
  setWeddingDate: (date: string) => void;
  reset: () => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  step: 0,
  city: "Tashkent",
  guestCount: 100,
  totalBudget: 50_000_000,
  priorities: {
    catering: 35,
    venue: 25,
    photography: 10,
    music: 10,
    decoration: 10,
    clothing: 5,
    transport: 3,
    invitations: 1,
    gifts: 1,
  },
  partnerName: "",
  weddingDate: "",
  setStep: (step) => set({ step }),
  setCity: (city) => set({ city }),
  setGuestCount: (count) => set({ guestCount: count }),
  setTotalBudget: (budget) => set({ totalBudget: budget }),
  setPriorities: (priorities) => set({ priorities }),
  setPartnerName: (name) => set({ partnerName: name }),
  setWeddingDate: (date) => set({ weddingDate: date }),
  reset: () =>
    set({
      step: 0,
      city: "Tashkent",
      guestCount: 100,
      totalBudget: 50_000_000,
      priorities: {
        catering: 35,
        venue: 25,
        photography: 10,
        music: 10,
        decoration: 10,
        clothing: 5,
        transport: 3,
        invitations: 1,
        gifts: 1,
      },
      partnerName: "",
      weddingDate: "",
    }),
}));

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
