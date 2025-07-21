// const NearbyClinic = require("../models/NearbyClinic");

// const findNearbyClinics = async (req, res) => {
//   try {
//     const { lat, lng } = req.body;

//     if (!lat || !lng) {
//       return res.status(400).json({ message: "Latitude and longitude are required." });
//     }

//     //  (Simulate results for now)
//     const mockClinics = [
//       {
//         placeId: "clinic123",
//         name: "City Care Hospital",
//         address: "123 Main St, New Delhi",
//         location: { lat, lng },
//         type: "hospital",
//         contactNumber: "9876543210",
//         website: "http://citycarehospital.com",
//         rating: 4.5,
//         totalRatings: 200,
//         openingHours: ["Mon-Fri: 9AM–8PM", "Sat: 10AM–6PM"]
//       },
//       {
//         placeId: "clinic456",
//         name: "Healthy Life Clinic",
//         address: "456 Wellness Road, New Delhi",
//         location: { lat, lng },
//         type: "clinic",
//         contactNumber: "9123456780",
//         rating: 4.2,
//         totalRatings: 95,
//         openingHours: ["Mon-Sun: 10AM–9PM"]
//       }
//     ];

//     //Save mock results to DB if not already cached
//     // for (const clinic of mockClinics) {
//     //   const exists = await NearbyClinic.findOne({ placeId: clinic.placeId });
//     //   if (!exists) {
//     //     await NearbyClinic.create(clinic);
//     //   }
//     // }

//     //  Return all cached clinics (limit to 10)
//     // const nearby = await NearbyClinic.find().sort({ rating: -1 }).limit(10);

//     res.status(200).json({
//       message: "Nearby clinics fetched successfully.",
//       clinics: nearby
//     });

//   } catch (error) {
//     console.error("Nearby clinic error:", error);
//     res.status(500).json({ message: "Server error while fetching clinics." });
//   }
// };

// module.exports = { findNearbyClinics };
