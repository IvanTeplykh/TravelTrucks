"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampers } from "../../lib/api/api";
import type { PaginatedCampersResponse } from "../../types/camper";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./Catalog.module.css";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function CatalogPage() {
  const searchParams = useSearchParams();

  // Extract filters from URL
  const filters = useMemo(() => {
    return {
      location: searchParams.get("location") || undefined,
      form: searchParams.get("form") || undefined,
      transmission: searchParams.get("transmission") || undefined,
      engine: searchParams.get("engine") || undefined,
      ...Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) =>
          ["AC", "kitchen", "bathroom", "TV"].includes(key),
        ),
      ),
    };
  }, [searchParams]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedCampersResponse>({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers(pageParam as number, 4, filters),
    getNextPageParam: (lastPage, allPages) => {
      // Assuming back-end returns total items, calculate if next page exists
      const maxPages = Math.ceil(lastPage.total / 4);
      if (allPages.length < maxPages) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const campers = data?.pages.flatMap((page) => page.campers || []) || [];

  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <FilterSidebar />
      </aside>
      <main className={css.mainList}>
        {isLoading ? (
          <div className={css.loader}>Loading campers...</div>
        ) : error ? (
          <div className={css.error}>
            Failed to load campers. Please try again later.
          </div>
        ) : campers.length === 0 ? (
          <div className={css.loader}>No campers match your filters.</div>
        ) : (
          <>
            <div className={css.list}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>
            {hasNextPage && (
              <button
                className={css.loadMoreBtn}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </main>
    </div>
  );
}
