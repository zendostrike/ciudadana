import { useAuth } from "@/helpers/useAuth";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { signUp } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { fullName, email, password } = data;
    const user = await signUp(email, password, fullName);
    if (!user) {
      alert(
        "Ocurrió un error durante el registro (quizá el correo ya está registrado)"
      );
      return;
    }

    router.push("/(app)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>Únete para comenzar tu experiencia</Text>

        <Controller
          control={control}
          name="fullName"
          rules={{ required: "El nombre completo es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Nombre completo"
              style={[
                styles.input,
                errors.fullName && { borderColor: "#f87171" },
              ]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: "El correo es obligatorio",
            pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Correo electrónico"
              style={[styles.input, errors.email && { borderColor: "#f87171" }]}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              style={[
                styles.input,
                errors.password && { borderColor: "#f87171" },
              ]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Debes confirmar la contraseña",
            validate: (val) => {
              const { password } = getValues();
              return val === password || "Las contraseñas no coinciden";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Confirma tu contraseña"
              secureTextEntry
              style={[
                styles.input,
                errors.confirmPassword && { borderColor: "#f87171" },
              ]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
          <Link href="/(auth)/sign-in">
            <Text style={styles.footerLink}>Iniciar sesión</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 25,
  },
  input: {
    height: 48,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#f9fafb",
    marginBottom: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 8,
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
    marginRight: 4,
  },
  footerLink: {
    color: "#6366f1",
    fontWeight: "600",
    fontSize: 14,
  },
});
