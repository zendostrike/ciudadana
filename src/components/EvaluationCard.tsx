import { Evaluation } from "@/helpers/useEvaluations";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Evaluation;
  onPress?: (item: Evaluation) => void;
};

export const EvaluationCard = ({ item, onPress }: Props) => {
  const truncated =
    item.description.length > 200
      ? item.description.slice(0, 200) + "..."
      : item.description;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress?.(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.address}</Text>

        <View style={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < item.globalRating ? "star" : "star-outline"}
              size={18}
              color="#FFD700"
            />
          ))}
          <Text style={styles.ratingText}>{item.globalRating.toFixed(1)}</Text>
        </View>

        <Text style={styles.description}>{truncated}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 90,
    height: "100%",
    objectFit: "cover",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "600",
    color: "#444",
  },
  description: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});
