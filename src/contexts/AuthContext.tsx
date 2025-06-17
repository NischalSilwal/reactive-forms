"use client";

import { GRAPHQL_MUTATIONS } from "@/config/api";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  tokens: Tokens | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:GRAPHQL_MUTATIONS.LOGIN,
        variables: {
          input: { email, password },
        },
      }),
    });
    const json = await response.json();
    const data = json.data.login;
    setUser(data.user);
    setTokens(data.tokens);
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};