import { LighthouseScoresType } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";

const fetchLighhouseScores = async (): Promise<LighthouseScoresType[]> => {
  const response = await fetch("/api/lighthouse");
  if (!response.ok) {
    throw new Error("Failed to fetch lighthouse scores");
  }
  return response.json();
};

export const useLighthouseScores = () => {
  return useQuery({
    queryKey: ["lighhouse-scores"],
    queryFn: fetchLighhouseScores,
  });
};
