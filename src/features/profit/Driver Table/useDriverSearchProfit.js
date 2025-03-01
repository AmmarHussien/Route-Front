import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getDriverProfitSearch } from "../../../services/apiProfit";
import { useTranslation } from "react-i18next";

function useDriverSearchProfit(searchKey) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  // Filter Logic
  const filterValue = searchParams.get("status");
  const filter =
    filterValue && filterValue !== "All"
      ? { field: "status", value: filterValue }
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
    data: usersData = {}, // Ensure default object
    error,
  } = useQuery({
    queryKey: [
      "SearchDriverProfit",
      filter,
      page,
      searchKey,
      sortBy,
      sortType,
      perPage,
      isRTL,
    ],
    queryFn: () =>
      getDriverProfitSearch({
        filter,
        page,
        searchKey,
        sortBy,
        sortType,
        perPage,
        isRTL,
      }),
    keepPreviousData: true,
  });

  const { data: searchDriverList = [], count } = usersData;

  const pageCount = Math.ceil(count / perPage);

  // Prefetch Next Page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "SearchDriverProfit",
        filter,
        page + 1,
        searchKey,
        sortBy,
        sortType,
        perPage,
        isRTL,
      ],
      queryFn: () =>
        getDriverProfitSearch({
          filter,
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
        "SearchDriverProfit",
        filter,
        page - 1,
        searchKey,
        sortBy,
        sortType,
        perPage,
        isRTL,
      ],
      queryFn: () =>
        getDriverProfitSearch({
          filter,
          page: page - 1,
          searchKey,
          sortBy,
          sortType,
          perPage,
          isRTL,
        }),
    });
  }

  return { isLoading, searchDriverList, count, error };
}

export default useDriverSearchProfit;
