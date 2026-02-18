"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Note } from "@/lib/types";
import { mockNotes } from "@/lib/mock-data";

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, "_id" | "user" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  toggleArchive: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(mockNotes);

  const addNote = useCallback(
    (note: Omit<Note, "_id" | "user" | "createdAt" | "updatedAt">) => {
      const newNote: Note = {
        ...note,
        _id: `n${Date.now()}`,
        user: "6650a1b2c3d4e5f6a7b8c9d0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
    },
    []
  );

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n._id === id
          ? { ...n, isPinned: !n.isPinned, updatedAt: new Date().toISOString() }
          : n
      )
    );
  }, []);

  const toggleArchive = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n._id === id
          ? { ...n, isArchived: !n.isArchived, updatedAt: new Date().toISOString() }
          : n
      )
    );
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, togglePin, toggleArchive }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
