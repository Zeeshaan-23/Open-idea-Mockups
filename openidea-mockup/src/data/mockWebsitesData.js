/**
 * Mock data for Open Idea Websites & Bespoke Engineering
 * Source of truth: https://openidea.world/websites, /websites/templates, /form
 */

export const WEBSITE_SECTORS = [
  { id: 'all', label: 'All Industries' },
  { id: 'hospitality', label: 'Food & Hospitality' },
  { id: 'health', label: 'Healthcare & Wellness' },
  { id: 'education', label: 'Education & Coaching' },
  { id: 'retail', label: 'Retail & Commerce' },
  { id: 'services', label: 'Trades & Home Services' },
  { id: 'creative', label: 'Creative & Events' }
];

export const INDUSTRY_DEMOS = [
  // Food & Hospitality
  {
    id: 'restaurant',
    name: 'Restaurant & Cafe',
    slug: 'restaurant',
    sector: 'hospitality',
    icon: '🍽️',
    tagline: 'Authentic dining with one-tap WhatsApp ordering',
    description: 'Full digital menu with veg/non-veg indicators, daily combo deals, table reservation via WhatsApp, and Google Maps directions.',
    colors: { primary: '#C0392B', secondary: '#E74C3C', accent: '#C8A951', background: '#FDF6EC' },
    features: ['WhatsApp Table Booking', 'Live Digital Menu', 'Veg / Non-Veg Filtering', 'Delivery Combos', 'Google Maps Pin'],
    sampleData: {
      brandName: "Sharma's Kitchen",
      established: '1985',
      headline: 'Authentic North Indian Cuisine',
      subheadline: 'Three generations of taste. Pure desi ghee, hand-ground spices, zero shortcuts.',
      rating: '4.7 on Google Maps',
      timing: '11:00 AM – 11:00 PM (All Days)',
      sampleItems: [
        { name: 'Dal Makhani', price: '₹280', type: 'veg', desc: 'Slow-cooked black lentils in creamy tomato gravy with butter.' },
        { name: 'Butter Chicken', price: '₹360', type: 'non-veg', desc: 'Tandoori chicken in rich, velvety makhani gravy.' },
        { name: 'Paneer Lababdar', price: '₹320', type: 'veg', desc: 'Cottage cheese cubes in spiced onion-tomato gravy with cashew paste.' },
        { name: 'Garlic Naan', price: '₹70', type: 'veg', desc: 'Soft tandoor-baked naan topped with fresh garlic & coriander butter.' }
      ]
    }
  },
  {
    id: 'bakery',
    name: 'Bakery & Sweet Shop',
    slug: 'bakery',
    sector: 'hospitality',
    icon: '🍰',
    tagline: 'Custom cakes, artisan breads & seasonal gift boxes',
    description: 'Showcases daily bake schedules, customized anniversary & birthday cake pre-orders, and festive sweet hampers.',
    colors: { primary: '#6D4C41', secondary: '#F48FB1', accent: '#FFB74D', background: '#FFF8E1' },
    features: ['Custom Cake Ordering', 'Daily Fresh Bakes', 'Festive Hampers', 'WhatsApp Enquiries', 'Ingredient Transparency'],
    sampleData: {
      brandName: 'The Crumb & Crust Co.',
      established: '2012',
      headline: 'Artisan Pastries & Celebration Cakes',
      subheadline: 'Baked fresh every morning with 100% pure dairy butter and Belgian chocolate.',
      timing: '8:00 AM – 10:00 PM',
      sampleItems: [
        { name: 'Belgian Truffle Cake (1kg)', price: '₹750', type: 'veg', desc: 'Rich chocolate ganache layered with dark sponge.' },
        { name: 'Almond Croissant (Box of 4)', price: '₹360', type: 'veg', desc: 'Flaky French butter pastry with roasted almond frangipane.' }
      ]
    }
  },
  {
    id: 'hotel',
    name: 'Hotel & Guest House',
    slug: 'hotel',
    sector: 'hospitality',
    icon: '🏨',
    tagline: 'Direct room booking without high OTA commissions',
    description: 'Clean room catalogues, amenity highlights, banquet hall inquiry forms, and instant WhatsApp concierge.',
    colors: { primary: '#1A237E', secondary: '#C5A355', accent: '#3949AB', background: '#FFF8E1' },
    features: ['Direct Room Inquiry', 'Banquet & Event Booking', 'Amenity Checklist', 'Local Sightseeing Guide', 'Instant WhatsApp Reception'],
    sampleData: {
      brandName: 'The Heritage Residency',
      established: '2004',
      headline: 'Comfortable Stays in the Heart of the City',
      subheadline: 'Air-conditioned deluxe rooms, 24/7 room service, and complimentary high-speed Wi-Fi.',
      timing: '24/7 Front Desk',
      sampleItems: [
        { name: 'Deluxe King Room', price: '₹2,499 / night', type: 'stay', desc: 'Includes complimentary breakfast, king bed, and city view.' },
        { name: 'Executive Suite', price: '₹4,199 / night', type: 'stay', desc: 'Separate living room, work desk, and express check-in.' }
      ]
    }
  },
  {
    id: 'caterer',
    name: 'Catering & Tiffin Service',
    slug: 'caterer',
    sector: 'hospitality',
    icon: '🍛',
    tagline: 'Wedding catering menus & monthly corporate meal plans',
    description: 'Per-plate pricing calculators, dietary preference filters, and corporate lunch subscription forms.',
    colors: { primary: '#880E4F', secondary: '#C5A355', accent: '#AD1457', background: '#FCE4EC' },
    features: ['Per-Plate Menu Builder', 'Monthly Subscription Form', 'Dietary Customization', 'Sample Tasting Requests'],
    sampleData: {
      brandName: 'Royal Feast Caterers',
      established: '1998',
      headline: 'Unforgettable Food for Grand Celebrations',
      subheadline: 'Serving weddings, corporate gatherings, and private parties from 50 to 2,000 guests.',
      timing: 'Bookings Open Daily',
      sampleItems: [
        { name: 'Silver Wedding Buffet', price: '₹650 / plate', type: 'event', desc: '3 Starters, 4 Mains, 2 Breads, 2 Desserts, Welcome Drink.' },
        { name: 'Executive Office Thali (Monthly)', price: '₹2,800 / month', type: 'sub', desc: 'Delivered Mon-Fri to your desk in thermal containers.' }
      ]
    }
  },

  // Healthcare & Wellness
  {
    id: 'clinic',
    name: 'Doctor Clinic & Polyclinic',
    slug: 'clinic',
    sector: 'health',
    icon: '🏥',
    tagline: 'Doctor profiles, OPD timings & fast appointment booking',
    description: 'Clear consultation hours, doctor credentials, clinic directions, and WhatsApp appointment confirmations that save patient phone queues.',
    colors: { primary: '#00796B', secondary: '#26A69A', accent: '#004D40', background: '#E0F2F1' },
    features: ['OPD Timetable by Doctor', 'WhatsApp Appointment Booking', 'Diagnostic Services List', 'Insurance / TPA Guidance'],
    sampleData: {
      brandName: 'City Care Polyclinic',
      established: '2015',
      headline: 'Comprehensive Family Healthcare Under One Roof',
      subheadline: 'General medicine, pediatric consultations, pathology collection, and preventative checkups.',
      timing: '9:00 AM – 8:00 PM (Closed Sunday Evening)',
      sampleItems: [
        { name: 'General Physician Consultation', price: '₹400', type: 'opd', desc: '30-minute consultation with senior family doctor.' },
        { name: 'Comprehensive Health Checkup', price: '₹1,200', type: 'test', desc: 'CBC, Lipid profile, Fasting blood sugar, Liver function tests.' }
      ]
    }
  },
  {
    id: 'dentist',
    name: 'Dental Care & Orthodontics',
    slug: 'dentist',
    sector: 'health',
    icon: '🦷',
    tagline: 'Transparent procedure fees & pain-free dental booking',
    description: 'Detailed breakdowns for root canals, teeth whitening, aligners, and emergency dental WhatsApp helpline.',
    colors: { primary: '#0277BD', secondary: '#00ACC1', accent: '#E1F5FE', background: '#F4FBFB' },
    features: ['Procedure Pricing Guide', 'Before / After Gallery', 'Emergency Slot Booking', 'Sterilization Protocol Showcase'],
    sampleData: {
      brandName: 'Smiles Dental Studio',
      established: '2018',
      headline: 'Gentle, Modern Dentistry for the Entire Family',
      subheadline: 'Advanced digital X-rays, painless root canals, and invisible aligners.',
      timing: '10:00 AM – 7:30 PM (Mon–Sat)',
      sampleItems: [
        { name: 'Scaling & Polishing', price: '₹800', type: 'procedure', desc: 'Ultrasonic cleaning to remove tartar and surface stains.' },
        { name: 'Rotary Root Canal Treatment', price: '₹2,500', type: 'procedure', desc: 'Single-sitting painless root canal with digital apex locator.' }
      ]
    }
  },
  {
    id: 'medical-store',
    name: 'Medical Store & Pharmacy',
    slug: 'medical-store',
    sector: 'health',
    icon: '💊',
    tagline: 'WhatsApp prescription uploads & rapid home delivery',
    description: 'Allows patients to snap a picture of their prescription on WhatsApp, confirm delivery address, and receive medicines with cold-chain care.',
    colors: { primary: '#1B5E20', secondary: '#2196F3', accent: '#4CAF50', background: '#E8F5E9' },
    features: ['Prescription Photo Upload via WhatsApp', 'Generic Medicine Availability', 'Home Delivery within 2 Hours', 'Elderly Refill Reminders'],
    sampleData: {
      brandName: 'Apollo Care Chemist',
      established: '2008',
      headline: 'Genuine Medicines & Surgical Supplies at Your Doorstep',
      subheadline: 'Send your prescription on WhatsApp and get free delivery within 3 km.',
      timing: '8:00 AM – 11:00 PM (365 Days)',
      sampleItems: [
        { name: 'Home Delivery Service', price: 'Free above ₹300', type: 'delivery', desc: 'Deliveries handled by licensed staff in tamper-proof bags.' },
        { name: 'Surgical & BP Monitor Rental', price: 'From ₹350/mo', type: 'device', desc: 'Digital BP monitors, pulse oximeters, and nebulizers.' }
      ]
    }
  },
  {
    id: 'optician',
    name: 'Optician & Eyewear Store',
    slug: 'optician',
    sector: 'health',
    icon: '👓',
    tagline: 'Computer vision testing & designer spectacle frames',
    description: 'Frame catalog with price ranges, lens type explanations (blue-cut, progressive), and appointment booking for computerized eye tests.',
    colors: { primary: '#00838F', secondary: '#FF6D00', accent: '#0097A7', background: '#E0F7FA' },
    features: ['Computerized Eye Test Slots', 'Frame Catalog by Face Shape', 'Lens Coating Guide', 'Prescription Glass Ready in 24 hrs'],
    sampleData: {
      brandName: 'Vision Point Opticians',
      established: '2010',
      headline: 'Clear Vision, Contemporary Frames',
      subheadline: 'Over 800 frames in titanium, acetate, and lightweight TR90.',
      timing: '10:30 AM – 9:00 PM',
      sampleItems: [
        { name: 'Anti-Glare Blue Cut Glasses', price: 'From ₹999', type: 'eyewear', desc: 'Complete frame + high-index blue ray protection lens.' },
        { name: 'Comprehensive Eye Examination', price: 'Free with purchase', type: 'service', desc: 'Auto-refractometer test by certified optometrists.' }
      ]
    }
  },

  // Fitness & Wellness
  {
    id: 'gym',
    name: 'Gym & Fitness Center',
    slug: 'gym',
    sector: 'health',
    icon: '💪',
    tagline: 'Membership tiers, trainer profiles & free trial day',
    description: 'Equipment inventory, batch schedules, personal training packages, and instant WhatsApp registration for a 1-day free guest workout.',
    colors: { primary: '#B71C1C', secondary: '#FF5252', accent: '#1A1A1A', background: '#FFF5F5' },
    features: ['1-Day Free Trial Pass', 'Membership Fee Comparison', 'Morning / Evening Batch Hours', 'Trainer Certifications'],
    sampleData: {
      brandName: 'IronForge Fitness Club',
      established: '2017',
      headline: 'Unleash Your Strength with World-Class Equipment',
      subheadline: '5,000 sq ft facility, certified strength coaches, dedicated cardio deck, and clean steam rooms.',
      timing: '5:30 AM – 10:30 PM (Sunday 7 AM – 2 PM)',
      sampleItems: [
        { name: 'Quarterly Full Access Plan', price: '₹4,500', type: 'plan', desc: 'Includes cardio, strength training, steam, and locker.' },
        { name: 'Personal Training (12 Sessions)', price: '₹6,000', type: 'service', desc: 'Custom workout programming and bi-weekly nutrition check.' }
      ]
    }
  },
  {
    id: 'salon',
    name: 'Salon & Beauty Parlour',
    slug: 'salon',
    sector: 'health',
    icon: '💇',
    tagline: 'Bridal packages, service menu & WhatsApp booking',
    description: 'Clean pricing for haircuts, facials, keratine treatments, bridal packages, and stylist appointment scheduling.',
    colors: { primary: '#D4839F', secondary: '#C5A355', accent: '#F8E8EE', background: '#FFF8FA' },
    features: ['Service Rate Card', 'Bridal Portfolio Gallery', 'Stylist Booking by Hour', 'Hygiene & Product Guarantee'],
    sampleData: {
      brandName: 'Aura Hair & Skin Lounge',
      established: '2016',
      headline: 'Effortless Elegance, Tailored Styling',
      subheadline: 'Using premium L\'Oréal Professional, Olaplex, and organic skin solutions in a relaxing ambiance.',
      timing: '10:00 AM – 8:30 PM',
      sampleItems: [
        { name: 'Signature Hair Spa & Cut', price: '₹1,199', type: 'hair', desc: 'Deep nourishing mask, scalp massage, and expert haircut.' },
        { name: 'Pre-Bridal Glow Package', price: '₹4,999', type: 'bridal', desc: 'Full body waxing, gold facial, manicure, and pedicure.' }
      ]
    }
  },

  // Education & Coaching
  {
    id: 'coaching',
    name: 'Coaching Centre & Academy',
    slug: 'coaching',
    sector: 'education',
    icon: '📚',
    tagline: 'Course syllabus, batch timings & scholarship demo class',
    description: 'Outlines faculty profiles, past topper outcomes, batch calendars for JEE/NEET/Boards, and demo class registration.',
    colors: { primary: '#283593', secondary: '#FF8F00', accent: '#E8EAF6', background: '#F5F7FF' },
    features: ['Free Demo Class Registration', 'Batch Schedule & Vacancy Count', 'Faculty Credentials', 'Previous Year Outcomes'],
    sampleData: {
      brandName: 'Apex Science & Math Academy',
      established: '2011',
      headline: 'Targeted Preparation for JEE, NEET & Board Excellence',
      subheadline: 'Small batch sizes of 25 students with individual doubt-clearing sessions and weekly test series.',
      timing: 'Batches 7:00 AM – 8:30 PM',
      sampleItems: [
        { name: 'Class 11 & 12 Science Foundation', price: '₹35,000 / year', type: 'course', desc: 'Comprehensive Physics, Chemistry, and Mathematics coverage.' },
        { name: 'Weekend NEET Repeater Batch', price: '₹22,000 / 6 mos', type: 'course', desc: 'Intensive problem-solving sessions and test series.' }
      ]
    }
  },
  {
    id: 'driving-school',
    name: 'Driving School & Licensing',
    slug: 'driving-school',
    sector: 'education',
    icon: '🚙',
    tagline: 'Beginner driving lessons & RTO license assistance',
    description: 'Course duration (15/21 days), dual-control car fleet, lady instructor availability, and RTO paperwork assistance.',
    colors: { primary: '#1565C0', secondary: '#4CAF50', accent: '#E3F2FD', background: '#F0F7FF' },
    features: ['15-Day Beginner Course', 'RTO Driving License Guidance', 'Dual Control Fleet', 'Flexible Morning / Evening Slots'],
    sampleData: {
      brandName: 'National Motor Driving Academy',
      established: '2005',
      headline: 'Learn Driving with Confidence and Complete Safety',
      subheadline: 'Govt-authorized driving instructors, modern simulator practice, and doorstep pick-and-drop.',
      timing: '6:00 AM – 7:00 PM',
      sampleItems: [
        { name: 'Complete 21-Day Practical Course', price: '₹4,200', type: 'car', desc: 'Daily 30-minute behind-the-wheel instruction on hatchback/sedan.' },
        { name: 'Permanent Driving License Package', price: '₹2,100', type: 'rto', desc: 'Complete RTO file preparation, test slot booking, and support.' }
      ]
    }
  },

  // Retail & Commerce
  {
    id: 'boutique',
    name: 'Boutique & Designer Studio',
    slug: 'boutique',
    sector: 'retail',
    icon: '👗',
    tagline: 'Custom ethnic wear, bridal lehengas & bespoke stitching',
    description: 'Curated lookbooks, fabric selections, customized stitching lead times, and measurement booking on WhatsApp.',
    colors: { primary: '#212121', secondary: '#C5A355', accent: '#FAFAFA', background: '#FCFBF7' },
    features: ['Curated Lookbook Gallery', 'Fabric Consultation Booking', 'Custom Stitching Lead Times', 'WhatsApp Size Submission'],
    sampleData: {
      brandName: 'Rivaaz Designer Studio',
      established: '2014',
      headline: 'Exquisite Indian Couture & Tailored Silhouettes',
      subheadline: 'Handcrafted zardozi, banarasi silk weaves, and contemporary festive drape sarees.',
      timing: '11:00 AM – 8:00 PM',
      sampleItems: [
        { name: 'Custom Banarasi Silk Saree', price: 'From ₹6,500', type: 'couture', desc: 'Handwoven pure katan silk with zari borders.' },
        { name: 'Bespoke Bridal Lehenga', price: 'From ₹18,000', type: 'couture', desc: 'Tailored to exact measurements with custom embroidery.' }
      ]
    }
  },
  {
    id: 'kirana',
    name: 'Kirana & Supermarket',
    slug: 'kirana',
    sector: 'retail',
    icon: '🛒',
    tagline: 'WhatsApp grocery list orders & local free delivery',
    description: 'Enables customers to text their handwritten grocery list or voice note on WhatsApp for same-day free doorstep delivery.',
    colors: { primary: '#2E7D32', secondary: '#FF8F00', accent: '#E8F5E9', background: '#F7FCF7' },
    features: ['Send Photo of Written List', 'Monthly Ration Packs', 'Cash on Delivery & UPI', 'Daily Staple Pricing'],
    sampleData: {
      brandName: 'Gupta General & Daily Needs',
      established: '1992',
      headline: 'Fresh Staples, Daily Groceries & Household Essentials',
      subheadline: 'Send your grocery list on WhatsApp and get it delivered packed in 60 minutes.',
      timing: '7:30 AM – 9:30 PM',
      sampleItems: [
        { name: 'Monthly Family Ration Basket (4 Pax)', price: '₹3,499', type: 'basket', desc: 'Atta, rice, 4 dals, oil, spices, tea, and cleaning essentials.' }
      ]
    }
  },
  {
    id: 'furniture',
    name: 'Furniture & Home Decor',
    slug: 'furniture',
    sector: 'retail',
    icon: '🪑',
    tagline: 'Solid wood furniture, modular kitchens & custom design',
    description: 'Catalog of dining sets, beds, modular wardrobes, teakwood customization, and free home measurement visits.',
    colors: { primary: '#4E342E', secondary: '#00897B', accent: '#EFEBE9', background: '#FAF7F5' },
    features: ['Solid Teak / Sheesham Catalog', 'Free Site Measurement Visit', 'Modular Kitchen 3D Estimate', '10-Year Wood Warranty'],
    sampleData: {
      brandName: 'Urban Craftsmen Furniture',
      established: '2001',
      headline: 'Handcrafted Solid Wood Living for Modern Homes',
      subheadline: 'Kiln-dried seasoned sheesham and teakwood with natural beeswax polish.',
      timing: '10:00 AM – 8:30 PM',
      sampleItems: [
        { name: '6-Seater Sheesham Dining Set', price: '₹28,500', type: 'dining', desc: 'Solid wood table with 6 cushioned chairs in walnut finish.' }
      ]
    }
  },
  {
    id: 'jewellery',
    name: 'Jewellery & Gold Showroom',
    slug: 'jewellery',
    sector: 'retail',
    icon: '💎',
    tagline: 'BIS Hallmark gold, certified diamonds & silver gifting',
    description: 'Daily gold rates live update, bridal collection showcase, monthly gold savings schemes, and private appointment booking.',
    colors: { primary: '#1A1A1A', secondary: '#C5A355', accent: '#FFF8E1', background: '#FCFAF5' },
    features: ['Daily Live Gold Rate Display', 'BIS Hallmark 916 Guarantee', 'Monthly Swarna Savings Scheme', 'Bridal Suite Appointment'],
    sampleData: {
      brandName: 'Alankrita Jewellers',
      established: '1981',
      headline: 'Purity, Trust and Timeless Craftsmanship',
      subheadline: '100% BIS Hallmarked 22K gold and IGI certified diamond ornaments.',
      timing: '11:00 AM – 8:00 PM (Closed Tuesday)',
      sampleItems: [
        { name: '22K Traditional Temple Choker', price: 'Daily Rate + Making', type: 'gold', desc: 'Handcrafted antique finish with certified gemstone accents.' }
      ]
    }
  },

  // Trades & Home Services
  {
    id: 'mobile-repair',
    name: 'Mobile & Electronics Repair',
    slug: 'mobile-repair',
    sector: 'services',
    icon: '📱',
    tagline: 'Same-day screen, battery & motherboard repair',
    description: 'Transparent repair rate card by smartphone brand, 90-day warranty on replaced parts, and pickup-drop option.',
    colors: { primary: '#0097A7', secondary: '#FF6D00', accent: '#E0F7FA', background: '#F2FAFB' },
    features: ['30-Minute Screen Replacement', 'Doorstep Pickup & Drop', '90-Day Parts Warranty', 'Original & OEM Options'],
    sampleData: {
      brandName: 'QuickFix Mobile Care',
      established: '2019',
      headline: 'Fast, Certified Smartphone & Tablet Repairs',
      subheadline: 'iPhone, Samsung, OnePlus, and Xiaomi screen, battery, and chip-level motherboard fixes.',
      timing: '10:00 AM – 9:00 PM',
      sampleItems: [
        { name: 'iPhone Battery Replacement (OEM)', price: 'From ₹1,499', type: 'repair', desc: 'Genuine high-capacity cell with 6-month replacement guarantee.' },
        { name: 'AMOLED Screen Repair (Same-Day)', price: 'From ₹2,200', type: 'repair', desc: 'Original grade touch display with oleophobic coating.' }
      ]
    }
  },
  {
    id: 'mechanic',
    name: 'Auto Garage & Car Service',
    slug: 'mechanic',
    sector: 'services',
    icon: '🔧',
    tagline: 'Periodic periodic servicing, AC repair & emergency breakdown',
    description: 'Fixed-rate service packages (Periodic, Standard, Comprehensive), cashless insurance claim assistance, and breakdown SOS button.',
    colors: { primary: '#1A237E', secondary: '#FF5722', accent: '#E8EAF6', background: '#F6F7FF' },
    features: ['Emergency Breakdown SOS WhatsApp', 'Transparent Service Checklists', 'Genuine Spare Parts Only', 'Free Car Wash with Service'],
    sampleData: {
      brandName: 'Speedline Auto Care Garage',
      established: '2009',
      headline: 'Precision Car Servicing, Diagnostics & Detailing',
      subheadline: 'Multi-brand garage with computer scanning, automatic tyre changers, and sealed lubricant dispensing.',
      timing: '8:30 AM – 7:30 PM (7 Days)',
      sampleItems: [
        { name: 'Standard Periodic Service (Petrol)', price: '₹2,999', type: 'service', desc: 'Engine oil change, oil filter, air filter, 40-point inspection, and wash.' },
        { name: 'Complete AC Gas & Condenser Clean', price: '₹1,499', type: 'ac', desc: 'Refrigerant top-up, leak check, and cabin disinfectant.' }
      ]
    }
  },
  {
    id: 'tailor',
    name: 'Master Tailor & Alterations',
    slug: 'tailor',
    sector: 'services',
    icon: '🧵',
    tagline: 'Custom suit tailoring, ethnic kurtas & urgent alterations',
    description: 'Fabric measurement guides, suit style options (single/double breasted), timeline trackers, and doorstep fitting appointments.',
    colors: { primary: '#1A237E', secondary: '#C5A355', accent: '#FFF8E1', background: '#FAF9F5' },
    features: ['3-Day Urgent Alteration Service', 'Doorstep Measurement Visit', 'Bespoke Suit & Blazer Crafting', 'Trial Fit Guarantee'],
    sampleData: {
      brandName: 'Masterji Custom Tailoring',
      established: '1979',
      headline: 'Hand-Tailored Suits, Sherwanis and Blazers',
      subheadline: 'Four decades of sartorial mastery. Perfect fall, canvas chest construction, and comfortable fit.',
      timing: '10:30 AM – 8:30 PM',
      sampleItems: [
        { name: 'Two-Piece Bespoke Business Suit', price: '₹4,500 (stitching)', type: 'suit', desc: 'Includes full canvas lining, 2 fittings, and custom monogramming.' }
      ]
    }
  },
  {
    id: 'plumber',
    name: 'Plumbing & Water Solutions',
    slug: 'plumber',
    sector: 'services',
    icon: '🚿',
    tagline: 'Prompt pipeline leaks, geyser installation & water motor fix',
    description: 'Direct call buttons, fixed visiting inspection charges, emergency leak response within 45 minutes, and water tank cleaning services.',
    colors: { primary: '#0D47A1', secondary: '#FF6D00', accent: '#E3F2FD', background: '#F0F6FF' },
    features: ['45-Minute Emergency Response', 'Fixed ₹150 Visit Charge', 'Tank Cleaning & Pipe Rerouting', 'WhatsApp Location Share'],
    sampleData: {
      brandName: 'RapidFlow Plumbing Services',
      established: '2016',
      headline: 'Certified, Reliable Plumbers at Your Doorstep',
      subheadline: 'Trained technicians equipped with modern leak detectors, pipe threading, and geyser tools.',
      timing: '7:00 AM – 10:00 PM (Emergency 24/7)',
      sampleItems: [
        { name: 'Standard Plumbing Visit & Inspection', price: '₹150', type: 'visit', desc: 'Waived if repair work exceeds ₹500.' },
        { name: 'Automatic Water Tank Cleaning', price: '₹800', type: 'clean', desc: 'Mechanized dewatering, sludge removal, and UV antibacterial treatment.' }
      ]
    }
  },
  {
    id: 'electrical',
    name: 'Electrical Store & Contractor',
    slug: 'electrical',
    sector: 'services',
    icon: '💡',
    tagline: 'Switches, wiring, LED lights & home inverter setups',
    description: 'Wholesale and retail electrical goods, home re-wiring quotes, MCB panel installation, and rooftop inverter backup planning.',
    colors: { primary: '#F57F17', secondary: '#1A237E', accent: '#FFFDE7', background: '#FFFEF5' },
    features: ['Branded Modular Switch Catalog', 'Free Wiring Load Estimation', 'Inverter Battery Buyback', 'Doorstep Electrician Booking'],
    sampleData: {
      brandName: 'Vidyut Electricals & Power',
      established: '1995',
      headline: 'Authorized Dealers for Havells, Polycab, and Luminous',
      subheadline: 'Wholesale prices for contractors and homeowners alike.',
      timing: '9:00 AM – 8:30 PM',
      sampleItems: [
        { name: 'Pure Sine Wave Inverter + 150Ah Battery', price: '₹16,500', type: 'power', desc: 'Includes free installation and old battery exchange discount.' }
      ]
    }
  },

  // Creative & Professional
  {
    id: 'photographer',
    name: 'Studio & Event Photography',
    slug: 'photographer',
    sector: 'creative',
    icon: '📷',
    tagline: 'Cinematic wedding films, portrait sessions & baby shoots',
    description: 'Portfolio galleries with client albums, drone coverage options, photobook samples, and instant date availability checker.',
    colors: { primary: '#212121', secondary: '#C5A355', accent: '#FAFAFA', background: '#F8F9FA' },
    features: ['High-Res Portfolio Albums', 'Date Availability Calendar Check', 'Drone 4K Teaser Samples', 'Custom Printed Album Previews'],
    sampleData: {
      brandName: 'Lumière Photo & Cinema Studio',
      established: '2015',
      headline: 'Capturing Raw Emotion and Grand Celebrations',
      subheadline: 'Over 300 weddings shot across North India with natural lighting and editorial aesthetics.',
      timing: 'Studio Open 10 AM – 7 PM',
      sampleItems: [
        { name: '2-Day Wedding Photography & Cinematic Film', price: '₹85,000', type: 'wedding', desc: 'Includes 2 traditional cameras, 2 candid shooters, 1 drone, and 40-page flush album.' }
      ]
    }
  },
  {
    id: 'printing',
    name: 'Printing Press & Signage',
    slug: 'printing',
    sector: 'creative',
    icon: '🖨️',
    tagline: 'Business cards, flex banners, vinyl standees & marketing',
    description: 'Upload print-ready PDF on WhatsApp, instant paper GSM options, sample wedding cards, and same-day express banner dispatch.',
    colors: { primary: '#4527A0', secondary: '#FF6D00', accent: '#EDE7F6', background: '#F9F7FF' },
    features: ['PDF Upload via WhatsApp', 'Paper Thickness & Texture Guide', 'Same-Day Banner Printing', 'Wedding Card Catalog'],
    sampleData: {
      brandName: 'Impress Print & Digital Media',
      established: '2007',
      headline: 'High-Precision Commercial Offset & Digital Printing',
      subheadline: 'Fast turnarounds on marketing collateral, corporate stationery, and outdoor branding.',
      timing: '9:30 AM – 8:30 PM',
      sampleItems: [
        { name: '1,000 Matte Laminated Business Cards', price: '₹600', type: 'print', desc: '350 GSM art card with thermal lamination on both sides.' }
      ]
    }
  },
  {
    id: 'nursery',
    name: 'Plant Nursery & Landscaping',
    slug: 'nursery',
    sector: 'creative',
    icon: '🌱',
    tagline: 'Indoor air-purifying plants, ceramic pots & balcony garden',
    description: 'Seasonal plant inventory, pot styling ideas, balcony garden consultation bookings, and organic potting soil delivery.',
    colors: { primary: '#2E7D32', secondary: '#795548', accent: '#E8F5E9', background: '#F7FCF7' },
    features: ['Balcony Greenery Packages', 'Care Instructions by Plant Type', 'Ceramic Pot Collection', 'Organic Fertilizers & Soil'],
    sampleData: {
      brandName: 'Prakriti Green Nursery',
      established: '2013',
      headline: 'Bring Nature Indoors with Fresh Living Foliage',
      subheadline: 'Acclimatized indoor plants, exotic succulents, and expert balcony makeover consultations.',
      timing: '8:00 AM – 7:30 PM',
      sampleItems: [
        { name: 'Air Purifying Indoor Plant Kit (4 Plants)', price: '₹1,299', type: 'plant', desc: 'Includes Snake Plant, ZZ, Areca Palm, and Peace Lily in self-watering pots.' }
      ]
    }
  }
];

