import { useCallback, useState, type FC, type PropsWithChildren } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Header } from "@widgets/Header";
import { ContentContainer } from "@shared/ui/ContentContainer";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useColors } from "../hooks/use-colors";

interface Props extends PropsWithChildren {
  inRefreshQueriesToInvalidate?: QueryKey[];
}

export const ScrollLayout: FC<Props> = ({
  children,
  inRefreshQueriesToInvalidate = [],
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const colors = useColors();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all(
        inRefreshQueriesToInvalidate.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
    } catch (e) {
      console.warn("Refresh failed", e);
    } finally {
      setRefreshing(false);
    }
  }, [inRefreshQueriesToInvalidate, queryClient]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      refreshControl={
        inRefreshQueriesToInvalidate.length ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.white}
          />
        ) : undefined
      }
    >
      <Header />
      <ContentContainer style={{ paddingTop: 20, paddingBottom: 40 }}>
        {children}
      </ContentContainer>
    </ScrollView>
  );
};
