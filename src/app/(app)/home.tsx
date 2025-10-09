import { EvaluationCard } from "@/components/EvaluationCard";
import { Evaluation, useEvaluations } from "@/helpers/useEvaluations";
import { Ionicons } from "@expo/vector-icons";
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
  }, []);

  const handlePress = (id: string) => {
    router.push({
      pathname: "/(app)/evaluation-detail",
      params: { id },
    });
  };

  const navigateToProfile = () => {
    router.push("/(app)/profile");
  };

  const navigateToSettings = () => {
    router.push("/(app)/settings");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Evaluaciones de Espacios Públicos</Text>

      <TouchableOpacity
        style={styles.newButton}
        onPress={navigateToNewEvaluation}
      >
        <Text style={styles.newButtonText}>Nueva Evaluación</Text>
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
          <Text style={styles.emptyText}>
            No hay evaluaciones aún. ¡Crea la primera!
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToProfile}>
          <Ionicons name="person-circle-outline" size={28} color="#4CAF50" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={navigateToSettings}>
          <Ionicons name="settings-outline" size={26} color="#4CAF50" />
          <Text style={styles.navLabel}>Configuración</Text>
        </TouchableOpacity>
      </View>
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
  newButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  newButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
  },
});
