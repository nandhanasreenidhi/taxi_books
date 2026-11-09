import {
  ServiceCardData,
  Vehicle,
  Testimonial,
  WhyChooseItem,
  HowItWorksStep,
  PromoOffer,
  DriverInfo,
  CustomerProfile,
} from '../types';

export const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'instant',
    title: 'Instant Taxi',
    tagline: 'Point-to-point city rides in under 5 minutes',
    description: 'Effortless on-demand cabs for daily city office commutes, shopping runs, and metro station hops with instant driver matching.',
    badge: 'Fastest Pickup',
    startingPrice: '₹89',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    perks: ['Average 4 min arrival in metro zones', 'Real-time live telemetry & secure OTP', 'Zero cancellation fee within 5m'],
    idealFor: 'Daily city commutes, quick cross-town meetings, late evening safe returns'
  },
  {
    id: 'rental',
    title: 'Hourly Rental',
    tagline: 'A dedicated chauffeur at your beck and call',
    description: 'Book a sanitized cab with an experienced chauffeur for flexible multi-stop errands, family shopping, temple visits, or client meetings.',
    badge: 'Chauffeur On-Demand',
    startingPrice: '₹499/pkg',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    perks: ['Packages from 2 hrs/20 km to 12 hrs/120 km', 'Unlimited intermediate stops', 'Clean AC vehicle with bottled water'],
    idealFor: 'Executive roadshows, multi-stop family shopping, hospital & doctor visits'
  },
  {
    id: 'outstation',
    title: 'Outstation Travel',
    tagline: 'Intercity travel re-imagined with first-class comfort',
    description: 'Travel between Indian cities in comfort. Highway-certified captains, sanitized cars, one-way drops or relaxed round-trips.',
    badge: 'Intercity Comfort',
    startingPrice: '₹1,850',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    perks: ['Transparent per-km rate with no return charge on one-way', 'Driver night allowance included upfront', 'Fastag automated electronic tolling'],
    idealFor: 'Weekend retreats, hometown visits, pilgrimage tours, business hops'
  },
  {
    id: 'airport',
    title: 'Airport Transfer',
    tagline: 'Flight-tracked terminal concierge & zero-wait departures',
    description: 'Guaranteed on-time airport drops and stress-free arrivals with automated flight delay tracking and terminal pickup zone guidance.',
    badge: 'Flight Synchronized',
    startingPrice: '₹650',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    perks: ['45-minute complimentary wait on domestic arrivals', 'Automated flight delay adjustment', 'Luggage assist included'],
    idealFor: 'Corporate flyers, early morning departures, family holiday transit'
  },
  {
    id: 'self-drive',
    title: 'Self-Drive Car Rental',
    tagline: 'Curated premium fleet for those who love the wheel',
    description: 'Take the helm of our well-maintained hatchbacks, sedans, and SUVs. Doorstep delivery, comprehensive insurance, and pure freedom.',
    badge: 'Keyless Freedom',
    startingPrice: '₹1,299/day',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    perks: ['Fast online Aadhaar/DL KYC approval', 'Full comprehensive insurance included', 'Zero security deposit for verified members'],
    idealFor: 'Road trips, weekend self-drive escapes, visiting NRIs & tourists'
  }
];

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'veh-mini',
    name: 'WAYVIA Mini',
    tier: 'mini',
    brand: 'Maruti Suzuki / Tata',
    model: 'WagonR / Celerio / Tiago',
    tagline: 'Pocket-friendly, nimble city navigator',
    description: 'Ideal for quick solo or duo city rides. High fuel efficiency, cold AC, and hassle-free maneuverability through bustling Indian traffic.',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    seats: 4,
    luggage: 1,
    hasAC: true,
    transmission: 'Manual',
    fuelType: 'Petrol / CNG',
    baseFare: 70,
    ratePerKm: 11.5,
    perMinuteRate: 1.2,
    badge: 'Most Economical',
    features: ['Chilled Air Conditioning', 'Clean Sanitized Cabin', 'Compact Luggage Boot', 'Digital Metering'],
    specs: {
      bootSpace: '180 Litres',
      mileageOrRange: '26 km/kg CNG',
      comfortRating: '4.6 / 5.0',
      safetyAirbags: 'Dual Front Airbags'
    }
  },
  {
    id: 'veh-hatchback',
    name: 'WAYVIA Go (Hatchback)',
    tier: 'hatchback',
    brand: 'Maruti Suzuki / Hyundai',
    model: 'Swift / Grand i10 Nios',
    tagline: 'Popular comfortable hatchback for everyday trips',
    description: 'The preferred choice for everyday urban travel. Comfortable legroom for up to 4 passengers, smooth suspension, and USB charging.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    seats: 4,
    luggage: 2,
    hasAC: true,
    transmission: 'Manual',
    fuelType: 'Petrol / CNG',
    baseFare: 90,
    ratePerKm: 13.0,
    perMinuteRate: 1.5,
    badge: 'Popular Choice',
    features: ['High-Power AC', 'Dual USB Charging', 'Ergonomic Seat Cushions', 'Music Bluetooth Connectivity'],
    specs: {
      bootSpace: '260 Litres',
      mileageOrRange: '22 km/l',
      comfortRating: '4.75 / 5.0',
      safetyAirbags: 'Dual Airbags + ABS'
    }
  },
  {
    id: 'veh-sedan',
    name: 'WAYVIA Prime Sedan',
    tier: 'sedan',
    brand: 'Maruti Suzuki / Honda',
    model: 'Dzire / Honda Amaze',
    tagline: 'Spacious comfort with generous boot capacity',
    description: 'Perfect for business professionals and airport runs with luggage. Generous rear legroom, rear AC vents, and experienced chauffeurs.',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
    seats: 4,
    luggage: 3,
    hasAC: true,
    transmission: 'Automatic',
    fuelType: 'Petrol / CNG',
    baseFare: 130,
    ratePerKm: 15.5,
    perMinuteRate: 2.0,
    popular: true,
    badge: 'Top Rated Sedan',
    features: ['Rear AC Blower Vents', 'Bottled Mineral Water', 'Deep Luggage Boot (378L)', 'Silent Cabin Ride'],
    specs: {
      bootSpace: '378 Litres (Fits 2 large bags)',
      mileageOrRange: '23 km/l Hybrid Petrol',
      comfortRating: '4.9 / 5.0',
      safetyAirbags: '6 Airbags (Standard)'
    }
  },
  {
    id: 'veh-suv',
    name: 'WAYVIA XL (Family SUV)',
    tier: 'suv',
    brand: 'Maruti Suzuki / Kia',
    model: 'Ertiga / Kia Carens Prestige',
    tagline: 'Spacious 6-7 seater for families & group outings',
    description: 'Designed for family airport transfers, outstation holidays, and shopping sprees. Flexible 3-row seating, roof AC vents, and ample storage.',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    seats: 6,
    luggage: 4,
    hasAC: true,
    transmission: 'Automatic',
    fuelType: 'Petrol / CNG',
    baseFare: 190,
    ratePerKm: 19.0,
    perMinuteRate: 2.5,
    badge: 'Family & Luggage',
    features: ['3-Row Roof-Mounted AC', 'Reclining Middle Row', 'Spacious Foldable Boot', 'Smooth Highway Suspension'],
    specs: {
      bootSpace: '550 Litres (seats folded)',
      mileageOrRange: '19 km/l',
      comfortRating: '4.85 / 5.0',
      safetyAirbags: '6 Airbags + ESP'
    }
  },
  {
    id: 'veh-premium',
    name: 'WAYVIA Executive (Innova Crysta / Hycross)',
    tier: 'premium',
    brand: 'Toyota',
    model: 'Innova Crysta / Innova Hycross Hybrid',
    tagline: 'The undisputed gold standard of Indian highway luxury',
    description: 'Unmatched comfort for corporate dignitaries and long-distance outstation travel. Reclining captain chairs, whisper-quiet hybrid drive, and top-tier highway pilots.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    seats: 6,
    luggage: 5,
    hasAC: true,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    baseFare: 290,
    ratePerKm: 24.0,
    perMinuteRate: 3.5,
    badge: 'First-Class Executive',
    features: ['Executive Captain Ottoman Seats', 'Dual-Zone Climate Control', 'High-Speed Mobile Fast Charger', 'Highway Pilot in Uniform'],
    specs: {
      bootSpace: '650 Litres Executive Boot',
      mileageOrRange: 'Strong Hybrid Silent EV Mode',
      comfortRating: '5.0 / 5.0',
      safetyAirbags: '7 Airbags + Toyota Safety Sense'
    }
  }
];

