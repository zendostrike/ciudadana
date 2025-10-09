import { useEvaluations } from "@/helpers/useEvaluations";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SUB_RATINGS = [
  "greenAreas",
  "waterQuality",
  "noise",
  "publicLighting",
  "roadsQuality",
  "security",
  "sidewalksQuality",
  "accessibility",
];

export default function NewEvaluationScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    address: "",
    description: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    subRatings: SUB_RATINGS.map((key) => ({
      key,
      score: 0,
      observation: "",
      evidence: [],
    })),
  });

  const { saveEvaluation } = useEvaluations();

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubRatingChange = (index: number, field: string, value: any) => {
    const updated = [...form.subRatings];
    updated[index][field] = value;
    setForm({ ...form, subRatings: updated });
  };

  const globalRating = useMemo(() => {
    const total = form.subRatings.reduce(
      (sum, r) => sum + Number(r.score || 0),
      0
    );
    return (total / form.subRatings.length).toFixed(1);
  }, [form.subRatings]);

  const handleSubmit = async () => {
    const evaluation = {
      ...form,
      globalRating,
    };

    const newEval = {
      title: evaluation.title,
      address: evaluation.address,
      description: evaluation.description,
      date: new Date().toISOString(),
      globalRating: globalRating ? parseFloat(globalRating) : 0,
      subRatings: evaluation.subRatings.map((sub) => ({
        category: sub.key,
        score: sub.score,
        observation: sub.observation,
        evidence: sub.evidence || [],
      })),
      image: evaluation.image.trim() || "https://via.placeholder.com/150", // fallback placeholder
    };

    const saved = await saveEvaluation(newEval);

    if (saved) {
      router.push("/(app)/home");
    } else {
      alert("Error al guardar la evaluación. Intenta nuevamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color="#007bff" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Nueva Evaluación</Text>
      <Text style={styles.subtitle}>Evalúa un área pública de tu ciudad</Text>

      <TextInput
        placeholder="Título de la evaluación"
        style={styles.input}
        value={form.title}
        onChangeText={(text) => handleChange("title", text)}
      />
      <TextInput
        placeholder="Dirección o referencia"
        style={styles.input}
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <TextInput
        placeholder="Descripción (máx. 200 caracteres)"
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        multiline
        maxLength={200}
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      {/* 🖼 Image URL Input */}
      <TextInput
        placeholder="URL de imagen (opcional)"
        style={styles.input}
        value={form.image}
        onChangeText={(text) => handleChange("image", text)}
      />

      {form.image.trim() !== "" && (
        <Image source={{ uri: form.image }} style={styles.previewImage} />
      )}

      <Text style={styles.sectionTitle}>Subcalificaciones</Text>

      {form.subRatings.map((sub, index) => (
        <View key={sub.key} style={styles.subRatingCard}>
          <Text style={styles.subTitle}>{formatLabel(sub.key)}</Text>

          <View style={styles.sliderRow}>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
              minimumTrackTintColor="#007bff"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#007bff"
              value={sub.score}
              onValueChange={(value) =>
                handleSubRatingChange(index, "score", value)
              }
            />
            <Text style={styles.scoreLabel}>{sub.score.toFixed(1)}</Text>
          </View>

          <TextInput
            placeholder="Observaciones"
            style={[styles.input, { height: 60 }]}
            value={sub.observation}
            onChangeText={(text) =>
              handleSubRatingChange(index, "observation", text)
            }
          />

          <TouchableOpacity style={styles.evidenceButton}>
            <Text style={styles.evidenceText}>📸 Agregar evidencia</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Guardar evaluación</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const formatLabel = (key: string) => {
  const labels: Record<string, string> = {
    greenAreas: "Áreas verdes",
    waterQuality: "Calidad del agua",
    noise: "Ruido ambiental",
    publicLighting: "Alumbrado público",
    roadsQuality: "Calidad de las vías",
    security: "Seguridad",
    sidewalksQuality: "Veredas",
    accessibility: "Accesibilidad",
  };
  return labels[key] || key;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9fafc",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3b3b3b",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  subRatingCard: {
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
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  scoreLabel: {
    width: 35,
    textAlign: "center",
    fontWeight: "500",
    color: "#007bff",
  },
  evidenceButton: {
    backgroundColor: "#f1f5ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  evidenceText: {
    color: "#007bff",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
});
