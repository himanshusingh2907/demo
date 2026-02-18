"use client";

import { useState, useMemo } from "react";
import { useNotes } from "@/lib/notes-context";
import type { Note } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Pin,
  Archive,
  ArchiveRestore,
  Trash2,
  Edit3,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

type FilterType = "all" | "active" | "pinned" | "archived";

export function NotesListView({
  onCreateNote,
  onEditNote,
}: {
  onCreateNote: () => void;
  onEditNote: (note: Note) => void;
}) {
  const { notes, deleteNote, togglePin, toggleArchive } = useNotes();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter
    if (filter === "active") result = result.filter((n) => !n.isArchived);
    if (filter === "pinned") result = result.filter((n) => n.isPinned);
    if (filter === "archived") result = result.filter((n) => n.isArchived);

    // Tag
    if (selectedTag) result = result.filter((n) => n.tags.includes(selectedTag));

    // Sort: pinned first, then by date
    result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [notes, search, filter, selectedTag]);

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Pinned", value: "pinned" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notes</h2>
          <p
            className="mt-1 text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={onCreateNote}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          <Plus className="h-4 w-4" />
          New Note
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              type="text"
              placeholder="Search notes by title, content, or tag..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                borderColor: "hsl(var(--border))",
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
              showFilters
                ? "border-[hsl(var(--primary))]"
                : "border-[hsl(var(--border))]"
            )}
            style={{
              backgroundColor: showFilters
                ? "hsl(var(--accent))"
                : "hsl(var(--card))",
              color: showFilters
                ? "hsl(var(--accent-foreground))"
                : "hsl(var(--foreground))",
            }}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div
            className="flex flex-wrap items-center gap-3 rounded-lg border p-4"
            style={{ backgroundColor: "hsl(var(--card))" }}
          >
            <div className="flex gap-1.5">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    setFilter(f.value);
                    setPage(1);
                  }}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                  )}
                  style={{
                    backgroundColor:
                      filter === f.value
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                    color:
                      filter === f.value
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--muted-foreground))",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {allTags.length > 0 && (
              <>
                <div
                  className="h-6 w-px"
                  style={{ backgroundColor: "hsl(var(--border))" }}
                />
                <div className="flex flex-wrap gap-1.5">
                  {selectedTag && (
                    <button
                      onClick={() => {
                        setSelectedTag(null);
                        setPage(1);
                      }}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: "hsl(var(--destructive))",
                        color: "hsl(var(--destructive-foreground))",
                      }}
                    >
                      <X className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(selectedTag === tag ? null : tag);
                        setPage(1);
                      }}
                      className="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor:
                          selectedTag === tag
                            ? "hsl(var(--primary))"
                            : "hsl(var(--accent))",
                        color:
                          selectedTag === tag
                            ? "hsl(var(--primary-foreground))"
                            : "hsl(var(--accent-foreground))",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Notes Grid */}
      {paginatedNotes.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border py-16"
          style={{ backgroundColor: "hsl(var(--card))" }}
        >
          <div
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(var(--muted))" }}
          >
            <Search
              className="h-5 w-5"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
          </div>
          <p className="font-medium">No notes found</p>
          <p
            className="mt-1 text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginatedNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => onEditNote(note)}
              onDelete={() => deleteNote(note._id)}
              onTogglePin={() => togglePin(note._id)}
              onToggleArchive={() => toggleArchive(note._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p
            className="text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleArchive,
}: {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
  onToggleArchive: () => void;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl border p-5 transition-all hover:shadow-md",
        note.isPinned && "ring-2 ring-[hsl(var(--primary))]/30"
      )}
      style={{
        backgroundColor: "hsl(var(--card))",
        borderColor: note.isPinned
          ? "hsl(var(--primary))"
          : "hsl(var(--border))",
      }}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <h3 className="pr-2 text-sm font-semibold leading-snug line-clamp-2">
          {note.title}
        </h3>
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={onTogglePin}
            className="rounded-md p-1.5 transition-colors"
            style={{
              color: note.isPinned
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
            aria-label={note.isPinned ? "Unpin note" : "Pin note"}
          >
            <Pin className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onEdit}
            className="rounded-md p-1.5 transition-colors"
            style={{ color: "hsl(var(--muted-foreground))" }}
            aria-label="Edit note"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onToggleArchive}
            className="rounded-md p-1.5 transition-colors"
            style={{ color: "hsl(var(--muted-foreground))" }}
            aria-label={note.isArchived ? "Unarchive note" : "Archive note"}
          >
            {note.isArchived ? (
              <ArchiveRestore className="h-3.5 w-3.5" />
            ) : (
              <Archive className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="rounded-md p-1.5 transition-colors hover:text-[hsl(var(--destructive))]"
            style={{ color: "hsl(var(--muted-foreground))" }}
            aria-label="Delete note"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p
        className="mb-4 flex-1 text-sm leading-relaxed line-clamp-3"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {note.description}
      </p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--accent-foreground))",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between border-t pt-3 text-xs"
        style={{
          color: "hsl(var(--muted-foreground))",
          borderColor: "hsl(var(--border))",
        }}
      >
        <span>
          {new Date(note.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <div className="flex gap-2">
          {note.isPinned && (
            <span
              className="flex items-center gap-1 font-medium"
              style={{ color: "hsl(var(--primary))" }}
            >
              <Pin className="h-3 w-3" />
              Pinned
            </span>
          )}
          {note.isArchived && (
            <span className="flex items-center gap-1">
              <Archive className="h-3 w-3" />
              Archived
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
