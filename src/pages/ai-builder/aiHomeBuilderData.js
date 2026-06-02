export const samplePrompt =
  'Build a modern 3BHK villa in Chennai with modular kitchen, pooja room, home office, 2 car parking, solar panels, garden, budget Rs.50 Lakhs'

export const tamilPrompt =
  'Chennai-la Rs.50 lakhs budget-ku modern 3BHK villa, modular kitchen, pooja room, office, solar panel, garden venum'

export const roomPlan = [
  { id: 'living', name: 'Living + Dining', size: '18 x 16 ft', area: 288, icon: 'chair', x: 8, y: 10, w: 34, h: 28, color: 'bg-sky-100 border-sky-500 text-sky-800' },
  { id: 'kitchen', name: 'Modular Kitchen', size: '12 x 11 ft', area: 132, icon: 'kitchen', x: 42, y: 10, w: 23, h: 20, color: 'bg-emerald-100 border-emerald-500 text-emerald-800' },
  { id: 'pooja', name: 'Pooja', size: '6 x 5 ft', area: 30, icon: 'temple_hindu', x: 65, y: 10, w: 12, h: 14, color: 'bg-amber-100 border-amber-500 text-amber-900' },
  { id: 'office', name: 'Home Office', size: '11 x 10 ft', area: 110, icon: 'desk', x: 42, y: 30, w: 22, h: 18, color: 'bg-violet-100 border-violet-500 text-violet-800' },
  { id: 'bed1', name: 'Master Bedroom', size: '15 x 14 ft', area: 210, icon: 'king_bed', x: 8, y: 38, w: 28, h: 26, color: 'bg-rose-100 border-rose-500 text-rose-800' },
  { id: 'bed2', name: 'Bedroom 2', size: '13 x 12 ft', area: 156, icon: 'bed', x: 36, y: 48, w: 24, h: 22, color: 'bg-orange-100 border-orange-500 text-orange-800' },
  { id: 'bed3', name: 'Bedroom 3', size: '12 x 12 ft', area: 144, icon: 'bed', x: 60, y: 48, w: 22, h: 22, color: 'bg-pink-100 border-pink-500 text-pink-800' },
  { id: 'bath1', name: 'Bath 1', size: '8 x 6 ft', area: 48, icon: 'bathtub', x: 64, y: 30, w: 13, h: 18, color: 'bg-cyan-100 border-cyan-500 text-cyan-800' },
  { id: 'bath2', name: 'Bath 2', size: '7 x 6 ft', area: 42, icon: 'shower', x: 77, y: 30, w: 11, h: 18, color: 'bg-blue-100 border-blue-500 text-blue-800' },
  { id: 'parking', name: '2 Car Parking', size: '22 x 18 ft', area: 396, icon: 'garage', x: 8, y: 70, w: 34, h: 20, color: 'bg-slate-100 border-slate-500 text-slate-800' },
  { id: 'garden', name: 'Garden', size: '24 x 12 ft', area: 288, icon: 'yard', x: 42, y: 72, w: 40, h: 18, color: 'bg-lime-100 border-lime-500 text-lime-800' },
]

export const builderBlocks = [
  { type: 'room', name: 'Bedroom', icon: 'bed' },
  { type: 'room', name: 'Hall', icon: 'chair' },
  { type: 'room', name: 'Kitchen', icon: 'kitchen' },
  { type: 'room', name: 'Bathroom', icon: 'bathtub' },
  { type: 'room', name: 'Office', icon: 'desk' },
  { type: 'furniture', name: 'Sofa', icon: 'weekend' },
  { type: 'furniture', name: 'Dining Table', icon: 'table_restaurant' },
  { type: 'appliance', name: 'Refrigerator', icon: 'kitchen' },
  { type: 'appliance', name: 'Washing Machine', icon: 'local_laundry_service' },
  { type: 'construction', name: 'Door', icon: 'door_front' },
  { type: 'construction', name: 'Window', icon: 'window' },
  { type: 'construction', name: 'Staircase', icon: 'stairs' },
]

