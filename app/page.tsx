"use client";
import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("../components/Livemap"), { ssr: false });

export default function Home() {
  return (
    <div>
      <p style={{ textAlign: "center" }}>
        This app simulates the movement on realtime of two delivery persons
        intended to be used with Websockets, a backend to handle lat and long
        updates, and a mobile app
      </p>
      <LiveMap />
    </div>
  );
}
