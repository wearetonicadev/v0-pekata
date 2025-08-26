"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await api.post("/admin/user-login/do-login/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Company-Slug": "tonica",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);

      router.push("/");
      router.refresh();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {loginMutation.error && (
            <div className="text-red-600 text-sm text-center">
              {loginMutation.error.message}
            </div>
          )}

          <div>
            <Button type="submit" disabled={loginMutation.isPending}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