export const POPULAR_INDIAN_LOCATIONS = [
  'Chennai International Airport (MAA - T1 Domestic)',
  'Chennai International Airport (MAA - T4 International)',
  'T. Nagar (Panagal Park), Chennai',
  'Anna Nagar Roundtana, Chennai',
  'OMR IT Corridor (Tidel Park / Thoraipakkam), Chennai',
  'Velachery Phoenix Marketcity, Chennai',
  'Bengaluru Kempegowda Airport (BLR - Terminal 1)',
  'Bengaluru Kempegowda Airport (BLR - Terminal 2)',
  'Indiranagar 100ft Road, Bengaluru',
  'Whitefield ITPL Main Gate, Bengaluru',
  'Koramangala Sony World Junction, Bengaluru',
  'Electronic City Phase 1 (Infosys Gate), Bengaluru',
  'Kochi International Airport (COK - Nedumbassery)',
  'MG Road / Marine Drive, Kochi',
  'Technopark Phase 3 Campus, Trivandrum',
  'BKC (Bandra Kurla Complex), Mumbai',
  'Chhatrapati Shivaji Maharaj Airport (BOM - T2), Mumbai',
  'Cyber City DLF Phase 2, Gurugram / Delhi NCR',
  'Indira Gandhi International Airport (DEL - T3), New Delhi',
  'HITEC City / Cyber Towers, Hyderabad'
];

