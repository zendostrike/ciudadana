import { Evaluation, useEvaluations } from "@/helpers/useEvaluations";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EvaluationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getEvaluation } = useEvaluations();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    const load = async () => {
      const found = await getEvaluation(id as string);
      setEvaluation(found || null);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!evaluation) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Cargando evaluación...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color="#007bff" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      {evaluation.image ? (
        <Image source={{ uri: evaluation.image }} style={styles.headerImage} />
      ) : (
        <View style={[styles.headerImage, styles.imagePlaceholder]}>
          <Ionicons name="image-outline" size={40} color="#ccc" />
        </View>
      )}

      <Text style={styles.title}>{evaluation.title}</Text>
      <Text style={styles.address}>{evaluation.address}</Text>
      <Text style={styles.date}>{formatDate(evaluation.date)}</Text>

      <View style={styles.ratingContainer}>
        {renderStars(evaluation.globalRating)}
        <Text style={styles.ratingText}>
          {evaluation.globalRating.toFixed(1)}
        </Text>
      </View>

      <Text style={styles.description}>{evaluation.description}</Text>

      <Text style={styles.sectionTitle}>Subcalificaciones</Text>

      {evaluation.subRatings.map((sub) => (
        <View key={sub.category} style={styles.subCard}>
          <View style={styles.subHeader}>
            <Text style={styles.subTitle}>{formatLabel(sub.category)}</Text>
            <View style={styles.subRating}>
              {renderStars(sub.score, 14)}
              <Text style={styles.subScore}>{sub.score.toFixed(1)}</Text>
            </View>
          </View>

          {sub.observation ? (
            <Text style={styles.observation}>📝 {sub.observation}</Text>
          ) : (
            <Text style={styles.observationMuted}>Sin observaciones</Text>
          )}

          {sub.evidence.length > 0 ? (
            <FlatList
              data={sub.evidence}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.evidenceImage} />
              )}
              keyExtractor={(item, i) => `${sub.category}-evidence-${i}`}
            />
          ) : (
            <Text style={styles.noEvidence}>📷 Sin evidencia</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

// --- Helpers ---
const formatLabel = (key: string) => {
  const map: Record<string, string> = {
    greenAreas: "Áreas verdes",
    waterQuality: "Calidad del agua",
    noise: "Ruido ambiental",
    publicLighting: "Alumbrado público",
    roadsQuality: "Calidad de vías",
    security: "Seguridad",
    sidewalksQuality: "Veredas",
    accessibility: "Accesibilidad",
  };
  return map[key] || key;
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const renderStars = (rating: number, size = 18) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={size} color="#f5b800" />
      ))}
      {halfStar && <Ionicons name="star-half" size={size} color="#f5b800" />}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={size}
          color="#f5b800"
        />
      ))}
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafc",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafc",
  },
  loadingText: {
    color: "#777",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    color: "#007bff",
    fontWeight: "500",
    marginLeft: 5,
  },
  headerImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
  },
  imagePlaceholder: {
    backgroundColor: "#e9edf5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#f5b800",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  subScore: {
    marginLeft: 5,
    fontWeight: "500",
    color: "#f5b800",
  },
  observation: {
    color: "#555",
    marginTop: 8,
    marginBottom: 5,
  },
  observationMuted: {
    color: "#aaa",
    marginTop: 8,
    marginBottom: 5,
    fontStyle: "italic",
  },
  evidenceImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
  noEvidence: {
    fontSize: 13,
    color: "#999",
  },
});
