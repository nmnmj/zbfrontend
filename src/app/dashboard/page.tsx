import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../component/LogoutButton";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default async function DashboardPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    }
  );

  if (!res.ok) {
    redirect("/login");
  }

  const data = await res.json();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Registered Users
        </h1>
        <LogoutButton />
      </div>

      <ul className="space-y-2">
        {data.users.map((u: User) => (
          <li key={u._id} className="border p-3 rounded bg-white">
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-gray-600">
              {u.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
