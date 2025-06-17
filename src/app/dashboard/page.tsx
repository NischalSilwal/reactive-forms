"use client";


import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  return (
    <div className="p-4">
      {user && <h1 className="text-2xl font-bold">Welcome to Dashboard, {user.firstName} {user.lastName}</h1>}
      <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={logout}>Logout</button>
    </div>
  );
}