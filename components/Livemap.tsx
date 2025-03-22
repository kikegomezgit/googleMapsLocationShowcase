import { useEffect, useState } from "react";
import { GoogleMap, OverlayView, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
const mapContainerStyle = { width: "100%", height: "100vh" };
const center = { lat: 25.6866, lng: -100.3161 };

export default function LiveMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [deliverers, setDeliverers] = useState([
    {
      id: 1,
      lat: 25.647954318745732,
      lng: -100.29535294751507,
      title: "kike",
      image: "/me.png",
    },
    {
      id: 2,
      lat: 25.641145461710774,
      lng: -100.2919878208176,
      title: "max",
      image: "/max.jpeg",
    },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliverers((prev) =>
        prev.map((d) => ({
          ...d,
          lat: d.lat + (Math.random() - 0.01) * 0.01,
          lng: d.lng + (Math.random() - 0.01) * 0.01,
        }))
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {deliverers.map((d) => (
        <OverlayView
          key={d.id}
          position={{ lat: d.lat, lng: d.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              border: "2px solid green",
            }}
          >
            <Image
              src={d.image}
              alt={d.title}
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </OverlayView>
      ))}
    </GoogleMap>
  );
}
