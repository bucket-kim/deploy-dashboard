export const formatDuration = (seconds: number | null): string => {
  if (seconds === null) return "-";
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return sec > 0 ? `${mins}m ${sec}s` : `${mins}m`;
};

export const formatRelativeTime = (dateString: string): string => {
  const now = new Date().getTime();
  const past = new Date(dateString).getTime();
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
};
