import type { FC } from "react";
import { styles } from "./AccountVerificationLevel.style";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@shared/hooks/use-colors";
import { BoxIcon } from "@shared/ui/BoxIcon";

interface Props {
  level: "starter" | "intermediate" | "pro";
}

export const AccountVerificationLevel: FC<Props> = ({ level }) => {
  if (level === "starter") return <StarterLevelVar />;
  if (level === "intermediate") return <IntermediateLevelVar />;
  if (level === "pro") return <ProLevelVar />;
};

const StarterLevelVar = () => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[styles.accountStatusCard, { backgroundColor: colors.white }]}
    >
      <BoxIcon iconName="shield-alert-outline" />

      <View style={styles.accountStatusText}>
        <Text style={[styles.accountStatusTitle, { color: colors.textDark }]}>
          Аккаунт не проверен
        </Text>
        <Text style={[styles.accountStatusDesc, { color: colors.textGray }]}>
          Загрузите документы и селфи
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
    </TouchableOpacity>
  );
};

const IntermediateLevelVar = () => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[styles.accountStatusCard, { backgroundColor: colors.white }]}
    >
      <BoxIcon iconName="shield-half-full" />

      <View style={styles.accountStatusText}>
        <Text style={[styles.accountStatusTitle, { color: colors.textDark }]}>
          Частично проверен
        </Text>
        <Text style={[styles.accountStatusDesc, { color: colors.textGray }]}>
          Личность подтверждена · ожидает устройство
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
    </TouchableOpacity>
  );
};

const ProLevelVar = () => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[styles.accountStatusCard, { backgroundColor: colors.white }]}
    >
      <BoxIcon iconName="shield-check" />

      <View style={styles.accountStatusText}>
        <Text style={[styles.accountStatusTitle, { color: colors.textDark }]}>
          Аккаунт проверен
        </Text>
        <Text style={[styles.accountStatusDesc, { color: colors.textGray }]}>
          Документы · личность · устройство
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
    </TouchableOpacity>
  );
};
