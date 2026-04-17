import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { CiMap } from "react-icons/ci";
import css from "./LocationInputWithMap.module.css";

const libraries: "places"[] = ["places"];
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

interface LocationInputWithMapProps {
  location: string;
  setLocation: (value: string) => void;
  className?: string;
  inputWrapperClassName?: string;
}

export default function LocationInputWithMap({
  location,
  setLocation,
  className,
  inputWrapperClassName,
}: LocationInputWithMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded)
    return (
      <div className={inputWrapperClassName}>
        <input className={className} placeholder="Loading Map..." disabled />
      </div>
    );

  return (
    <LocationInputWithMapInner
      location={location}
      setLocation={setLocation}
      className={className}
      inputWrapperClassName={inputWrapperClassName}
    />
  );
}

function LocationInputWithMapInner({
  location,
  setLocation,
  className,
  inputWrapperClassName,
}: LocationInputWithMapProps) {
  const [value, setValue] = useState(location || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  // sync external value
  useEffect(() => {
    setValue(location || "");
  }, [location]);

  // autocomplete (NEW API)
  useEffect(() => {
    if (!value) return setSuggestions([]);

    const timeout = setTimeout(async () => {
      const res = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
          },
          body: JSON.stringify({ 
            input: value,
            languageCode: "en" 
          }),
        },
      );

      const data = await res.json();
      setSuggestions(data.suggestions || []);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  const handleSelect = async (item: any) => {
    const text = item.placePrediction.text.text;
    const placeId = item.placePrediction.placeId;

    setValue(text);
    setLocation(text);
    setSuggestions([]);

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "location,addressComponents",
        },
      },
    );

    const data = await res.json();

    const city = data.addressComponents?.find((c: any) =>
      c.types.includes("locality"),
    )?.longText;
    const country = data.addressComponents?.find((c: any) =>
      c.types.includes("country"),
    )?.longText;

    const formatted = city && country ? `${country}, ${city}` : text;

    setValue(formatted);
    setLocation(formatted);

    setPosition({
      lat: data.location.latitude,
      lng: data.location.longitude,
    });
  };

  return (
    <div className={`${inputWrapperClassName} ${css.inputWrapper}`}>
      <div className={css.autocompleteWrapper}>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setLocation(e.target.value);
          }}
          placeholder="City"
          className={className}
        />

        {suggestions.length > 0 && (
          <ul className={css.suggestionsList}>
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelect(s)}
                className={css.suggestionItem}
              >
                {s.placePrediction.text.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={css.mapBtn}
        title="Choose on map"
      >
        <CiMap />
      </button>

      {isOpen && (
        <MapModal
          setIsOpen={setIsOpen}
          setPosition={setPosition}
          position={position}
          setLocation={setLocation}
          setValue={setValue}
        />
      )}
    </div>
  );
}

function MapModal({
  setIsOpen,
  setPosition,
  position,
  setLocation,
  setValue,
}: any) {
  const center = position || { lat: 50.4501, lng: 30.5234 };

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setPosition({ lat, lng });

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=en`,
    );

    const data = await res.json();

    if (data.results?.[0]) {
      const components = data.results[0].address_components;
      const city = components.find((c: any) =>
        c.types.includes("locality"),
      )?.long_name;
      const country = components.find((c: any) =>
        c.types.includes("country"),
      )?.long_name;

      const formatted =
        city && country
          ? `${country}, ${city}`
          : data.results[0].formatted_address;

      setLocation(formatted);
      setValue(formatted);
    }
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName={css.mapContainer}
          onClick={handleMapClick}
        >
          {position && <Marker position={position} />}
        </GoogleMap>

        <div className={css.modalActions}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={css.confirmBtn}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
