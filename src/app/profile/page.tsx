"use client";
import { useAuth } from "@/contexts/AuthContext";


export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Your Profile</h1>
      <p>Name: {user?.firstName} {user?.lastName}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
