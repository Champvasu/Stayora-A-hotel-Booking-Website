const mongoose = require("mongoose");

//const ownerId = new mongoose.Types.ObjectId("69c293f8760ec3df043f5d20");

const listings = [
{
  title: "Cozy Mountain Retreat",
  description: "Beautiful cabin with scenic mountain views.",
  price: 2500,
  location: "Manali",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    filename: "mountain1"
  },
  category: "Mountains",
  geometry: {
    type: "Point",
    coordinates: [77.1892, 32.2432]
  }
},
{
  title: "Luxury Pool Villa",
  description: "Private villa with infinity pool.",
  price: 8000,
  location: "Goa",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    filename: "pool1"
  },
  category: "AmazingPools",
  geometry: {
    type: "Point",
    coordinates: [73.8567, 15.2993]
  }
},
{
  title: "City Center Apartment",
  description: "Modern apartment in the heart of the city.",
  price: 3500,
  location: "Mumbai",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    filename: "city1"
  },
  category: "IconicCities",
  geometry: {
    type: "Point",
    coordinates: [72.8777, 19.0760]
  }
},
{
  title: "Forest Camping Site",
  description: "Enjoy camping in dense forest.",
  price: 1200,
  location: "Rishikesh",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    filename: "camp1"
  },
  category: "Camping",
  geometry: {
    type: "Point",
    coordinates: [78.2676, 30.0869]
  }
},
{
  title: "Royal Castle Stay",
  description: "Stay in a historic castle.",
  price: 10000,
  location: "Jaipur",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    filename: "castle1"
  },
  category: "Castles",
  geometry: {
    type: "Point",
    coordinates: [75.7873, 26.9124]
  }
},
{
  title: "Peaceful Farmhouse",
  description: "Relax in a serene farmhouse.",
  price: 2000,
  location: "Pune",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    filename: "farm1"
  },
  category: "Farms",
  geometry: {
    type: "Point",
    coordinates: [73.8567, 18.5204]
  }
},
{
  title: "Arctic Igloo Experience",
  description: "Unique stay in icy surroundings.",
  price: 15000,
  location: "Finland",
  country: "Finland",
  image: {
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    filename: "arctic1"
  },
  category: "Arctic",
  geometry: {
    type: "Point",
    coordinates: [25.7482, 61.9241]
  }
},
{
  title: "Budget Room Stay",
  description: "Affordable and comfortable room.",
  price: 800,
  location: "Delhi",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
    filename: "room1"
  },
  category: "Rooms",
  geometry: {
    type: "Point",
    coordinates: [77.1025, 28.7041]
  }
},
{
  title: "Trending Beach House",
  description: "Top-rated beachside property.",
  price: 6000,
  location: "Alibaug",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
    filename: "trend1"
  },
  category: "Trending",
  geometry: {
    type: "Point",
    coordinates: [72.8722, 18.6414]
  }
},
{
  title: "Hilltop Cottage",
  description: "Cottage with breathtaking views.",
  price: 3000,
  location: "Ooty",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1472224371017-08207f84aaae",
    filename: "mountain2"
  },
  category: "Mountains",
  geometry: {
    type: "Point",
    coordinates: [76.6932, 11.4064]
  }
},

// 10 more

{
  title: "Luxury City Hotel",
  description: "5-star hotel experience.",
  price: 9000,
  location: "Bangalore",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    filename: "city2"
  },
  category: "IconicCities",
  geometry: {
    type: "Point",
    coordinates: [77.5946, 12.9716]
  }
},
{
  title: "Riverside Camp",
  description: "Camping near river with bonfire.",
  price: 1500,
  location: "Kasol",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    filename: "camp2"
  },
  category: "Camping",
  geometry: {
    type: "Point",
    coordinates: [77.3152, 32.0096]
  }
},
{
  title: "Infinity Pool Resort",
  description: "Resort with stunning pool view.",
  price: 7500,
  location: "Udaipur",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b7",
    filename: "pool2"
  },
  category: "AmazingPools",
  geometry: {
    type: "Point",
    coordinates: [73.7125, 24.5854]
  }
},
{
  title: "Heritage Castle Stay",
  description: "Feel royal heritage experience.",
  price: 11000,
  location: "Jodhpur",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    filename: "castle2"
  },
  category: "Castles",
  geometry: {
    type: "Point",
    coordinates: [73.0243, 26.2389]
  }
},
{
  title: "Organic Farm Stay",
  description: "Stay close to nature.",
  price: 2200,
  location: "Nashik",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    filename: "farm2"
  },
  category: "Farms",
  geometry: {
    type: "Point",
    coordinates: [73.7898, 19.9975]
  }
},
{
  title: "Budget Hostel Room",
  description: "Perfect for backpackers.",
  price: 600,
  location: "Varanasi",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    filename: "room2"
  },
  category: "Rooms",
  geometry: {
    type: "Point",
    coordinates: [82.9739, 25.3176]
  }
},
{
  title: "Trending Lake View",
  description: "Popular lake-side property.",
  price: 5000,
  location: "Nainital",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    filename: "trend2"
  },
  category: "Trending",
  geometry: {
    type: "Point",
    coordinates: [79.4591, 29.3803]
  }
},
{
  title: "Snowy Arctic Cabin",
  description: "Cabin surrounded by snow.",
  price: 14000,
  location: "Norway",
  country: "Norway",
  image: {
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    filename: "arctic2"
  },
  category: "Arctic",
  geometry: {
    type: "Point",
    coordinates: [8.4689, 60.4720]
  }
},
{
  title: "Seaside Rooms",
  description: "Affordable rooms near beach.",
  price: 1800,
  location: "Chennai",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
    filename: "room3"
  },
  category: "Rooms",
  geometry: {
    type: "Point",
    coordinates: [80.2707, 13.0827]
  }
},
{
  title: "Mountain Adventure Stay",
  description: "Perfect for trekking lovers.",
  price: 2800,
  location: "Leh",
  country: "India",
  image: {
    url: "https://images.unsplash.com/photo-1464822759844-d150baec0494",
    filename: "mountain3"
  },
  category: "Mountains",
  geometry: {
    type: "Point",
    coordinates: [77.5770, 34.1526]
  }
}
];


module.exports = { data: listings };