"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  fetchCamperById,
  bookCamper,
  fetchCamperReviews,
} from "../../../lib/api/api";
import type { Camper, Review } from "../../../types/camper";
import css from "./CamperDetails.module.css";
import BookingForm from "../../../components/BookingForm/BookingForm";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { CiMap } from "react-icons/ci";

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

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery<Camper>({
    queryKey: ["camper", id],
    queryFn: () => fetchCamperById(id),
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["camperReviews", id],
    queryFn: () => fetchCamperReviews(id),
  });

  const bookingMutation = useMutation({
    mutationFn: (data: any) => bookCamper(id, data),
    onSuccess: (data) => {
      const successMessage = data?.message || "Booking request sent successfully!";
      toast.success(successMessage);
    },
    onError: () => {
      toast.error("Failed to send booking request. Please try again.");
    },
  });

  if (isLoading)
    return <div className={css.loader}>Loading camper details...</div>;
  if (error || !camper)
    return <div className={css.error}>Camper not found</div>;

  return (
    <div className={css.container}>
      {/* Top Grid: Gallery and Info */}
      <div className={css.topGrid}>
        <div className={css.galleryWrapper}>
          <div className={css.swiperContainer}>
            <Swiper
              style={
                {
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                } as React.CSSProperties
              }
              spaceBetween={10}
              navigation={false}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className={css.mainSwiper}
            >
              {camper.gallery?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img.original}
                    alt={`${camper.name} ${idx}`}
                    className={css.mainImage}
                  />
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
                  <img
                    src={img.thumb || img.original}
                    alt={`${camper.name} thumb ${idx}`}
                    className={css.thumbImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={css.infoWrapper}>
          <div className={css.infoTop}>
            <h1 className={css.name}>{camper.name}</h1>
            <div className={css.subHeader}>
              <span className={css.ratingLocation}>
                <FaStar className={css.starIcon} />
                {camper.rating} ({camper.totalReviews || reviews?.length || 0}{" "}
                Reviews)
              </span>
              <span className={css.location}>
                <CiMap className={css.pinIcon} />
                {camper.location}
              </span>
            </div>
            <p className={css.price}>€{camper.price.toFixed(0)}</p>
            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.detailsBox}>
            <h3 className={css.detailsTitle}>Vehicle details</h3>
            <div className={css.featuresList}>
              <div className={css.featureBadge}>{camper.transmission}</div>
              <div className={css.featureBadge}>{camper.engine}</div>
              {camper.amenities?.includes("ac") && (
                <div className={css.featureBadge}>AC</div>
              )}
              {camper.amenities?.includes("kitchen") && (
                <div className={css.featureBadge}>Kitchen</div>
              )}
              {camper.amenities?.includes("bathroom") && (
                <div className={css.featureBadge}>Bathroom</div>
              )}
              {camper.amenities?.includes("radio") && (
                <div className={css.featureBadge}>Radio</div>
              )}
              {camper.amenities?.includes("tv") && (
                <div className={css.featureBadge}>TV</div>
              )}
              {camper.amenities?.includes("refrigerator") && (
                <div className={css.featureBadge}>Refrigerator</div>
              )}
              {camper.amenities?.includes("microwave") && (
                <div className={css.featureBadge}>Microwave</div>
              )}
              {camper.amenities?.includes("gas") && (
                <div className={css.featureBadge}>Gas</div>
              )}
              {camper.amenities?.includes("water") && (
                <div className={css.featureBadge}>Water</div>
              )}
            </div>

            <ul className={css.detailsAttributesList}>
              <li>
                <span>Form</span>
                <span>{camper.form}</span>
              </li>
              <li>
                <span>Length</span>
                <span>
                  {camper.length.replace(
                    /(\d+(?:\.\d+)?)([a-zA-Z]+)/g,
                    "$1 $2",
                  )}
                </span>
              </li>
              <li>
                <span>Width</span>
                <span>
                  {camper.width.replace(/(\d+(?:\.\d+)?)([a-zA-Z]+)/g, "$1 $2")}
                </span>
              </li>
              <li>
                <span>Height</span>
                <span>
                  {camper.height.replace(
                    /(\d+(?:\.\d+)?)([a-zA-Z]+)/g,
                    "$1 $2",
                  )}
                </span>
              </li>
              <li>
                <span>Tank</span>
                <span>
                  {camper.tank.replace(/(\d+(?:\.\d+)?)([a-zA-Z]+)/g, "$1 $2")}
                </span>
              </li>
              <li>
                <span>Consumption</span>
                <span>
                  {camper.consumption.replace(
                    /(\d+(?:\.\d+)?)([a-zA-Z]+)/g,
                    "$1 $2",
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section: Reviews and Booking Form */}
      <div className={css.bottomSpread}>
        <div className={css.reviewsSection}>
          <h2 className={css.sectionTitle}>Reviews</h2>
          <div className={css.reviewsList}>
            {reviews?.map((r, i) => (
              <div key={i} className={css.reviewCard}>
                <div className={css.reviewHeader}>
                  <div className={css.reviewAvatar}>
                    {r.reviewer_name?.[0]?.toUpperCase()}
                  </div>
                  <div className={css.reviewMeta}>
                    <p className={css.reviewName}>{r.reviewer_name}</p>
                    <div className={css.reviewStars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={css.starIcon}
                          color={
                            star <= r.reviewer_rating
                              ? "var(--rating-color)"
                              : "#F2F4F7"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={css.reviewComment}>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={css.formSection}>
          <BookingForm
            onSubmit={(vals) => bookingMutation.mutate(vals)}
            isLoading={bookingMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
