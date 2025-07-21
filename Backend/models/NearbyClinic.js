// const mongoose = require("mongoose");

// const NearbyClinicSchema = new mongoose.Schema({
//   placeId: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   name: {
//     type: String,
//     required: true
//   },

//   address: {
//     type: String,
//     required: true
//   },

//   location: {
//     lat: Number,
//     lng: Number
//   },

//   type: {
//     type: String, // 'hospital', 'clinic', 'pharmacy'
//     required: true
//   },

//   contactNumber: {
//     type: String
//   },

//   website: {
//     type: String
//   },

//   rating: {
//     type: Number
//   },

//   totalRatings: {
//     type: Number
//   },

//   openingHours: [String],

//   lastFetchedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("NearbyClinic", NearbyClinicSchema);
