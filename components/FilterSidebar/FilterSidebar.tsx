import css from "./FilterSidebar.module.css";

export default function FilterSidebar() {
  return (
    <div className={css.sidebar}>
      <div className={css.locationGroup}>
        <label className={css.label}>Location</label>
        <div className={css.inputWrapper}>
          <input className={css.input} type="text" placeholder="City" />
        </div>
      </div>

      <div className={css.filtersGroup}>
        <p className={css.filtersTitle}>Filters</p>

        <div className={css.equipmentGroup}>
          <h3 className={css.groupTitle}>Vehicle equipment</h3>
          <div className={css.featuresGrid}>
            <button className={css.featureBtn}>❄️ AC</button>
            <button className={css.featureBtn}>🚐 Automatic</button>
            <button className={css.featureBtn}>🍳 Kitchen</button>
            <button className={css.featureBtn}>📺 TV</button>
            <button className={css.featureBtn}>🚿 Shower/WC</button>
          </div>
        </div>

        <div className={css.typeGroup}>
          <h3 className={css.groupTitle}>Vehicle type</h3>
          <div className={css.featuresGrid}>
            <button className={css.featureBtn}>🚐 Van</button>
            <button className={css.featureBtn}>🚐 Fully Integrated</button>
            <button className={css.featureBtn}>🚐 Alcove</button>
          </div>
        </div>

        <button className={css.searchBtn}>Search</button>
      </div>
    </div>
  );
}
