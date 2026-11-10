import { type FC, type PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "@widgets/Header";
import { ContentContainer } from "@shared/ui/ContentContainer";

export const ScrollLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <Header />

      <ContentContainer style={{ paddingTop: 20, paddingBottom: 40 }}>
        {children}
      </ContentContainer>
    </ScrollView>
  );
};
