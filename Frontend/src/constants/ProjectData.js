import building1 from "../assets/buildingImage/building1.jpeg";
import building2 from "../assets/buildingImage/building2.jpeg";
import building3 from "../assets/buildingImage/building3.jpg";
import HeroBg from "/image/HeroBg.png";

const projects = [
  {
    id: "sr-white-phase-13",

    // BASIC INFO
    title: "SR White Phase 13",
    tagline: "Crafted for elevated modern living.",
    category: "Luxury Residences",
    location: "Baramati, Maharashtra",

    // HERO
    image: building1,
    heroVideo:
      "https://www.w3schools.com/html/mov_bbb.mp4",

    // STATUS
    status: "Completed",
    possession: "December 2026",
    rera: "P52100045891",

    // DESCRIPTION
    description:
      "A masterclass in modern luxury and minimalist architecture, designed for those who appreciate the finer details of residential comfort.",

    longDescription:
      "SR White Phase 13 is a premium residential destination thoughtfully designed with elegant architecture, spacious residences, natural ventilation, and refined modern aesthetics. Every residence is curated to deliver comfort, sophistication, and timeless living experiences.",

    // SPECS
    specs: {
      totalArea: "15,000 sq ft",
      year: "2026",
      architect: "SR Design Studio",
      status: "Completed",
      towers: "4 Towers",
      floors: "18 Floors",
    },

    // HIGHLIGHTS
    highlights: [
      "Infinity Swimming Pool",
      "Premium Clubhouse",
      "Landscape Garden",
      "Fitness Center",
      "Children Play Area",
      "24x7 Security",
    ],

    // AMENITIES
    amenities: [
      {
        title: "Infinity Pool",
        image: building2,
      },
      {
        title: "Sky Lounge",
        image: building3,
      },
      {
        title: "Modern Gymnasium",
        image: building1,
      },
      {
        title: "Clubhouse",
        image: HeroBg,
      },
    ],

    // UNITS
    units: [
      {
        type: "1 BHK",
        area: "650 sq ft",
        price: "₹39 Lakhs",
        image: building1,
        floorPlan: building1,
      },

      {
        type: "2 BHK",
        area: "1050 sq ft",
        price: "₹58 Lakhs",
        image: building2,
        floorPlan: building2,
      },

      {
        type: "3 BHK",
        area: "1450 sq ft",
        price: "₹82 Lakhs",
        image: building3,
        floorPlan: building3,
      },
    ],

    // LANDMARKS
    landmarks: [
      {
        name: "Baramati Railway Station",
        distance: "2 km",
      },

      {
        name: "City International School",
        distance: "0.5 km",
      },

      {
        name: "Baramati Airport",
        distance: "5 km",
      },

      {
        name: "Central Hospital",
        distance: "1.2 km",
      },
    ],

    // GALLERY
    gallery: [
      building1,
      building2,
      building3,
      HeroBg,
    ],

    // VIDEO
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",

    // MAP
    mapEmbed:
      "https://www.google.com/maps/embed?pb=...",

    // CONTACT
    contact: {
      phone: "+91 9876543210",
      whatsapp: "+91 9876543210",
      email: "sales@srgroup.com",
      website: "www.srgroup.com",
      address:
        "SR Group Headquarters, Baramati, Maharashtra",
    },

    // SALES MANAGER
    salesManager: {
      name: "Rahul Sharma",
      role: "Senior Sales Consultant",
      image: building1,
      phone: "+91 9876543210",
      email: "rahul@srgroup.com",
    },

    // BROCHURE
    brochure: "/brochure/sr-white-phase-13.pdf",

    // FAQ
    faqs: [
      {
        question: "What is the possession date?",
        answer: "December 2026",
      },

      {
        question: "Is the project RERA approved?",
        answer:
          "Yes, SR White Phase 13 is fully RERA approved.",
      },

      {
        question: "Are site visits available?",
        answer:
          "Yes, site visits can be scheduled anytime.",
      },
    ],
  },

  {
    id: "sr-horizon-tower",

    title: "SR Horizon Tower",
    tagline: "An iconic skyline statement.",
    category: "Commercial Tower",
    location: "Financial District",

    image: building2,

    status: "Under Construction",
    possession: "June 2027",
    rera: "P52100078945",

    description:
      "An iconic glass-and-steel monolith redefining luxury commercial architecture.",

    longDescription:
      "SR Horizon Tower combines world-class corporate infrastructure with contemporary urban design, delivering a futuristic commercial environment for modern businesses and executive living.",

    specs: {
      totalArea: "120,000 sq ft",
      year: "2027",
      architect: "Vanguard Partners",
      status: "Under Construction",
      towers: "1 Tower",
      floors: "42 Floors",
    },

    highlights: [
      "Business Lounge",
      "Sky Deck",
      "Executive Suites",
      "Retail Plaza",
      "Smart Access Systems",
    ],

    amenities: [
      {
        title: "Sky Deck",
        image: building2,
      },

      {
        title: "Business Lounge",
        image: building3,
      },

      {
        title: "Luxury Lobby",
        image: building1,
      },
    ],

    units: [
      {
        type: "Executive Suite",
        area: "2200 sq ft",
        price: "On Request",
        image: building2,
        floorPlan: building1,
      },

      {
        type: "Penthouse Office",
        area: "4500 sq ft",
        price: "On Request",
        image: building3,
        floorPlan: building2,
      },
    ],

    landmarks: [
      {
        name: "Central Metro Station",
        distance: "0.2 km",
      },

      {
        name: "Grand Plaza Mall",
        distance: "1.5 km",
      },
    ],

    gallery: [
      building2,
      HeroBg,
      building1,
      building3,
    ],

    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",

    mapEmbed:
      "https://www.google.com/maps/embed?pb=...",

    contact: {
      phone: "+91 9876543210",
      whatsapp: "+91 9876543210",
      email: "commercial@srgroup.com",
      website: "www.srgroup.com",
      address:
        "Financial District, Maharashtra",
    },

    salesManager: {
      name: "Priya Deshmukh",
      role: "Commercial Sales Director",
      image: building2,
      phone: "+91 9876543210",
      email: "priya@srgroup.com",
    },

    brochure: "/brochure/horizon-tower.pdf",

    faqs: [
      {
        question: "Is parking available?",
        answer:
          "Yes, multi-level parking is available.",
      },
    ],
  },

  {
    id: "sr-serene-villas",

    title: "SR Serene Villas",
    tagline: "Private estates inspired by nature.",
    category: "Luxury Villas",
    location: "Hillside Reserve",

    image: building3,

    status: "Available",
    possession: "Ready To Move",
    rera: "P52100065412",

    description:
      "Exclusive hillside villas designed for ultra-private luxury living.",

    longDescription:
      "SR Serene Villas offers a rare blend of modern architecture and tranquil natural surroundings, creating a private sanctuary crafted for sophisticated lifestyles.",

    specs: {
      totalArea: "50,000 sq ft",
      year: "2025",
      architect: "Green Horizon Studio",
      status: "Available",
      villas: "48 Villas",
    },

    highlights: [
      "Private Gardens",
      "Infinity Pool",
      "Nature Trails",
      "Luxury Interiors",
    ],

    amenities: [
      {
        title: "Private Garden",
        image: building3,
      },

      {
        title: "Luxury Pool",
        image: building2,
      },
    ],

    units: [
      {
        type: "4 BHK Villa",
        area: "3500 sq ft",
        price: "₹2.5 Cr",
        image: building3,
        floorPlan: building1,
      },

      {
        type: "5 BHK Villa",
        area: "4800 sq ft",
        price: "₹3.8 Cr",
        image: building1,
        floorPlan: building2,
      },
    ],

    landmarks: [
      {
        name: "Nature Reserve Park",
        distance: "0.1 km",
      },

      {
        name: "Hilltop Golf Club",
        distance: "3.5 km",
      },
    ],

    gallery: [
      building3,
      building1,
      HeroBg,
      building2,
    ],

    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",

    mapEmbed:
      "https://www.google.com/maps/embed?pb=...",

    contact: {
      phone: "+91 9876543210",
      whatsapp: "+91 9876543210",
      email: "villas@srgroup.com",
      website: "www.srgroup.com",
      address:
        "Hillside Reserve, Maharashtra",
    },

    salesManager: {
      name: "Aarav Patil",
      role: "Luxury Villa Consultant",
      image: building3,
      phone: "+91 9876543210",
      email: "aarav@srgroup.com",
    },

    brochure: "/brochure/serene-villas.pdf",

    faqs: [
      {
        question: "Are villas fully furnished?",
        answer:
          "Custom furnishing packages are available.",
      },
    ],
  },
];

export default projects;