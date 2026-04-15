"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampers } from "../../lib/api/api";
import { Camper } from "../../types/camper";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./Catalog.module.css";
import { useState } from "react";

export default function CatalogPage() {
  const { data: campers, isLoading, error } = useQuery<Camper[]>({
    queryKey: ["campers"],
    queryFn: fetchCampers,
  });

  const [visibleCount, setVisibleCount] = useState(4);

  if (isLoading) {
    return <div className={css.loader}>Loading campers...</div>;
  }

  if (error) {
    return <div className={css.error}>Failed to load campers. Please try again later.</div>;
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <FilterSidebar />
      </aside>
      <main className={css.mainList}>
        <div className={css.list}>
          {campers?.slice(0, visibleCount).map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
        {campers && visibleCount < campers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </main>
    </div>
  );
}
