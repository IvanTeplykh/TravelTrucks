import type { Camper } from "../../types/camper";
import css from "./CamperCard.module.css";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { CiMap } from "react-icons/ci";
import { TbManualGearbox } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import { IoMdCar } from "react-icons/io";

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img
          src={
            camper.coverImage ||
            camper.gallery?.[0]?.original ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
          }
          alt={camper.name}
          className={css.image}
        />
      </div>
      <div className={css.details}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <p className={css.price}>€{camper.price.toFixed(0)}</p>
        </div>

        <div className={css.subHeader}>
          <div className={css.ratingLocation}>
            <span className={css.rating}>
              <FaStar className={css.starIcon} />
              {camper.rating} ({camper.totalReviews || 0} Reviews)
            </span>
            <span className={css.location}>
              <CiMap className={css.pinIcon} />
              {camper.location}
            </span>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.features}>
          <div className={css.featureBadge}>
            <TbManualGearbox size={16} />
            {camper.transmission}
          </div>
          <div className={css.featureBadge}>
            <BsFuelPump size={16} />
            {camper.engine}
          </div>
          <div className={css.featureBadge} style={{ textTransform: "none" }}>
            <IoMdCar size={16} />
            {camper.form
              .replace(/_/g, " ")
              .replace(/([A-Z])/g, " $1")
              .trim()
              .toLowerCase()
              .replace(/^./, (str) => str.toUpperCase())}
          </div>
        </div>

        <Link
          href={`/catalog/${camper.id}`}
          className={css.showMoreBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