export const interiorItems = [
  { room: 'Living Room', name: 'Sofa', icon: 'weekend' },
  { room: 'Living Room', name: 'TV Unit', icon: 'tv' },
  { room: 'Living Room', name: 'Coffee Table', icon: 'table_bar' },
  { room: 'Living Room', name: 'Carpet', icon: 'texture' },
  { room: 'Bedroom', name: 'Bed', icon: 'bed' },
  { room: 'Bedroom', name: 'Wardrobe', icon: 'dresser' },
  { room: 'Bedroom', name: 'Study Table', icon: 'desk' },
  { room: 'Kitchen', name: 'Refrigerator', icon: 'kitchen' },
  { room: 'Kitchen', name: 'Stove', icon: 'local_fire_department' },
  { room: 'Kitchen', name: 'Chimney', icon: 'air' },
  { room: 'Kitchen', name: 'Dishwasher', icon: 'countertops' },
  { room: 'Bathroom', name: 'Wash Basin', icon: 'wash' },
  { room: 'Bathroom', name: 'Shower', icon: 'shower' },
  { room: 'Bathroom', name: 'Toilet', icon: 'wc' },
]

export const materialPalettes = [
  { surface: 'Walls', name: 'White Paint', icon: 'format_paint', swatch: 'bg-white' },
  { surface: 'Walls', name: 'Texture Paint', icon: 'texture', swatch: 'bg-stone-300' },
  { surface: 'Walls', name: 'Stone Finish', icon: 'foundation', swatch: 'bg-slate-400' },
  { surface: 'Floor', name: 'Marble', icon: 'grid_view', swatch: 'bg-zinc-100' },
  { surface: 'Floor', name: 'Granite', icon: 'grid_view', swatch: 'bg-gray-700' },
  { surface: 'Floor', name: 'Tiles', icon: 'grid_on', swatch: 'bg-cyan-100' },
  { surface: 'Floor', name: 'Wooden Flooring', icon: 'forest', swatch: 'bg-amber-700' },
  { surface: 'Ceiling', name: 'POP', icon: 'view_day', swatch: 'bg-neutral-100' },
  { surface: 'Ceiling', name: 'Wooden Ceiling', icon: 'roofing', swatch: 'bg-orange-800' },
  { surface: 'Ceiling', name: 'Premium Lighting', icon: 'lightbulb', swatch: 'bg-yellow-300' },
]

export const exteriorItems = [
  { name: 'Compound Wall', icon: 'fence' },
  { name: 'Main Gate', icon: 'gate' },
  { name: 'Garden', icon: 'yard' },
  { name: 'Swimming Pool', icon: 'pool' },
  { name: 'Driveway', icon: 'conversion_path' },
  { name: 'Solar Panels', icon: 'solar_power' },
  { name: 'Terrace Garden', icon: 'psychiatry' },
  { name: 'Outdoor Lighting', icon: 'outdoor_garden' },
]

export const designVariations = [
  { name: 'Budget', cost: 4800000, area: '2,120 sq.ft', timeline: '8 months', efficiency: '82', materials: 'Vitrified tiles, standard CP fittings' },
  { name: 'Premium', cost: 5000000, area: '2,260 sq.ft', timeline: '9 months', efficiency: '91', materials: 'Granite, branded fixtures, solar 5kW' },
  { name: 'Luxury', cost: 6450000, area: '2,520 sq.ft', timeline: '11 months', efficiency: '94', materials: 'Marble, teak, home automation' },
  { name: 'Ultra Luxury', cost: 9200000, area: '3,050 sq.ft', timeline: '13 months', efficiency: '96', materials: 'Italian marble, smart glass, premium lighting, VR-ready model' },
]

export const costItems = [
  { name: 'Foundation Cost', value: 640000 },
  { name: 'Wall Cost', value: 790000 },
  { name: 'Roof Cost', value: 620000 },
  { name: 'Flooring Cost', value: 410000 },
  { name: 'Painting Cost', value: 230000 },
  { name: 'Electrical Cost', value: 360000 },
  { name: 'Plumbing Cost', value: 310000 },
  { name: 'Furniture Cost', value: 520000 },
  { name: 'Appliance Cost', value: 430000 },
  { name: 'Solar + Smart Home', value: 390000 },
  { name: 'Contingency', value: 300000 },
]

