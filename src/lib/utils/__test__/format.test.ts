import { formatDuration, formatRelativeTime } from "../format";

describe("formatDuration", () => {
  it("should return — for null input", () => {
    expect(formatDuration(null)).toBe("-");
  });
  it("should return <1s for 0 seconds", () => {
    expect(formatDuration(0)).toBe("0s");
  });
  it("should return seconds for values under 60", () => {
    expect(formatDuration(45)).toBe("45s");
  });
  it("should return minutes and seconds for values over 60", () => {
    expect(formatDuration(72)).toBe("1m 12s");
  });
  it("should return exact minutes when no seconds remain", () => {
    expect(formatDuration(120)).toBe("2m");
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-06-09T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("should return seconds ago", () => {
    expect(formatRelativeTime("2026-06-09T11:59:30Z")).toBe("30s ago");
  });
  it("should return minutes ago", () => {
    expect(formatRelativeTime("2026-06-09T11:55:00Z")).toBe("5m ago");
  });
  it("should return hours ago", () => {
    expect(formatRelativeTime("2026-06-09T09:00:00Z")).toBe("3h ago");
  });
  it("should return days ago", () => {
    expect(formatRelativeTime("2026-06-07T12:00:00Z")).toBe("2d ago");
  });
});
