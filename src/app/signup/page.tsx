"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SignupFormValues, SignupInput, ApiResponse } from "@/app/types/auth";
import { GRAPHQL_MUTATIONS } from "@/config/api";


export default function SignupPage() {
  const router = useRouter();
  const [responseMsg, setResponseMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignupFormValues>({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GRAPHQL_MUTATIONS.SIGNUP,
          variables: {
            input: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
            },
          },
        }),
      });

      const json = await response.json();

      if (json.errors) {
        setResponseMsg("Signup failed: " + json.errors[0].message);
      } else {
        setResponseMsg("Signup successful!");
        reset();
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
    } catch (err) {
      setResponseMsg("Network error or server not running.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black">Welcome</h1>
          <p className="text-gray-600 mt-1">Sign up to your SojoLink account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              placeholder="First Name"
              {...register("firstName", { 
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 text-black"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              placeholder="Last Name"
              {...register("lastName", { 
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 text-black"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>

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
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                    hasNumber: (value) =>
                      /[0-9]/.test(value) || "Password must contain at least one number",
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 text-black"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-1">Password must contain:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>At least 6 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {responseMsg && (
          <div
            className={`mt-4 p-3 rounded-md ${
              responseMsg.includes("failed")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {responseMsg}
          </div>
        )}

        <div className="text-center mt-8 text-xs text-gray-500">
          By clicking continue, you agree to our
          <br />
          <span className="font-medium">Terms of Service</span> and{" "}
          <span className="font-medium">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}