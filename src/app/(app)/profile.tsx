import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const user = {
    name: "Gian Ramirez",
    email: "gian.ramirez@example.com",
    joined: "Enero 2025",
    evaluationsCount: 12,
    avgRating: 4.3,
    avatar:
      "https://ui-avatars.com/api/?name=Gian+Ramirez&background=4CAF50&color=fff&size=128",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="clipboard-outline" size={26} color="#4CAF50" />
          <Text style={styles.statValue}>{user.evaluationsCount}</Text>
          <Text style={styles.statLabel}>Evaluaciones</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="star-outline" size={26} color="#4CAF50" />
          <Text style={styles.statValue}>{user.avgRating}</Text>
          <Text style={styles.statLabel}>Promedio</Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Información</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
          <Text style={styles.infoText}>Miembro desde {user.joined}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.primaryButton}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="log-out-outline" size={20} color="#4CAF50" />
          <Text style={styles.secondaryButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9ff",
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  infoSection: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  secondaryButtonText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 16,
  },
});