export const bomItems = [
  { item: 'TMT Steel Fe 500D', qty: '7.8', unit: 'ton', price: 73000, gst: '18%', supplier: 'Chennai Steel Mart' },
  { item: 'OPC 53 Cement', qty: '650', unit: 'bags', price: 410, gst: '28%', supplier: 'TN Cement Depot' },
  { item: 'M-Sand Grade I', qty: '52', unit: 'ton', price: 2800, gst: '5%', supplier: 'Kanchipuram Aggregates' },
  { item: 'River Sand', qty: '18', unit: 'ton', price: 3700, gst: '5%', supplier: 'Delta Sand Supply' },
  { item: 'AAC Blocks', qty: '4,800', unit: 'nos', price: 55, gst: '12%', supplier: 'South Blocks' },
  { item: 'Vitrified Tiles', qty: '2,200', unit: 'sq.ft', price: 86, gst: '18%', supplier: 'OMR Tile House' },
  { item: 'Interior Paint', qty: '420', unit: 'litres', price: 240, gst: '18%', supplier: 'Royapettah Paints' },
  { item: 'Electrical Materials', qty: '1', unit: 'lot', price: 210000, gst: '18%', supplier: 'Mount Road Electricals' },
  { item: 'Plumbing Materials', qty: '1', unit: 'lot', price: 185000, gst: '18%', supplier: 'Chennai Pipe Co.' },
]

export const timelineItems = [
  { phase: 'Foundation', weeks: 4, progress: 100 },
  { phase: 'Column Work', weeks: 3, progress: 82 },
  { phase: 'Brick Work', weeks: 6, progress: 48 },
  { phase: 'Roofing', weeks: 4, progress: 20 },
  { phase: 'Plastering', weeks: 5, progress: 0 },
  { phase: 'Flooring', weeks: 3, progress: 0 },
  { phase: 'Painting', weeks: 3, progress: 0 },
  { phase: 'Electrical', weeks: 4, progress: 12 },
  { phase: 'Plumbing', weeks: 4, progress: 16 },
  { phase: 'Final Handover', weeks: 2, progress: 0 },
]

export const complianceChecks = [
  { label: 'Vastu Compliance', status: 'Passed', icon: 'verified' },
  { label: 'Tamil Nadu Building Rules', status: 'Review', icon: 'rule' },
  { label: 'Parking Rules', status: 'Passed', icon: 'local_parking' },
  { label: 'Minimum Setback', status: 'Passed', icon: 'straighten' },
  { label: 'Water Tank Placement', status: 'Passed', icon: 'water_drop' },
  { label: 'Septic Tank Placement', status: 'Review', icon: 'science' },
  { label: 'Solar Readiness', status: 'Passed', icon: 'solar_power' },
  { label: 'Rainwater Harvesting', status: 'Passed', icon: 'rainy' },
]

export const energyStats = [
  { label: 'Monthly Electricity', value: '420 kWh', icon: 'bolt' },
  { label: 'Solar Savings', value: 'Rs.8,400/mo', icon: 'solar_power' },
  { label: 'Water Usage', value: '18 KL/mo', icon: 'water_drop' },
  { label: 'Rainwater Collection', value: '46,000 L/yr', icon: 'rainy' },
  { label: 'Carbon Footprint', value: '-2.8 tCO2/yr', icon: 'co2' },
  { label: 'Energy Score', value: '91/100', icon: 'speed' },
]

export const workforceItems = [
  { role: 'Masons', count: 8 },
  { role: 'Helpers', count: 12 },
  { role: 'Bar Benders', count: 4 },
  { role: 'Carpenters', count: 5 },
  { role: 'Electricians', count: 3 },
  { role: 'Plumbers', count: 3 },
  { role: 'Painters', count: 6 },
]

export const smartHomeItems = ['Smart lights', 'Smart locks', 'Security cameras', 'Motion sensors', 'IoT appliances', 'Predictive maintenance']

export const immersiveItems = [
  { name: 'VR House Walkthrough', icon: 'view_in_ar', status: 'Roadmap' },
  { name: 'AR Furniture Placement', icon: 'view_in_ar_new', status: 'Roadmap' },
  { name: 'Mobile Camera Room Preview', icon: 'photo_camera', status: 'Roadmap' },
  { name: 'AI Interior Themes', icon: 'palette', status: 'Ready' },
  { name: 'AI Exterior Themes', icon: 'landscape', status: 'Ready' },
]

export const marketplaceCategories = [
  { name: 'Materials', items: 'Cement, steel, sand, bricks', icon: 'inventory_2' },
  { name: 'Equipment', items: 'JCB, crane, tipper', icon: 'construction' },
  { name: 'Workforce', items: 'Mason, carpenter, electrician, plumber', icon: 'groups' },
]
