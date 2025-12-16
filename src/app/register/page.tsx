"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(form)
    });

    if (res.ok) router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>

      <input
        className="input"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>
        Register
      </button>

      {/* ✅ Login Redirect */}
      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
