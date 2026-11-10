import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeBg } from "@shared/ui/SafeBg";
import { useColors } from "@shared/hooks/use-colors";
import { ScrollLayout } from "@shared/ui/ScrollLayout";
import { RegisterForm } from "../features/auth/ui/RegisterForm";
import { Link } from "expo-router";

export default function RegisterScreen() {
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
              Создать аккаунт
            </Text>
            <Text style={[styles.subtitle, { color: colors.textGray }]}>
              Заказывайте и доставляйте по пути.
            </Text>
          </View>

          <RegisterForm />

          <View style={styles.agreementContainer}>
            <Text style={[styles.agreementText, { color: colors.textGray }]}>
              Нажимая «Создать аккаунт», вы принимаете{" "}
              <Text style={{ color: colors.primary }}>
                Условия использования
              </Text>{" "}
              и{" "}
              <Text style={{ color: colors.primary }}>
                Политику конфиденциальности
              </Text>
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textGray }]}>
              Уже есть аккаунт?{" "}
              <Link href="/login">
                <Text style={{ color: colors.primary, fontWeight: "600" }}>
                  Войти
                </Text>
              </Link>
            </Text>
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
  agreementContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  agreementText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
  },
});
