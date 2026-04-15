"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import css from "./FilterSidebar.module.css";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [form, setForm] = useState(searchParams.get("form") || "");
  const [transmission, setTransmission] = useState(searchParams.get("transmission") || "");
  const [engine, setEngine] = useState(searchParams.get("engine") || "");

  // Note: For equipments, we collect booleans. The swagger doesn't enforce AC vs others, but mock structure implies them.
  const [AC, setAC] = useState(searchParams.get("AC") === "true");
  const [kitchen, setKitchen] = useState(searchParams.get("kitchen") === "true");
  const [bathroom, setBathroom] = useState(searchParams.get("bathroom") === "true");
  const [TV, setTV] = useState(searchParams.get("TV") === "true");
  const [automatic, setAutomatic] = useState(searchParams.get("transmission") === "automatic");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (form) params.set("form", form);
    if (engine) params.set("engine", engine);
    
    // Derived from the 'Automatic' equipment toggle or select
    if (automatic) params.set("transmission", "automatic");
    else if (transmission) params.set("transmission", transmission);

    if (AC) params.set("AC", "true");
    if (kitchen) params.set("kitchen", "true");
    if (bathroom) params.set("bathroom", "true");
    if (TV) params.set("TV", "true");

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className={css.sidebar}>
      <div className={css.locationGroup}>
        <label className={css.label}>Location</label>
        <div className={css.inputWrapper}>
          <input 
             className={css.input} 
             type="text" 
             placeholder="City" 
             value={location}
             onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className={css.filtersGroup}>
        <p className={css.filtersTitle}>Filters</p>

        <div className={css.equipmentGroup}>
          <h3 className={css.groupTitle}>Vehicle equipment</h3>
          <div className={css.featuresGrid}>
            <button className={`${css.featureBtn} ${AC ? css.active : ""}`} onClick={() => setAC(!AC)}>❄️ AC</button>
            <button className={`${css.featureBtn} ${automatic ? css.active : ""}`} onClick={() => setAutomatic(!automatic)}>🚐 Automatic</button>
            <button className={`${css.featureBtn} ${kitchen ? css.active : ""}`} onClick={() => setKitchen(!kitchen)}>🍳 Kitchen</button>
            <button className={`${css.featureBtn} ${TV ? css.active : ""}`} onClick={() => setTV(!TV)}>📺 TV</button>
            <button className={`${css.featureBtn} ${bathroom ? css.active : ""}`} onClick={() => setBathroom(!bathroom)}>🚿 Shower/WC</button>
          </div>
        </div>

        <div className={css.typeGroup}>
          <h3 className={css.groupTitle}>Vehicle type</h3>
          <div className={css.featuresGrid}>
            <button className={`${css.featureBtn} ${form === "panel_van" ? css.active : ""}`} onClick={() => setForm(form === "panel_van" ? "" : "panel_van")}>🚐 Van</button>
            <button className={`${css.featureBtn} ${form === "fully_integrated" ? css.active : ""}`} onClick={() => setForm(form === "fully_integrated" ? "" : "fully_integrated")}>🚐 Fully Integrated</button>
            <button className={`${css.featureBtn} ${form === "alcove" ? css.active : ""}`} onClick={() => setForm(form === "alcove" ? "" : "alcove")}>🚐 Alcove</button>
          </div>
        </div>

        <button className={css.searchBtn} onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
