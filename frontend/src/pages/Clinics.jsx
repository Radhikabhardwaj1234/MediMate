import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

function deg2rad(deg) { return deg * (Math.PI / 180); }
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const Clinics = () => {
  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setLocation(coords);
        fetchHospitals(coords.lat, coords.lon);
      },
      () => {
        setError("Location permission denied. Enable location access to see nearby clinics.");
        setLoading(false);
      }
    );
  }, []);

  const fetchHospitals = async (lat, lon) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/clinics/nearby`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lat, lon, radius: 10000 }),
      });
      const data = await response.json();
      setClinics(data.elements || []);
    } catch {
      setError("Failed to fetch nearby clinics.");
    } finally {
      setLoading(false);
    }
  };

  const visible = clinics.filter((c) => c.tags?.addr === undefined && c.tags?.name);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f172a] flex items-center gap-2">
            <i className="bi bi-geo-alt text-[#0d6efd]" />
            Nearby Clinics &amp; Hospitals
          </h1>
          <p className="text-[#64748b] mt-1">Showing healthcare facilities within 10 km of your location.</p>
        </div>

        {error && (
          <Alert variant="warning" className="mb-6">
            <i className="bi bi-exclamation-triangle" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-[#0d6efd] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#64748b] text-sm">Locating nearby clinics...</p>
          </div>
        )}

        {!loading && visible.length === 0 && !error && (
          <div className="text-center py-16 text-[#94a3b8]">
            <i className="bi bi-hospital text-4xl block mb-3" />
            <p className="font-medium">No clinics found nearby</p>
            <p className="text-sm">Try expanding the search radius or check your location.</p>
          </div>
        )}

        {!loading && visible.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((clinic, idx) => {
              const dist = location ? haversine(location.lat, location.lon, clinic.lat, clinic.lon) : null;
              return (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#e7f1ff] flex items-center justify-center shrink-0">
                        <i className="bi bi-hospital text-[#0d6efd]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0f172a] text-sm leading-tight">{clinic.tags.name}</h3>
                        {dist !== null && (
                          <Badge variant="secondary" className="mt-1 text-xs">{dist.toFixed(1)} km away</Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-[#64748b]">
                      {clinic.tags["addr:full"] && (
                        <p><i className="bi bi-map-pin mr-1" />{clinic.tags["addr:full"]}</p>
                      )}
                      {clinic.tags["addr:postcode"] && (
                        <p><i className="bi bi-mailbox mr-1" />Postcode: {clinic.tags["addr:postcode"]}</p>
                      )}
                      {clinic.tags.phone && (
                        <a href={`tel:${clinic.tags.phone}`} className="flex items-center gap-1 text-[#0d6efd] hover:underline">
                          <i className="bi bi-telephone" />{clinic.tags.phone}
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Clinics;
