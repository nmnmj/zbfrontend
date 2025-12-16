import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Call BACKEND (Render)
  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message || "Login failed" },
      { status: backendRes.status }
    );
  }

  const response = NextResponse.json({
    message: "Login successful"
  });

  const isProd = process.env.NODE_ENV === "production";

  // ✅ COOKIE SET BY NEXT.JS (VERCEL DOMAIN)
  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 60 * 60 * 24,
    path: "/"
  });

  return response;
}
