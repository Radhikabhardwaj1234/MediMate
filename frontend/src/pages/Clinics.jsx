import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const CustomSpinner = () => (
  <>
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  </>
);

const Clinics = () => {
  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock nearby clinic data
  // const mockClinics = [
  //   {
  //     name: "CityCare Hospital",
  //     address: "Model Town, Ludhiana",
  //     phone: "+91 98123 45678",
  //     distance: "1.2 km"
  //   },
  //   {
  //     name: "Apollo Pharmacy",
  //     address: "Ferozepur Road, Ludhiana",
  //     phone: "+91 99876 54321",
  //     distance: "2.1 km"
  //   },
  //   {
  //     name: "Global Diagnostic Lab",
  //     address: "Sarabha Nagar, Ludhiana",
  //     phone: "+91 90909 12345",
  //     distance: "3.4 km"
  //   }
  // ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(coords);

        fetchHospitals(coords.lat, coords.lon);
      },
      () => {
        setError(
          "⚠️ Location permission denied. Showing default nearby clinics."
        );
        setLoading(false);
      }
    );
  }, []);

  const fetchHospitals = async (lat, lon) => {
    const radius = 10000; //5km.
    const query = `
    [out:json];
    (
      node["amenity"="hospital"]["name"]["addr:state"](around:${radius},${lat},${lon});
      node["amenity"="clinic"]["name"]["addr:state"](around:${radius},${lat},${lon});
      node["amenity"="doctors"]["name"]["addr:state"](around:${radius},${lat},${lon});
    );
    out body;
  `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        //overpass third party online API to fetch near by clinics.
        method: "POST",
        body: query,
      });
      const data = await response.json();
      setClinics(data.elements);
      console.log(data.elements);
    } catch (err) {
      console.error("Failed to fetch Overpass data:", err);
    } finally {
      setLoading(false);
    }
  };

  function getDisFromHarvesine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h3 className="text-primary fw-bold mb-4">
          <i className="bi bi-geo-alt-fill me-2"></i>Nearby Clinics & Pharmacies
        </h3>

        {error && <div className="alert alert-warning">{error}</div>}

        {/* {location && (
          <p className="text-muted mb-4">
            Detected Location:{" "}
            <code>
              {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
            </code>
          </p>
        )} */}

        {loading ? (
          <CustomSpinner />
        ) : (
          <div className="row">
            {clinics
              .filter((clinic) => clinic.tags.addr == undefined)
              .map((clinic, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div className="card shadow-sm mb-4 border-0">
                    <div className="card-body">
                      <h5 className="text-primary fw-bold">
                        <i className="bi bi-hospital me-2"></i>
                        {clinic.tags.name}
                      </h5>
                      <p className="mb-1">
                        <strong>Address:</strong> {clinic.tags["addr:full"]}
                      </p>
                      <p className="mb-1">
                        <strong>State:</strong> {clinic.tags["addr:state"]}
                      </p>
                      <p className="mb-1">
                        <strong>Postcode:</strong>{" "}
                        {clinic.tags["addr:postcode"]}
                      </p>
                      {/* <p className="mb-1"><strong>Phone:</strong> {clinic.phone}</p> */}
                      <p className="mb-1">
                        <strong>Distance:</strong>{" "}
                        {getDisFromHarvesine(
                          location.lat,
                          location.lon,
                          clinic.lat,
                          clinic.lon
                        ).toFixed(1) + " km"}
                      </p>
                      {/* <a
                        href={`tel:${clinic.phone}`}
                        className="btn btn-outline-primary btn-sm btn-rounded mt-2"
                      >
                        <i className="bi bi-telephone me-1"></i> Call Clinic
                      </a> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Clinics;
