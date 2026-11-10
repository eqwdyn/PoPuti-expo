import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useColors } from "../shared/hooks/use-colors";
import { LoginForm } from "../features/auth/ui/LoginForm";
import { SafeBg } from "../shared/ui/SafeBg";
import { ScrollLayout } from "../shared/ui/ScrollLayout";
import { Link } from "expo-router";

export default function LoginScreen() {
  const colors = useColors();

  return (
    <SafeBg>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollLayout>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.textDark }]}>
              С возвращением!
            </Text>
            <Text style={[styles.subtitle, { color: colors.textGray }]}>
              Войдите, чтобы заказывать доставку или зарабатывать по пути.
            </Text>
          </View>

          <LoginForm />

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textGray }]}>
              Ещё нет аккаунта?
            </Text>
            <Link href="/register">
              <View
                style={[
                  styles.registerButton,
                  { backgroundColor: colors.cardBg },
                ]}
              >
                <Text
                  style={[styles.registerButtonText, { color: colors.primary }]}
                >
                  Зарегистрироваться
                </Text>
              </View>
            </Link>
          </View>
        </ScrollLayout>
      </KeyboardAvoidingView>
    </SafeBg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  logoSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  formContainer: {
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  eyeIcon: {
    padding: 8,
    marginRight: -8,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF", // Белый цвет текста кнопки остается всегда белым
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    marginBottom: 16,
  },
  registerButton: {
    borderRadius: 16,
    height: 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