export const WEBSITES_FAQ = [
  {
    question: 'What does the website itself cost?',
    answer: 'We quote after reviewing your brief, because a one-page site for a tailor and a booking portal for a medical clinic are not the same scope. The ₹500 booking fee is the only charge taken up front — it holds your dedicated build slot for 7 days and is 100% refundable if the first draft is not approved. When you proceed, the ₹500 is credited in full towards your final invoice.'
  },
  {
    question: 'What if I do not like what you build?',
    answer: 'Simply message us on WhatsApp within 7 days of receiving your first live draft link. If you decide not to proceed, we refund the full ₹500 to the original payment account within 5–7 working days without arguments or hidden deductions. Once you approve the draft and the full production deployment begins, standard project terms apply.'
  },
  {
    question: 'How long does the process take from start to launch?',
    answer: 'About 5 business days to your first draft link, counting from when your trade questionnaire and core photos are submitted. The fastest builds happen when photos, service pricing, and contact numbers are provided early on WhatsApp.'
  },
  {
    question: 'I am not technical at all. Can I still manage this?',
    answer: 'Yes, completely. Our entire intake and revision workflow runs over WhatsApp and plain-language questions. You send photos, menu items, or working hours on WhatsApp; our engineers assemble the layout, optimize assets, and send you live preview links to review on your phone.'
  },
  {
    question: 'Do I need to buy a domain name and hosting beforehand?',
    answer: 'No. If you already own a domain (e.g., from GoDaddy or Namecheap), we wire it up for free. If you do not own one yet, simply select "Please register one for me" in the intake brief and our team provisions it under your direct ownership.'
  },
  {
    question: 'Do I own the full code or am I locked into Open Idea?',
    answer: 'You own 100% of your source code and assets. Everything is built with standard React, Vite, and clean vanilla CSS. There is zero vendor lock-in, no proprietary site-builder container, and you can export, self-host, or transfer your site whenever you wish.'
  },
  {
    question: 'How does Websites differ from AI Studio (/studio)?',
    answer: 'AI Studio is our self-service developer workbench where engineers and innovators generate React apps from natural-language prompts, inspect code, and export source code directly. Websites is our turnkey engineering service: our human engineering leads take your business requirements, build a bespoke mobile-first site, wire WhatsApp & Google Maps, test across devices, and deliver it ready for customers in 5 days.'
  }
];

