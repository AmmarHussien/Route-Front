import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getSearch } from "../../services/apiDriver";

function useSearchDriver(searchKey) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

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
      "searchDrivers",
      filter,
      page,
      searchKey,
      sortBy,
      sortType,
      perPage,
    ],
    queryFn: () =>
      getSearch({ filter, page, searchKey, sortBy, sortType, perPage }),
    keepPreviousData: true,
  });

  const { data: searchList = [], count } = usersData;

  const pageCount = Math.ceil(count / perPage);

  // Prefetch Next Page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "searchDrivers",
        filter,
        page + 1,
        searchKey,
        sortBy,
        sortType,
        perPage,
      ],
      queryFn: () =>
        getSearch({
          filter,
          page: page + 1,
          searchKey,
          sortBy,
          sortType,
          perPage,
        }),
    });
  }

  // Prefetch Previous Page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "searchDrivers",
        filter,
        page - 1,
        searchKey,
        sortBy,
        sortType,
        perPage,
      ],
      queryFn: () =>
        getSearch({
          filter,
          page: page - 1,
          searchKey,
          sortBy,
          sortType,
          perPage,
        }),
    });
  }

  return { isLoading, searchList, count, error };
}

export default useSearchDriver;
