"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCamperById } from "../../../lib/api/api";
import { Camper } from "../../../types/camper";
import css from "./CamperDetails.module.css";
import BookingForm from "../../../components/BookingForm/BookingForm";

export default function CamperDetailsPage() {
  const { id } = useParams() as { id: string };

  const { data: camper, isLoading, error } = useQuery<Camper>({
    queryKey: ["camper", id],
    queryFn: () => fetchCamperById(id),
  });

  if (isLoading) return <div className={css.loader}>Loading camper details...</div>;
  if (error || !camper) return <div className={css.error}>Camper not found</div>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.name}>{camper.name}</h1>
        <div className={css.subHeader}>
          <span className={css.ratingLocation}>
            ★ {camper.rating} ({camper.reviews?.length || 0} Reviews) 📍 {camper.location}
          </span>
        </div>
        <p className={css.price}>€{camper.price.toFixed(2)}</p>
      </div>

      <div className={css.gallery}>
        {camper.gallery?.slice(0, 3).map((img, idx) => (
          <div key={idx} className={css.imageWrapper}>
             <img src={img.original} alt={`${camper.name} ${idx}`} className={css.image} />
          </div>
        ))}
      </div>

      <p className={css.description}>{camper.description}</p>

      <div className={css.content}>
        <div className={css.tabsSection}>
           <div className={css.tabLinks}>
             <button className={css.activeTab}>Features</button>
             <button className={css.tab}>Reviews</button>
           </div>
           
           <div className={css.featuresContent}>
             <div className={css.featuresList}>
                <div className={css.featureBadge}>🚐 {camper.transmission}</div>
                <div className={css.featureBadge}>⛽ {camper.engine}</div>
                {camper.AC && <div className={css.featureBadge}>❄️ AC</div>}
                {camper.kitchen && <div className={css.featureBadge}>🍳 Kitchen</div>}
                {camper.bathroom && <div className={css.featureBadge}>🚿 Bathroom</div>}
             </div>

             <h3 className={css.detailsTitle}>Vehicle details</h3>
             <ul className={css.detailsList}>
               <li><span>Form</span><span>{camper.form}</span></li>
               <li><span>Length</span><span>{camper.length}</span></li>
               <li><span>Width</span><span>{camper.width}</span></li>
               <li><span>Height</span><span>{camper.height}</span></li>
               <li><span>Tank</span><span>{camper.tank}</span></li>
               <li><span>Consumption</span><span>{camper.consumption}</span></li>
             </ul>
           </div>
        </div>

        <div className={css.formSection}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
