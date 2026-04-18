import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loader}>
      <div className={css.spinner}></div>
      <p className={css.text}>Loading...</p>
    </div>
  );
};
export default Loader;
