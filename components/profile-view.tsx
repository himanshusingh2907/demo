"use client";

import { useAuth } from "@/lib/auth-context";
import { Mail, User, Calendar } from "lucide-react";

export function ProfileView() {
  const { user } = useAuth();

  if (!user) return null;

  const profileItems = [
    {
      label: "Username",
      value: user.username,
      icon: User,
    },
    {
      label: "Email",
      value: user.email,
      icon: Mail,
    },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      icon: Calendar,
    },
    {
      label: "Last Updated",
      value: new Date(user.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      icon: Calendar,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p
          className="mt-1 text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Your account information
        </p>
      </div>

      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "hsl(var(--card))" }}
      >
        {/* Avatar */}
        <div className="mb-6 flex items-center gap-5">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p
              className="text-sm"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {user.email}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-lg p-4"
              style={{ backgroundColor: "hsl(var(--muted))" }}
            >
              <item.icon
                className="h-5 w-5 shrink-0"
                style={{ color: "hsl(var(--muted-foreground))" }}
              />
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {item.label}
                </p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints Info */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "hsl(var(--card))" }}
      >
        <h3 className="mb-4 font-semibold">API Endpoints</h3>
        <div className="flex flex-col gap-2">
          {[
            { method: "POST", path: "/api/users/register", desc: "Create account" },
            { method: "POST", path: "/api/users/login", desc: "Sign in" },
            { method: "GET", path: "/api/users/me", desc: "Get profile" },
            { method: "POST", path: "/api/users/refresh", desc: "Refresh token" },
            { method: "POST", path: "/api/users/logout", desc: "Sign out" },
            { method: "POST", path: "/api/notes/createNote", desc: "Create note" },
            { method: "GET", path: "/api/notes/getNote", desc: "Get user notes" },
            { method: "PUT", path: "/api/notes/:noteId", desc: "Update note" },
            { method: "DELETE", path: "/api/notes/:noteId", desc: "Delete note" },
          ].map((endpoint) => (
            <div
              key={endpoint.path + endpoint.method}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-mono"
              style={{ backgroundColor: "hsl(var(--muted))" }}
            >
              <span
                className="w-16 shrink-0 rounded px-1.5 py-0.5 text-center text-xs font-bold"
                style={{
                  backgroundColor:
                    endpoint.method === "GET"
                      ? "hsl(160, 60%, 90%)"
                      : endpoint.method === "POST"
                        ? "hsl(220, 60%, 90%)"
                        : endpoint.method === "PUT"
                          ? "hsl(40, 80%, 90%)"
                          : "hsl(0, 60%, 90%)",
                  color:
                    endpoint.method === "GET"
                      ? "hsl(160, 60%, 30%)"
                      : endpoint.method === "POST"
                        ? "hsl(220, 60%, 30%)"
                        : endpoint.method === "PUT"
                          ? "hsl(40, 80%, 30%)"
                          : "hsl(0, 60%, 30%)",
                }}
              >
                {endpoint.method}
              </span>
              <span className="flex-1 truncate text-xs">{endpoint.path}</span>
              <span
                className="shrink-0 text-xs font-sans"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {endpoint.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
