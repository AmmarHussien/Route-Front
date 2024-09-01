import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDrivers } from "../../services/apiDriver";
import { useSearchParams } from "react-router-dom";

function useDrivers() {
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
    data: driversData = {}, // Ensure default object
    error,
  } = useQuery({
    queryKey: ["drivers", filter, page, sortBy, sortType, perPage],
    queryFn: () => getAllDrivers({ filter, page, sortBy, sortType, perPage }),
    keepPreviousData: true,
  });

  const { data: drivers = [], count } = driversData;

  const pageCount = Math.ceil(count / perPage);

  // Prefetch Next Page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["drivers", filter, page + 1, sortBy, sortType, perPage],
      queryFn: () =>
        getAllDrivers({ filter, page: page + 1, sortBy, sortType, perPage }),
    });
  }

  // Prefetch Previous Page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["drivers", filter, page - 1, sortBy, sortType, perPage],
      queryFn: () =>
        getAllDrivers({ filter, page: page - 1, sortBy, sortType, perPage }),
    });
  }

  return { isLoading, drivers, count, error };
}

export default useDrivers;
