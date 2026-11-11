export const formatJoinedIn = (createdAt: string) => {
  const date = new Date(createdAt);
  const month = new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(
    date,
  );
  const year = date.getFullYear();
  return `${month} ${year}`;
};
