import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the store
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, // Default state
  login: () => set({ isAuthenticated: true }), // Login action
  logout: () => set({ isAuthenticated: false }), // Logout action
}));
