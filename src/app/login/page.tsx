"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "../../../lib/api";
import Toast from "../component/Toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const submit = async () => {
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      setToastMessage(res.message);
      router.push("/dashboard");
    } catch (error: any) {
      // ❌ show error message
      setToastMessage(error.message || "Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      {/* ✅ Toast Popup */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={submit}
      >
        Login
      </button>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
