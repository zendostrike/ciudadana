// src/app/(app)/home.tsx
import { EvaluationCard } from "@/components/EvaluationCard";
import { Evaluation, useEvaluations } from "@/helpers/useEvaluations";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const { getEvaluations } = useEvaluations();

  const navigateToNewEvaluation = () => {
    router.push("/(app)/new-evaluation");
  };

  useEffect(() => {
    async function fetchEvaluations() {
      const evaluations = await getEvaluations();
      setEvaluations(evaluations);
    }

    fetchEvaluations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = (id: string) => {
    router.push({
      pathname: "/(app)/evaluation-detail",
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Evaluaciones de Espacios Públicos</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#4CAF50",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={navigateToNewEvaluation}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Nueva Evaluación
        </Text>
      </TouchableOpacity>

      <FlatList
        data={evaluations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EvaluationCard
            item={item}
            onPress={(selected) => handlePress(selected.id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 50, color: "#666" }}>
            No hay evaluaciones aún. ¡Crea la primera!
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
});
