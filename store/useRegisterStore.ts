import { create } from "zustand";

type Role = "FARMER" | "OWNER" | "AGENT";

interface RegisterState {
  step: number;
  role: Role;
  setStep: (step: number) => void;
  setRole: (role: Role) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  role: "FARMER", // Default role
  setStep: (step) => set({ step }),
  setRole: (role) => set({ role }),
  reset: () => set({ step: 1, role: "FARMER" }),
}));
