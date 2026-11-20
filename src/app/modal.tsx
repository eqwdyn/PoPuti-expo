import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function ModalScreen() {
  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text>Содержимое модального окна</Text>
        <Pressable onPress={() => router.replace("/login")}>
          <Text style={{ color: "blue", marginTop: 12 }}>Логин</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // полупрозрачный чёрный фон
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "80%",
  },
});
