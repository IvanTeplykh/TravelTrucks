import type { Camper } from "../../types/camper";
import css from "./CamperCard.module.css";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { CiMap } from "react-icons/ci";
import {
  TbManualGearbox,
  TbSnowflake,
  TbToolsKitchen2,
  TbFridge,
  TbMicrowave,
  TbFlame,
  TbDroplets,
} from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import { PiShower, PiTelevision } from "react-icons/pi";
import { MdOutlineRadio } from "react-icons/md";

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
            <TbManualGearbox size={20} />
            {camper.transmission}
          </div>
          <div className={css.featureBadge}>
            <BsFuelPump size={20} />
            {camper.engine}
          </div>
          {camper.amenities?.includes("ac") && (
            <div className={css.featureBadge}>
              <TbSnowflake size={20} />
              AC
            </div>
          )}
          {camper.amenities?.includes("kitchen") && (
            <div className={css.featureBadge}>
              <TbToolsKitchen2 size={20} />
              Kitchen
            </div>
          )}
          {camper.amenities?.includes("bathroom") && (
            <div className={css.featureBadge}>
              <PiShower size={20} />
              Bathroom
            </div>
          )}
          {camper.amenities?.includes("radio") && (
            <div className={css.featureBadge}>
              <MdOutlineRadio size={20} />
              Radio
            </div>
          )}
          {camper.amenities?.includes("tv") && (
            <div className={css.featureBadge}>
              <PiTelevision size={20} />
              TV
            </div>
          )}
          {camper.amenities?.includes("refrigerator") && (
            <div className={css.featureBadge}>
              <TbFridge size={20} />
              Refrigerator
            </div>
          )}
          {camper.amenities?.includes("microwave") && (
            <div className={css.featureBadge}>
              <TbMicrowave size={20} />
              Microwave
            </div>
          )}
          {camper.amenities?.includes("gas") && (
            <div className={css.featureBadge}>
              <TbFlame size={20} />
              Gas
            </div>
          )}
          {camper.amenities?.includes("water") && (
            <div className={css.featureBadge}>
              <TbDroplets size={20} />
              Water
            </div>
          )}
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
