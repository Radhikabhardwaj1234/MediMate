const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

const findNearbyClinics = async (req, res) => {
  const { lat, lon, radius = 10000 } = req.body;

  if (!lat || !lon) {
    return res.status(400).json({ message: "lat and lon are required." });
  }

  const query = `[out:json];(node["amenity"="hospital"]["name"](around:${radius},${lat},${lon});node["amenity"="clinic"]["name"](around:${radius},${lat},${lon});node["amenity"="doctors"]["name"](around:${radius},${lat},${lon}););out body;`;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "User-Agent": "MediMate/1.0 (health assistant app)",
        },
        body: `data=${encodeURIComponent(query)}`,
      });

      const text = await response.text();
      console.log(`Overpass [${endpoint}] status: ${response.status}`);

      try {
        const data = JSON.parse(text);
        return res.status(200).json(data);
      } catch {
        console.error(`Non-JSON from ${endpoint}:`, text.substring(0, 300));
      }
    } catch (err) {
      console.error(`Fetch error from ${endpoint}:`, err.message);
    }
  }

  res.status(502).json({ message: "All Overpass endpoints failed. Try again later." });
};

module.exports = { findNearbyClinics };
