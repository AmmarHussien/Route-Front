import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getSearchNotification } from "../../services/apiNotifications";
import { useTranslation } from "react-i18next";

function useSearchNotification(searchKey) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  // Filter Logic
  const filterSent = searchParams.get("is_sent") || "1";
  const filterType = searchParams.get("app_type") || "All";
  const filterPlatform = searchParams.get("platform") || "All";

  const resultSent =
    filterSent && filterSent !== "All"
      ? { field: "is_sent", value: filterSent }
      : null;

  const resultType =
    filterType && filterType !== "All"
      ? { field: "app_type", value: filterType }
      : null;

  const resultPlatform =
    filterPlatform && filterPlatform !== "All"
      ? { field: "platform", value: filterPlatform }
      : null;

  // 2) sort

  const sortByRow = searchParams.get("sortBy") || "id-desc";

  const [field, direction] = sortByRow.split("-");
  const sortBy = field;
  const sortType = direction;

  // Pagination Logic
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  //perPage Logic
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  // Main Query
  const {
    isLoading,
    data: notificationsData = {}, // Ensure default object
    error,
  } = useQuery({
    queryKey: [
      "Search-Notification",
      resultSent,
      resultType,
      resultPlatform,
      page,
      searchKey,
      sortBy,
      sortType,
      perPage,
      isRTL,
    ],
    queryFn: () =>
      getSearchNotification({
        resultSent,
        resultType,
        resultPlatform,
        page,
        searchKey,
        sortBy,
        sortType,
        perPage,
        isRTL,
      }),
    keepPreviousData: true,
  });

  const { data: searchNotification = [], count } = notificationsData;

  const pageCount = Math.ceil(count / perPage);

  // Prefetch Next Page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "Search-Notification",
        resultSent,
        resultType,
        resultPlatform,
        page + 1,
        searchKey,
        sortBy,
        sortType,
        perPage,
        isRTL,
      ],
      queryFn: () =>
        getSearchNotification({
          resultSent,
          resultType,
          resultPlatform,
          page: page + 1,
          searchKey,
          sortBy,
          sortType,
          perPage,
          isRTL,
        }),
    });
  }

  // Prefetch Previous Page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "Search-Notification",
        resultSent,
        resultType,
        resultPlatform,
        page - 1,
        searchKey,
        sortBy,
        sortType,
        perPage,
        isRTL,
      ],
      queryFn: () =>
        getSearchNotification({
          resultSent,
          resultType,
          resultPlatform,
          page: page - 1,
          searchKey,
          sortBy,
          sortType,
          perPage,
          isRTL,
        }),
    });
  }

  return { isLoading, searchNotification, count, error };
}

export default useSearchNotification;