export const SERVICE_BENEFITS = [
  {
    icon: 'PhoneFirst',
    title: 'Engineered for the Phone First',
    description: 'Over 85% of your local customers browse on mobile with variable data. We build ultra-lightweight, clean interfaces tested across mid-range Android and iOS screens.'
  },
  {
    icon: 'WhatsAppDirect',
    title: 'One-Tap WhatsApp & Call Direct',
    description: 'Pre-filled WhatsApp inquiries and direct click-to-call buttons route customer leads directly to where you already respond — no forgotten contact forms.'
  },
  {
    icon: 'MapsHours',
    title: 'Google Maps & Working Hours',
    description: 'Your verified Google Maps pin, opening hours, weekly offs, and landmark descriptions configured so visitors navigate effortlessly to your physical address.'
  },
  {
    icon: 'RealPhotos',
    title: 'Your Real Photos, Professionally Prepared',
    description: 'Send photos directly over WhatsApp. We crop, compress, enhance contrast, and optimize them for instantaneous loading speeds without loss of quality.'
  },
  {
    icon: 'TransparentPricing',
    title: 'Transparent Menus & Rate Cards',
    description: 'Clearly laid out services and prices cut down repetitive "kitna hai?" phone inquiries, turning casual browsers into qualified ready-to-buy customers.'
  },
  {
    icon: 'ZeroLockin',
    title: 'Full Code Ownership & Zero Lock-in',
    description: 'Standard modern web stack (React, Vite, CSS tokens). You own your code repository, domain, and data completely, without recurring page-builder subscription hostage fees.'
  }
];
