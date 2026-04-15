"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCamperById, bookCamper, fetchCamperReviews } from "../../../lib/api/api";
import { Camper, Review } from "../../../types/camper";
import css from "./CamperDetails.module.css";
import BookingForm from "../../../components/BookingForm/BookingForm";
import toast from "react-hot-toast";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";

export default function CamperDetailsPage() {
  const { id } = useParams() as { id: string };
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const { data: camper, isLoading, error } = useQuery<Camper>({
    queryKey: ["camper", id],
    queryFn: () => fetchCamperById(id),
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["camperReviews", id],
    queryFn: () => fetchCamperReviews(id),
  });

  const bookingMutation = useMutation({
    mutationFn: (data: any) => bookCamper(id, data),
    onSuccess: () => {
      toast.success("Booking request sent successfully!");
    },
    onError: () => {
      toast.error("Failed to send booking request. Please try again.");
    }
  });

  const [activeTab, setActiveTab] = useState("features");

  if (isLoading) return <div className={css.loader}>Loading camper details...</div>;
  if (error || !camper) return <div className={css.error}>Camper not found</div>;

  // Aggregate amenities securely depending on mock vs back-end response
  const isAC = camper.amenities?.includes("ac");
  const isKitchen = camper.amenities?.includes("kitchen");
  const isBathroom = camper.amenities?.includes("bathroom");
  const isTV = camper.amenities?.includes("tv");

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.name}>{camper.name}</h1>
        <div className={css.subHeader}>
          <span className={css.ratingLocation}>
            ★ {camper.rating} ({camper.totalReviews || reviews?.length || 0} Reviews) 📍 {camper.location}
          </span>
        </div>
        <p className={css.price}>€{camper.price.toFixed(2)}</p>
      </div>

      <div className={css.galleryWrapper}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={css.mainSwiper}
        >
          {camper.gallery?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img.original} alt={`${camper.name} ${idx}`} className={css.mainImage} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={css.thumbSwiper}
        >
          {camper.gallery?.map((img, idx) => (
            <SwiperSlide key={idx} className={css.thumbSlide}>
              <img src={img.thumb || img.original} alt={`${camper.name} thumb ${idx}`} className={css.thumbImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className={css.description}>{camper.description}</p>

      <div className={css.content}>
        <div className={css.tabsSection}>
           <div className={css.tabLinks}>
             <button className={activeTab === "features" ? css.activeTab : css.tab} onClick={() => setActiveTab("features")}>Features</button>
             <button className={activeTab === "reviews" ? css.activeTab : css.tab} onClick={() => setActiveTab("reviews")}>Reviews</button>
           </div>
           
           {activeTab === "features" && (
             <div className={css.featuresContent}>
               <div className={css.featuresList}>
                  <div className={css.featureBadge}>🚐 {camper.transmission}</div>
                  <div className={css.featureBadge}>⛽ {camper.engine}</div>
                  {isAC && <div className={css.featureBadge}>❄️ AC</div>}
                  {isKitchen && <div className={css.featureBadge}>🍳 Kitchen</div>}
                  {isBathroom && <div className={css.featureBadge}>🚿 Bathroom</div>}
                  {isTV && <div className={css.featureBadge}>📺 TV</div>}
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
           )}
           
           {activeTab === "reviews" && (
             <div className={css.reviewsContent}>
               {reviews?.map((r, i) => (
                  <div key={i} className={css.reviewCard}>
                     <div className={css.reviewHeader}>
                       <div className={css.reviewAvatar}>{r.reviewer_name?.[0]?.toUpperCase()}</div>
                       <div className={css.reviewMeta}>
                         <p className={css.reviewName}>{r.reviewer_name}</p>
                         <div className={css.reviewStars}>
                           {[1,2,3,4,5].map(star => (
                             <svg 
                               key={star} 
                               width="16" 
                               height="16" 
                               viewBox="0 0 16 16" 
                               fill={star <= r.reviewer_rating ? "var(--rating-color)" : "#F2F4F7"} 
                               xmlns="http://www.w3.org/2000/svg"
                               style={{ flexShrink: 0 }}
                             >
                               <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
                             </svg>
                           ))}
                         </div>
                       </div>
                     </div>
                     <p className={css.reviewComment}>{r.comment}</p>
                  </div>
               ))}
             </div>
           )}
        </div>

        <div className={css.formSection}>
          <BookingForm onSubmit={(vals) => bookingMutation.mutate(vals)} isLoading={bookingMutation.isPending} />
        </div>
      </div>
    </div>
  );
}