export const OUTSTATION_DESTINATIONS = [
  { city: 'Pondicherry', from: 'Chennai', distance: '165 km', time: '3h 15m', estFare: '₹2,650' },
  { city: 'Tirupati (Temple Town)', from: 'Chennai', distance: '140 km', time: '3h 30m', estFare: '₹2,450' },
  { city: 'Mysuru (Palace City)', from: 'Bengaluru', distance: '145 km', time: '2h 45m', estFare: '₹2,350' },
  { city: 'Coorg (Madikeri)', from: 'Bengaluru', distance: '240 km', time: '5h 10m', estFare: '₹3,950' },
  { city: 'Ooty (Nilgiris)', from: 'Coimbatore', distance: '85 km', time: '2h 40m', estFare: '₹1,950' },
  { city: 'Munnar (Tea Hills)', from: 'Kochi', distance: '125 km', time: '3h 45m', estFare: '₹2,550' },
  { city: 'Pune (Shivaji Nagar)', from: 'Mumbai', distance: '150 km', time: '3h 20m', estFare: '₹2,750' },
  { city: 'Agra (Taj Express)', from: 'Delhi NCR', distance: '210 km', time: '3h 30m', estFare: '₹3,250' },
  { city: 'Jaipur (Pink City)', from: 'Delhi NCR', distance: '280 km', time: '4h 45m', estFare: '₹4,150' },
];

export const HOURLY_RENTAL_PACKAGES = [
  { id: 'p2-20', label: '2 Hours / 20 km', durationHours: 2, distanceKm: 20, priceMultiplier: 1.0 },
  { id: 'p4-40', label: '4 Hours / 40 km', durationHours: 4, distanceKm: 40, priceMultiplier: 1.85 },
  { id: 'p8-80', label: '8 Hours / 80 km (Full Day)', durationHours: 8, distanceKm: 80, priceMultiplier: 3.4 },
  { id: 'p12-120', label: '12 Hours / 120 km (Grand City Tour)', durationHours: 12, distanceKm: 120, priceMultiplier: 4.8 },
];

export const MOCK_DRIVERS: DriverInfo[] = [
  {
    id: 'drv-1',
    name: 'Murugan S.',
    phone: '+91 98402 11984',
    rating: 4.95,
    tripsCount: 1420,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    vehicleModel: 'Maruti Suzuki Dzire (White)',
    vehiclePlate: 'TN 09 BK 4521',
    vehicleColor: 'Pearl White',
    otp: '4821',
    languages: ['Tamil', 'English', 'Hindi'],
  },
  {
    id: 'drv-2',
    name: 'Karthik Ramanathan',
    phone: '+91 97890 44219',
    rating: 4.98,
    tripsCount: 2150,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    vehicleModel: 'Toyota Innova Crysta (Silver)',
    vehiclePlate: 'KA 01 MJ 8820',
    vehicleColor: 'Silver Metallic',
    otp: '9152',
    languages: ['Kannada', 'English', 'Tamil'],
  },
  {
    id: 'drv-3',
    name: 'Amitabh Sharma',
    phone: '+91 98110 32910',
    rating: 4.92,
    tripsCount: 980,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    vehicleModel: 'Kia Carens Prestige (Grey)',
    vehiclePlate: 'DL 1Z B 9012',
    vehicleColor: 'Gravity Grey',
    otp: '3318',
    languages: ['Hindi', 'English', 'Punjabi'],
  }
];

