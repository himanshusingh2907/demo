"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { LoginForm, RegisterForm } from "@/components/auth-forms";
import { Sidebar, type View } from "@/components/sidebar";
import { DashboardView } from "@/components/dashboard-view";
import { NotesListView } from "@/components/notes-list-view";
import { NoteForm } from "@/components/note-form";
import { ProfileView } from "@/components/profile-view";
import type { Note } from "@/lib/types";
import { BookOpen } from "lucide-react";

export function AppShell() {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Auth screens
  if (!isAuthenticated) {
    return (
      <div
        className="flex min-h-svh flex-col items-center justify-center p-6"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        <div className="mb-8 flex items-center gap-2.5">
          <BookOpen className="h-8 w-8" style={{ color: "hsl(var(--primary))" }} />
          <span className="text-2xl font-bold tracking-tight">NoteVault</span>
        </div>
        {authMode === "login" ? (
          <LoginForm onSwitchToRegister={() => setAuthMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
        )}
      </div>
    );
  }

  // Note form (create / edit)
  if (isCreating || editingNote) {
    return (
      <div className="flex min-h-svh">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 lg:ml-64">
          <div className="mx-auto max-w-3xl p-6 pt-20 lg:pt-8">
            <NoteForm
              note={editingNote}
              onClose={() => {
                setIsCreating(false);
                setEditingNote(null);
              }}
            />
          </div>
        </main>
      </div>
    );
  }

  // Main app
  return (
    <div className="flex min-h-svh">
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          setEditingNote(null);
          setIsCreating(false);
        }}
      />
      <main className="flex-1 lg:ml-64">
        <div className="mx-auto max-w-6xl p-6 pt-20 lg:pt-8">
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "notes" && (
            <NotesListView
              onCreateNote={() => setIsCreating(true)}
              onEditNote={(note) => setEditingNote(note)}
            />
          )}
          {activeView === "profile" && <ProfileView />}
        </div>
      </main>
    </div>
  );
}
