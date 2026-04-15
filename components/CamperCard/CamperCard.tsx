import { Camper } from "../../types/camper";
import css from "./CamperCard.module.css";
import Image from "next/image";
import Link from "next/link";

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img
          src={camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original || "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}
          alt={camper.name}
          className={css.image}
        />
      </div>
      <div className={css.details}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <p className={css.price}>€{camper.price.toFixed(2)}</p>
        </div>
        
        <div className={css.subHeader}>
          <div className={css.ratingLocation}>
            <span className={css.rating}>
              ★ {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </span>
            <span className={css.location}>📍 {camper.location}</span>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>
        
        <div className={css.features}>
          <div className={css.featureBadge}>🚐 {camper.transmission}</div>
          <div className={css.featureBadge}>⛽ {camper.engine}</div>
          {camper.AC && <div className={css.featureBadge}>❄️ AC</div>}
          {camper.kitchen && <div className={css.featureBadge}>🍳 Kitchen</div>}
          {camper.bathroom && <div className={css.featureBadge}>🚿 Bathroom</div>}
          {camper.radio && <div className={css.featureBadge}>📻 Radio</div>}
        </div>

        <Link href={`/catalog/${camper.id}`} className={css.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
}
