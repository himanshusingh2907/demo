import type { Note, User } from "./types";

export const mockUser: User = {
  id: "6650a1b2c3d4e5f6a7b8c9d0",
  username: "JaneDoe",
  email: "jane@example.com",
  createdAt: "2025-12-01T10:30:00.000Z",
  updatedAt: "2026-02-15T08:00:00.000Z",
};

export const mockNotes: Note[] = [
  {
    _id: "n1",
    user: mockUser.id,
    title: "Project Kickoff Meeting Notes",
    description:
      "Discussed project timeline, deliverables, and team responsibilities. Key milestone: MVP delivery by end of March. Need to finalize tech stack decisions this week.",
    tags: ["work", "meeting", "project"],
    isPinned: true,
    isArchived: false,
    createdAt: "2026-02-10T09:00:00.000Z",
    updatedAt: "2026-02-10T09:00:00.000Z",
  },
  {
    _id: "n2",
    user: mockUser.id,
    title: "Grocery Shopping List",
    description:
      "Organic eggs, whole wheat bread, avocados, cherry tomatoes, chicken breast, greek yogurt, almonds, spinach, olive oil, and sparkling water.",
    tags: ["personal", "shopping"],
    isPinned: false,
    isArchived: false,
    createdAt: "2026-02-12T14:20:00.000Z",
    updatedAt: "2026-02-14T10:00:00.000Z",
  },
  {
    _id: "n3",
    user: mockUser.id,
    title: "React Performance Optimization Tips",
    description:
      "Use React.memo for expensive components, useMemo for derived data, useCallback for stable references. Avoid unnecessary re-renders by structuring state carefully. Consider code splitting with lazy loading.",
    tags: ["tech", "react", "learning"],
    isPinned: true,
    isArchived: false,
    createdAt: "2026-02-08T16:45:00.000Z",
    updatedAt: "2026-02-13T11:30:00.000Z",
  },
  {
    _id: "n4",
    user: mockUser.id,
    title: "Weekend Trip Planning",
    description:
      "Destination: Lake Tahoe. Check hotel availability for March 15-17. Book rental car. Pack hiking gear and camera. Look into skiing conditions.",
    tags: ["personal", "travel"],
    isPinned: false,
    isArchived: false,
    createdAt: "2026-02-05T20:00:00.000Z",
    updatedAt: "2026-02-05T20:00:00.000Z",
  },
  {
    _id: "n5",
    user: mockUser.id,
    title: "API Design Best Practices",
    description:
      "Use consistent naming conventions. Version your APIs. Implement proper error handling with meaningful status codes. Use pagination for list endpoints. Add rate limiting.",
    tags: ["tech", "backend"],
    isPinned: false,
    isArchived: false,
    createdAt: "2026-01-28T12:00:00.000Z",
    updatedAt: "2026-02-01T09:15:00.000Z",
  },
  {
    _id: "n6",
    user: mockUser.id,
    title: "Book Recommendations from Team",
    description:
      "Clean Code by Robert Martin, Designing Data-Intensive Applications by Martin Kleppmann, The Pragmatic Programmer by David Thomas. Start with Clean Code first.",
    tags: ["reading", "learning"],
    isPinned: false,
    isArchived: true,
    createdAt: "2026-01-15T18:30:00.000Z",
    updatedAt: "2026-02-10T07:00:00.000Z",
  },
  {
    _id: "n7",
    user: mockUser.id,
    title: "Workout Routine - Week Plan",
    description:
      "Monday: Upper body. Tuesday: Cardio 30min. Wednesday: Lower body. Thursday: Rest. Friday: Full body. Saturday: Yoga. Sunday: Rest. Track progress in the fitness app.",
    tags: ["personal", "fitness"],
    isPinned: false,
    isArchived: false,
    createdAt: "2026-02-01T07:00:00.000Z",
    updatedAt: "2026-02-15T07:00:00.000Z",
  },
  {
    _id: "n8",
    user: mockUser.id,
    title: "Q1 Budget Review",
    description:
      "Monthly expenses breakdown: rent, utilities, groceries, subscriptions, transportation. Total savings goal: 20% of income. Review investment portfolio allocation by end of February.",
    tags: ["finance", "personal"],
    isPinned: false,
    isArchived: true,
    createdAt: "2026-01-05T10:00:00.000Z",
    updatedAt: "2026-01-20T14:00:00.000Z",
  },
  {
    _id: "n9",
    user: mockUser.id,
    title: "Database Migration Checklist",
    description:
      "Backup existing data. Test migration script on staging. Verify foreign key constraints. Update ORM models. Run integration tests. Monitor performance after migration. Rollback plan ready.",
    tags: ["tech", "work", "database"],
    isPinned: true,
    isArchived: false,
    createdAt: "2026-02-14T11:00:00.000Z",
    updatedAt: "2026-02-16T09:30:00.000Z",
  },
  {
    _id: "n10",
    user: mockUser.id,
    title: "Birthday Party Ideas for Sarah",
    description:
      "Theme: garden party. Venue: backyard or local park. Guest list: 20 people. Food: catering from Italian restaurant. Cake: chocolate with raspberry. Decorations: fairy lights and flowers.",
    tags: ["personal", "event"],
    isPinned: false,
    isArchived: false,
    createdAt: "2026-02-11T15:00:00.000Z",
    updatedAt: "2026-02-11T15:00:00.000Z",
  },
];
