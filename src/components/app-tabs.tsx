import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "react-native";
import { Colors } from "../shared/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.cardBg}
      tintColor={colors.primary}
      labelStyle={{ selected: { color: colors.textDark } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Карта</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="map" md="map" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>Заказы</NativeTabs.Trigger.Label>
        {/* Для "Заказы" подойдет "package" или "box" */}
        <NativeTabs.Trigger.Icon sf="shippingbox" md="box" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Профиль</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
