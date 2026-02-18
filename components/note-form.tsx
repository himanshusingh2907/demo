"use client";

import { useState } from "react";
import { useNotes } from "@/lib/notes-context";
import type { Note } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, X, Plus } from "lucide-react";

interface NoteFormProps {
  note?: Note | null;
  onClose: () => void;
}

export function NoteForm({ note, onClose }: NoteFormProps) {
  const { addNote, updateNote } = useNotes();
  const isEditing = !!note;

  const [title, setTitle] = useState(note?.title ?? "");
  const [description, setDescription] = useState(note?.description ?? "");
  const [tags, setTags] = useState<string[]>(note?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [isPinned, setIsPinned] = useState(note?.isPinned ?? false);
  const [isArchived, setIsArchived] = useState(note?.isArchived ?? false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    else if (title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters";
    else if (title.trim().length > 100)
      newErrors.title = "Title must be less than 100 characters";

    if (!description.trim()) newErrors.description = "Description is required";
    else if (description.trim().length < 5)
      newErrors.description = "Description must be at least 5 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing && note) {
      updateNote(note._id, { title, description, tags, isPinned, isArchived });
    } else {
      addNote({ title, description, tags, isPinned, isArchived });
    }
    onClose();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
          style={{
            backgroundColor: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
          }}
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isEditing ? "Edit Note" : "Create Note"}
          </h2>
          <p
            className="mt-0.5 text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {isEditing
              ? "Update your note details"
              : "Fill in the details for your new note"}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border p-6"
        style={{ backgroundColor: "hsl(var(--card))" }}
      >
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="note-title"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Title
          </label>
          <input
            id="note-title"
            type="text"
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "w-full rounded-lg border py-2.5 px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent",
              errors.title
                ? "border-[hsl(var(--destructive))]"
                : "border-[hsl(var(--border))]"
            )}
            style={{
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
            }}
          />
          {errors.title && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="note-description"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Description
          </label>
          <textarea
            id="note-description"
            placeholder="Write your note content here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className={cn(
              "w-full rounded-lg border py-2.5 px-3 text-sm outline-none transition-colors resize-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent leading-relaxed",
              errors.description
                ? "border-[hsl(var(--destructive))]"
                : "border-[hsl(var(--border))]"
            )}
            style={{
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
            }}
          />
          {errors.description && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.description}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1 rounded-lg border py-2.5 px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
              style={{
                backgroundColor: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                borderColor: "hsl(var(--border))",
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: "hsl(var(--muted))",
                color: "hsl(var(--foreground))",
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "hsl(var(--accent))",
                    color: "hsl(var(--accent-foreground))",
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="h-4 w-4 rounded accent-[hsl(var(--primary))]"
            />
            <span>Pin this note</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isArchived}
              onChange={(e) => setIsArchived(e.target.checked)}
              className="h-4 w-4 rounded accent-[hsl(var(--primary))]"
            />
            <span>Archive this note</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            {isEditing ? "Save Changes" : "Create Note"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: "hsl(var(--card))",
              color: "hsl(var(--foreground))",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
