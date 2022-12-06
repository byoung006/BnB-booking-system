export interface SingleEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  creator: { email: string };
  organizer: { displayName: string; self: boolean; email: string };
  start: { date: string };
  end: { date: string };
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
    overrides: (
      | { method: string; minutes: number }
      | { method: string; minutes: number }
    )[];
  };
  eventType: string;
}
