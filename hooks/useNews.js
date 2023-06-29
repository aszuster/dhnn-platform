import { useQuery } from "@tanstack/react-query"
import { allNews } from "services/News"

export function useAllNews() {
  const { data, isLoading } = useQuery(["news"], () => allNews())
  return { data, isLoading }
}

export function useFeaturedNews() {
  const { data, isLoading } = useQuery(["news"], () => allNews(), {
    select: (news) =>
      news.data.filter((newsItem) => newsItem.featured === true),
  })
  return { data, isLoading }
}