export const DEMO_PROMOS: PromoOffer[] = [
  {
    code: 'WAYVIAFIRST',
    discountType: 'flat',
    discountValue: 150,
    description: 'Flat ₹150 OFF on your first ride with WAYVIA',
    minBookingAmount: 300,
    validTill: '31 Dec 2026',
  },
  {
    code: 'AIRPORT100',
    discountType: 'flat',
    discountValue: 100,
    description: 'Flat ₹100 OFF on any Airport Departure or Arrival transfer',
    minBookingAmount: 500,
    validTill: '31 Dec 2026',
    serviceApplicable: 'airport',
  },
  {
    code: 'WEEKEND15',
    discountType: 'percentage',
    discountValue: 15,
    description: '15% OFF (up to ₹350) on Outstation highway rides',
    minBookingAmount: 1500,
    validTill: '31 Dec 2026',
    serviceApplicable: 'outstation',
  },
  {
    code: 'RENTAL200',
    discountType: 'flat',
    discountValue: 200,
    description: 'Flat ₹200 OFF on 8-Hour / 12-Hour Chauffeur Rentals',
    minBookingAmount: 1200,
    validTill: '31 Dec 2026',
    serviceApplicable: 'rental',
  }
];

export const INITIAL_CUSTOMER_PROFILE: CustomerProfile = {
  id: 'cust-in-01',
  name: 'Priya Sundaram',
  phone: '+91 98765 43210',
  email: 'priya.sundaram@wayvia-demo.in',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  city: 'Chennai',
  walletBalance: 2450.00,
  coins: 480,
  memberTier: 'Gold',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home (Apartment)',
      tag: 'home',
      address: 'Tower B, 804, Olympia Opaline, Navalur, OMR',
      landmark: 'Opp. Vivira Mall',
      city: 'Chennai',
      pincode: '600130',
    },
    {
      id: 'addr-2',
      label: 'Office (Tech Park)',
      tag: 'work',
      address: 'Block 3, Ramanujan IT City, Taramani',
      landmark: 'Next to Tidel Park',
      city: 'Chennai',
      pincode: '600113',
    },
    {
      id: 'addr-3',
      label: 'Airport Terminal 1',
      tag: 'airport',
      address: 'Chennai International Airport (MAA), Meenambakkam',
      landmark: 'Departure Gate 3',
      city: 'Chennai',
      pincode: '600027',
    },
    {
      id: 'addr-4',
      label: "Parents' Residence",
      tag: 'other',
      address: '14, 2nd Avenue, Near Anna Nagar Roundtana',
      landmark: 'Beside Nilgiris Supermarket',
      city: 'Chennai',
      pincode: '600040',
    }
  ],
  emergencyContacts: [
    {
      id: 'ec-1',
      name: 'Ramesh Sundaram (Father)',
      relation: 'Father',
      phone: '+91 94440 12345',
      alertOnRideStart: true,
    },
    {
      id: 'ec-2',
      name: 'Dr. Kavitha S. (Spouse)',
      relation: 'Spouse',
      phone: '+91 98410 98765',
      alertOnRideStart: true,
    }
  ],
  preferences: {
    acPreference: 'chill',
    quietRide: true,
    assistLuggage: true,
    preferredLanguage: 'English & Tamil',
  }
};

