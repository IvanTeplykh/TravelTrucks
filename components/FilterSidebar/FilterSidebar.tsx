"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import LocationInputWithMap from "../LocationInputWithMap/LocationInputWithMap";
import css from "./FilterSidebar.module.css";
import { IoMdClose } from "react-icons/io";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [form, setForm] = useState(searchParams.get("form") || "");
  const [transmission, setTransmission] = useState(
    searchParams.get("transmission") || "",
  );
  const [engine, setEngine] = useState(searchParams.get("engine") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (form) params.set("form", form);
    if (engine) params.set("engine", engine);
    if (transmission) params.set("transmission", transmission);

    router.push(`/catalog?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setLocation("");
    setForm("");
    setTransmission("");
    setEngine("");
    router.push("/catalog");
  };

  return (
    <div className={css.sidebar}>
      <div className={css.locationGroup}>
        <label className={css.label}>Location</label>
        <LocationInputWithMap
          location={location}
          setLocation={setLocation}
          className={css.input}
          inputWrapperClassName={css.inputWrapper}
        />
      </div>

      <div className={css.filtersGroup}>
        <p className={css.filtersTitle}>Filters</p>

        <section className={css.filterSection}>
          <h3 className={css.sectionTitle}>Camper form</h3>
          <div className={css.optionsList}>
            {["alcove", "panel_van", "fully_integrated", "semi_integrated"].map((val) => (
              <label key={val} className={css.optionLabel}>
                <input
                  type="radio"
                  name="form"
                  checked={form === val}
                  onChange={() => setForm(val)}
                  className={css.radioInput}
                />
                <span>{val.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
              </label>
            ))}
          </div>
        </section>

        <section className={css.filterSection}>
          <h3 className={css.sectionTitle}>Engine</h3>
          <div className={css.optionsList}>
            {["diesel", "petrol", "hybrid", "electric"].map((val) => (
              <label key={val} className={css.optionLabel}>
                <input
                  type="radio"
                  name="engine"
                  checked={engine === val}
                  onChange={() => setEngine(val)}
                  className={css.radioInput}
                />
                <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
              </label>
            ))}
          </div>
        </section>

        <section className={css.filterSection}>
          <h3 className={css.sectionTitle}>Transmission</h3>
          <div className={css.optionsList}>
            {["automatic", "manual"].map((val) => (
              <label key={val} className={css.optionLabel}>
                <input
                  type="radio"
                  name="transmission"
                  checked={transmission === val}
                  onChange={() => setTransmission(val)}
                  className={css.radioInput}
                />
                <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
              </label>
            ))}
          </div>
        </section>


        <div className={css.actions}>
          <button className={css.searchBtn} onClick={handleSearch}>
            Search
          </button>
          <button className={css.clearBtn} onClick={handleClearFilters}>
            <IoMdClose />
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
