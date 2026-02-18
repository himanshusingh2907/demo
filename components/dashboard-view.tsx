"use client";

import { useNotes } from "@/lib/notes-context";
import {
  FileText,
  Pin,
  Archive,
  Tag,
  TrendingUp,
  Clock,
} from "lucide-react";

export function DashboardView() {
  const { notes } = useNotes();

  const totalNotes = notes.length;
  const pinnedNotes = notes.filter((n) => n.isPinned).length;
  const archivedNotes = notes.filter((n) => n.isArchived).length;
  const activeNotes = notes.filter((n) => !n.isArchived).length;

  const allTags = notes.flatMap((n) => n.tags);
  const uniqueTags = new Set(allTags);

  const recentNotes = [...notes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  const tagCounts: Record<string, number> = {};
  allTags.forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const cards = [
    {
      label: "Total Notes",
      value: totalNotes,
      icon: FileText,
      accent: "hsl(var(--primary))",
      bg: "hsl(var(--accent))",
    },
    {
      label: "Active Notes",
      value: activeNotes,
      icon: TrendingUp,
      accent: "hsl(160, 60%, 40%)",
      bg: "hsl(160, 60%, 94%)",
    },
    {
      label: "Pinned",
      value: pinnedNotes,
      icon: Pin,
      accent: "hsl(220, 60%, 50%)",
      bg: "hsl(220, 60%, 94%)",
    },
    {
      label: "Archived",
      value: archivedNotes,
      icon: Archive,
      accent: "hsl(var(--muted-foreground))",
      bg: "hsl(var(--muted))",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p
          className="mt-1 text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Overview of your notes and activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-xl border p-5 transition-shadow hover:shadow-md"
            style={{ backgroundColor: "hsl(var(--card))" }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: card.bg }}
            >
              <card.icon className="h-5 w-5" style={{ color: card.accent }} />
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {card.label}
              </p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Notes */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "hsl(var(--card))" }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Clock
              className="h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <h3 className="font-semibold">Recently Updated</h3>
          </div>
          <div className="flex flex-col gap-3">
            {recentNotes.map((note) => (
              <div
                key={note._id}
                className="flex items-center justify-between rounded-lg p-3 transition-colors"
                style={{ backgroundColor: "hsl(var(--muted))" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {note.isPinned && (
                    <Pin
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  )}
                  <p className="truncate text-sm font-medium">{note.title}</p>
                </div>
                <span
                  className="ml-4 shrink-0 text-xs"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "hsl(var(--card))" }}
        >
          <div className="mb-4 flex items-center gap-2">
            <Tag
              className="h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <h3 className="font-semibold">Popular Tags</h3>
            <span
              className="ml-auto text-xs"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {uniqueTags.size} unique tags
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {topTags.map(([tag, count]) => (
              <div key={tag} className="flex items-center gap-3">
                <span
                  className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "hsl(var(--accent))",
                    color: "hsl(var(--accent-foreground))",
                  }}
                >
                  {tag}
                </span>
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: "hsl(var(--muted))" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(count / Math.max(...topTags.map(([, c]) => c))) * 100}%`,
                      backgroundColor: "hsl(var(--primary))",
                    }}
                  />
                </div>
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
