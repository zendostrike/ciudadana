// src/app/(app)/settings.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Configuración</Text>

      <View style={styles.settingCard}>
        <Ionicons name="color-palette-outline" size={24} color="#4CAF50" />
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>Tema oscuro</Text>
          <Text style={styles.settingSubtitle}>
            Cambia el modo de color de la aplicación
          </Text>
        </View>
        <Switch
          value={isDarkTheme}
          onValueChange={setIsDarkTheme}
          trackColor={{ false: "#ccc", true: "#A5D6A7" }}
          thumbColor={isDarkTheme ? "#4CAF50" : "#f4f3f4"}
        />
      </View>

      <View style={styles.settingCard}>
        <Ionicons name="notifications-outline" size={24} color="#4CAF50" />
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>Notificaciones</Text>
          <Text style={styles.settingSubtitle}>
            Activa o desactiva todas las notificaciones
          </Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#ccc", true: "#A5D6A7" }}
          thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión 1.0.0</Text>
        <Text style={styles.footerBrand}>Hecho con ❤️ en Ciudadana</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9ff",
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 30,
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  settingSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
  },
  footerText: {
    fontSize: 13,
    color: "#aaa",
  },
  footerBrand: {
    fontSize: 13,
    color: "#4CAF50",
    marginTop: 4,
  },
});
