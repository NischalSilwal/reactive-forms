"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResponseMsg("");

    try {
      await login(data.email, data.password);
      setResponseMsg("Login successful! Redirecting...");
      reset();
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err: any) {
      setResponseMsg(err.message || "Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in to your SojoLink account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="m@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email must be valid",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 text-black"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-500 font-medium hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {responseMsg && (
          <div
            className={`mt-4 p-3 rounded-md ${
              responseMsg.includes("failed") || responseMsg.includes("Error")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {responseMsg}
          </div>
        )}

        <div className="text-center mt-8 text-xs text-gray-500">
          By signing in, you agree to our
          <br />
          <span className="font-medium">Terms of Service</span> and{" "}
          <span className="font-medium">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}