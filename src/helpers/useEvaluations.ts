import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

const EVALUATIONS_KEY = "evaluations";

export interface SubRating {
  category: string;
  score: number;
  observation: string;
  evidence: string[];
}

export type Evaluation = {
  id: string;
  title: string;
  address: string;
  description: string;
  date: string;
  globalRating: number;
  image: string;
  subRatings: SubRating[];
};

export function useEvaluations() {
  const getEvaluations = useCallback(async (): Promise<Evaluation[]> => {
    try {
      const json = await AsyncStorage.getItem(EVALUATIONS_KEY);
      return json ? JSON.parse(json) : [];
    } catch (error) {
      console.error("Error retrieving evaluations:", error);
      return [];
    }
  }, []);

  const saveEvaluation = useCallback(async (evaluation: Omit<Evaluation, "id">) => {
    try {
      const existing = await getEvaluations();
      const newEvaluation = {
        ...evaluation,
        id: Date.now().toString(), // simple unique ID
      };
      const updated = [...existing, newEvaluation];
      await AsyncStorage.setItem(EVALUATIONS_KEY, JSON.stringify(updated));
      return newEvaluation;
    } catch (error) {
      console.error("Error saving evaluation:", error);
      return null;
    }
  }, [getEvaluations]);

  const clearEvaluations = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(EVALUATIONS_KEY);
    } catch (error) {
      console.error("Error clearing evaluations:", error);
    }
  }, []);

  const getEvaluation = async (id: string): Promise<Evaluation | null> => {
    try {
      const evaluations = await getEvaluations();
      const evaluation = evaluations.find((e) => e.id === id);
      return evaluation || null;
    } catch (error) {
      console.error("Error getting evaluation:", error);
      return null;
    }
  };

  return { getEvaluations, saveEvaluation, clearEvaluations, getEvaluation };
}