export const INITIAL_WALLET_TRANSACTIONS = [
  {
    id: 'tx-101',
    type: 'credit' as const,
    title: 'Wallet Top-Up via UPI',
    description: 'Added via Google Pay (UPI ID: priya@okaxis)',
    amount: 2000,
    date: '02 Nov 2026, 11:20 AM',
    status: 'success' as const,
    paymentMethod: 'UPI'
  },
  {
    id: 'tx-102',
    type: 'debit' as const,
    title: 'Ride Payment #WV-IN-72019',
    description: 'Instant Taxi: T. Nagar to Velachery Phoenix',
    amount: 246.75,
    date: '01 Nov 2026, 04:45 PM',
    status: 'success' as const,
    bookingId: 'WV-IN-72019'
  },
  {
    id: 'tx-103',
    type: 'credit' as const,
    title: 'WAYVIA Coin Cashback',
    description: '5% loyalty reward for completed airport trip',
    amount: 50,
    date: '28 Oct 2026, 09:15 PM',
    status: 'success' as const
  },
  {
    id: 'tx-104',
    type: 'credit' as const,
    title: 'Trip Cancellation Refund',
    description: 'Instant 100% refund credited for cancelled booking #WV-IN-55109',
    amount: 646.75,
    date: '24 Oct 2026, 02:10 PM',
    status: 'success' as const
  }
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    iconName: 'ShieldCheck',
    title: 'Police-Verified Chauffeurs',
    description: 'Every chauffeur undergoes rigorous background checks, document verification, and defensive driving certification.',
    highlight: 'Top 3% Chauffeur Selection Rate',
    badge: 'Certified'
  },
  {
    iconName: 'Zap',
    title: 'Zero Surge Shock Guarantee',
    description: 'Transparent dynamic pricing locked the instant you review your quote. No unpredictable surge multipliers at trip end.',
    highlight: '100% Upfront Indicative Quote',
    badge: 'Fair Pricing'
  },
  {
    iconName: 'Sparkles',
    title: 'Pristine Sanitized Fleet',
    description: 'Every vehicle undergoes multi-point inspection, high-power AC maintenance, and clinical interior detailing between rides.',
    highlight: 'Clinical Clean Guarantee',
    badge: 'Pristine Standard'
  },
  {
    iconName: 'Clock',
    title: 'Punctuality Guarantee',
    description: 'We respect your time. If your pre-booked airport or outstation chauffeur is more than 5 minutes late, enjoy a flat ₹200 voucher.',
    highlight: '99.8% On-Time Precision',
    badge: 'Ironclad Guarantee'
  },
  {
    iconName: 'Headphones',
    title: '24/7 Local Indian Concierge',
    description: 'Connect directly with our dedicated mobility dispatch teams in Chennai, Bengaluru, Mumbai, and Delhi in under 15 seconds.',
    highlight: '< 15s Direct Human Response',
    badge: 'Always Here'
  },
  {
    iconName: 'Leaf',
    title: 'Electric & Clean Mobility',
    description: 'Growing fleet of 100% electric and hybrid vehicles across major Indian metros with automated carbon offsetting.',
    highlight: 'Green India Pledged',
    badge: 'Green Mobility'
  }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    number: 'Step 1',
    title: 'Choose Service & Vehicle',
    description: 'Select from Instant City Cabs, Hourly Rentals, Outstation Highway Rides, Airport Transfers, or Self-Drive.',
    detail: 'Pick from Mini, Hatchback, Prime Sedan, Family SUV, or Executive Innova Crysta.',
    iconName: 'Car'
  },
  {
    step: '02',
    number: 'Step 2',
    title: 'Transparent Indicative Fare',
    description: 'Enter your Indian pickup and drop location or package duration to inspect clear itemized rates.',
    detail: 'All tolls, GST, and driver allowances calculated with complete transparency.',
    iconName: 'Calculator'
  },
  {
    step: '03',
    number: 'Step 3',
    title: 'Track Chauffeur & Verify OTP',
    description: 'Follow your assigned chauffeur on live simulated GPS with vehicle registration plate and start ride with 4-digit OTP.',
    detail: 'Receive driver name, photo, ratings, contact info, and instant ETA.',
    iconName: 'Navigation'
  },
  {
    step: '04',
    number: 'Step 4',
    title: 'Seamless Indian Payments',
    description: 'Pay conveniently using UPI (GPay, PhonePe, Paytm), WAYVIA Wallet, Credit/Debit Card, or direct Cash.',
    detail: 'Instant GST tax invoice and digital receipt sent directly to WhatsApp and email.',
    iconName: 'CheckCircle2'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya Sundaram',
    role: 'Director of Product',
    company: 'Zoho Corporation, Chennai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'WAYVIA is the only mobility service our leadership team trusts for airport runs and client visits across Chennai and Bengaluru. Pristine Innova Crystas, disciplined chauffeurs, and zero surge stress.',
    tripType: 'Airport Transfer & Outstation',
    route: 'OMR IT Corridor → Chennai International Airport (MAA)',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Rajesh Kumar',
    role: 'VP of Engineering',
    company: 'Flipkart, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'The difference between regular cab aggregators and WAYVIA is enormous. Clean Dzires, disciplined drivers who never cancel on you, and effortless UPI and corporate invoicing. Indispensable for Whitefield to Airport commutes.',
    tripType: 'Airport & Corporate Commute',
    route: 'Whitefield ITPL → Kempegowda International Airport (BLR)',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Amit Sharma',
    role: 'Fintech Founder',
    company: 'Nexus Capital, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'Booked an outstation trip from Mumbai to Pune and an hourly rental for investor roadshows in BKC. The chauffeur was punctual, courteous, and drove smoothly through expressway traffic. Highly recommended!',
    tripType: 'Outstation Highway Travel',
    route: 'Bandra Kurla Complex (BKC) → Shivaji Nagar, Pune',
    verified: true
  }
];

export const POPULAR_LOCATIONS = POPULAR_INDIAN_LOCATIONS;
