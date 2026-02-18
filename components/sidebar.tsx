"use client";

import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  UserCircle,
  LogOut,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

export type View = "dashboard" | "notes" | "profile";

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const navItems: { label: string; value: View; icon: typeof LayoutDashboard }[] = [
  { label: "Dashboard", value: "dashboard", icon: LayoutDashboard },
  { label: "Notes", value: "notes", icon: FileText },
  { label: "Profile", value: "profile", icon: UserCircle },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: View) => {
    onViewChange(view);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b px-4 lg:hidden"
        style={{
          backgroundColor: "hsl(var(--sidebar))",
          borderColor: "hsl(var(--sidebar-border))",
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
          <span
            className="text-base font-bold"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            NoteVault
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ color: "hsl(var(--sidebar-foreground))" }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          backgroundColor: "hsl(var(--sidebar))",
          borderColor: "hsl(var(--sidebar-border))",
        }}
      >
        {/* Logo */}
        <div
          className="flex h-16 items-center gap-2.5 border-b px-6"
          style={{ borderColor: "hsl(var(--sidebar-border))" }}
        >
          <BookOpen className="h-6 w-6" style={{ color: "hsl(var(--primary))" }} />
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            NoteVault
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeView === item.value;
              return (
                <li key={item.value}>
                  <button
                    onClick={() => handleNav(item.value)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                    )}
                    style={{
                      backgroundColor: isActive
                        ? "hsl(var(--sidebar-accent))"
                        : "transparent",
                      color: isActive
                        ? "hsl(var(--sidebar-accent-foreground))"
                        : "hsl(var(--sidebar-muted))",
                    }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div
          className="border-t p-4"
          style={{ borderColor: "hsl(var(--sidebar-border))" }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              {user?.username?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-sm font-medium"
                style={{ color: "hsl(var(--sidebar-foreground))" }}
              >
                {user?.username ?? "User"}
              </p>
              <p
                className="truncate text-xs"
                style={{ color: "hsl(var(--sidebar-muted))" }}
              >
                {user?.email ?? "user@example.com"}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            style={{ color: "hsl(var(--sidebar-muted))" }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
