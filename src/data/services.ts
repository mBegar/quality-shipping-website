import type { ImageMetadata } from 'astro';
import containerShip from '../assets/photos/container-ship.jpg';
import aircraftTarmac from '../assets/photos/aircraft-tarmac.jpg';
import warehousePallets from '../assets/photos/warehouse-pallets.jpg';
import craneContainers from '../assets/photos/crane-containers.jpg';
import heroPort from '../assets/photos/hero-port.jpg';
import aircraftSky from '../assets/photos/aircraft-sky.jpg';
import documentsDesk from '../assets/photos/documents-desk.jpg';
import truckHighway from '../assets/photos/truck-highway.jpg';

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  eyebrow: string;
  summary: string;
  description: string[];
  highlights: string[];
  capabilities: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  card: ImageMetadata;
  cardAlt: string;
  hero: ImageMetadata;
  heroAlt: string;
  detail: ImageMetadata;
  detailAlt: string;
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: 'ocean-freight',
    title: 'Ocean Freight Services',
    shortTitle: 'Ocean Freight',
    icon: 'ship',
    eyebrow: 'FCL & LCL Shipping',
    summary:
      'Full container and consolidated sea freight coordination for import and export shipments through major Indian and international ports.',
    description: [
      'Ocean freight remains the backbone of international trade, and for most Indian importers and exporters it is the most cost-effective way to move cargo across borders. Quality Shipping Services coordinates full container load (FCL) and less than container load (LCL) shipments, working with shipping lines and port agents to move your cargo from origin to destination.',
      'From booking and container positioning through to port handling and documentation, our team manages the moving parts of a sea shipment so that your business can focus on its customers and suppliers.',
    ],
    highlights: [
      'Full Container Load (FCL)',
      'Less than Container Load (LCL)',
      'Import and export shipments',
      'Port-to-port freight coordination',
    ],
    capabilities: [
      {
        title: 'Full Container Load (FCL)',
        text: 'Dedicated 20’, 40’ and 40’ high-cube container shipments for larger consignments where your cargo fills a container.',
      },
      {
        title: 'Less than Container Load (LCL)',
        text: 'Consolidated shipping for smaller volumes, allowing you to pay only for the space your cargo occupies.',
      },
      {
        title: 'Import & Export Coordination',
        text: 'Booking, shipping-line liaison and document coordination for inbound and outbound sea shipments.',
      },
      {
        title: 'Port-to-Port Coordination',
        text: 'Movement planning between origin and destination ports, including vessel schedule and transit-time guidance.',
      },
    ],
    benefits: [
      {
        title: 'Cost-effective for volume cargo',
        text: 'Sea freight offers the most economical rate per unit for large or heavy shipments that are not time-critical.',
      },
      {
        title: 'Flexible container options',
        text: 'FCL and LCL options allow shipment sizes to scale with your order volumes and seasonal demand.',
      },
      {
        title: 'Clear milestone communication',
        text: 'Timely updates at key stages such as booking confirmation, container loading, vessel departure and arrival.',
      },
    ],
    card: containerShip,
    cardAlt: 'Loaded container ship at sea carrying stacked shipping containers',
    hero: heroPort,
    heroAlt: 'Container ships berthed beneath gantry cranes at an international container terminal',
    detail: containerShip,
    detailAlt: 'Container vessel underway with multicoloured containers stacked on deck',
    seoTitle: 'Ocean Freight Services India — FCL & LCL',
    seoDescription:
      'FCL and LCL ocean freight forwarding from India — import and export coordination and port-to-port sea freight through major Indian gateways.',
  },
  {
    slug: 'air-freight',
    title: 'Air Freight Services',
    shortTitle: 'Air Freight',
    icon: 'plane',
    eyebrow: 'Time-Sensitive Cargo',
    summary:
      'Air cargo coordination for urgent, high-value and time-critical shipments between Indian international airports and destinations worldwide.',
    description: [
      'When transit time matters, air freight offers the speed and predictability that sea freight cannot. Quality Shipping Services coordinates air cargo for import and export shipments, working with airlines and cargo agents to move your consignments between Indian international airports and destinations worldwide.',
      'We help you choose a suitable routing and service level for your cargo, prepare the required documentation and keep you informed as your shipment moves from airport to airport.',
    ],
    highlights: [
      'Air cargo transportation',
      'Import and export coordination',
      'Time-sensitive cargo solutions',
      'Airport-to-airport freight coordination',
    ],
    capabilities: [
      {
        title: 'Air Cargo Transportation',
        text: 'Coordination of general air cargo on scheduled passenger and freighter services.',
      },
      {
        title: 'Import & Export Coordination',
        text: 'Booking, airline liaison and documentation support for inbound and outbound air shipments.',
      },
      {
        title: 'Time-Sensitive Solutions',
        text: 'Routing and service-level guidance for urgent consignments, samples, spare parts and launch shipments.',
      },
      {
        title: 'Airport-to-Airport Coordination',
        text: 'Movement planning between origin and destination airports, with transit-time and schedule guidance.',
      },
    ],
    benefits: [
      {
        title: 'Faster transit times',
        text: 'Reduce lead times for urgent orders, production inputs and high-value goods.',
      },
      {
        title: 'Reliable schedules',
        text: 'Frequent departures and defined cut-offs support predictable planning for your supply chain.',
      },
      {
        title: 'Suited to high-value cargo',
        text: 'Shorter handling and transit windows for sensitive or valuable consignments.',
      },
    ],
    card: aircraftTarmac,
    cardAlt: 'Aircraft on the apron at an international airport',
    hero: aircraftSky,
    heroAlt: 'Aircraft climbing through clouds after take-off',
    detail: aircraftTarmac,
    detailAlt: 'Aircraft parked at an international airport apron',
    seoTitle: 'Air Freight Services India — Air Cargo',
    seoDescription:
      'Air freight forwarding from India — import and export air cargo, time-sensitive shipments and airport-to-airport coordination via major Indian airports.',
  },
  {
    slug: 'import-export-logistics',
    title: 'Import & Export Logistics',
    shortTitle: 'Import & Export Logistics',
    icon: 'clipboard',
    eyebrow: 'Shipment Coordination',
    summary:
      'End-to-end coordination of your international shipments — documentation assistance, customs clearance coordination and clear milestone communication.',
    description: [
      'International shipments involve many parties: suppliers, carriers, port and airport operators, customs authorities and your own team. Quality Shipping Services acts as a single coordinating point for your import and export logistics, helping to align each step so that cargo moves smoothly.',
      'We assist with shipping documentation, coordinate customs clearance through licensed customs brokers and keep you informed at every milestone, so you always know where your shipment stands.',
    ],
    highlights: [
      'Shipment coordination',
      'Documentation assistance',
      'Customs clearance coordination',
      'Shipping milestone communication',
    ],
    capabilities: [
      {
        title: 'Shipment Coordination',
        text: 'A single point of contact who aligns carriers, agents and service partners across your shipment.',
      },
      {
        title: 'Documentation Assistance',
        text: 'Guidance on commercial invoices, packing lists, bills of lading, airway bills and related shipping documents.',
      },
      {
        title: 'Customs Clearance Coordination',
        text: 'Coordination with licensed customs brokers for import and export clearance formalities.',
      },
      {
        title: 'Milestone Communication',
        text: 'Proactive updates at booking, departure, arrival and clearance stages.',
      },
    ],
    benefits: [
      {
        title: 'Fewer avoidable delays',
        text: 'Well-prepared documentation and coordinated handovers reduce the risk of holds at ports and airports.',
      },
      {
        title: 'One point of contact',
        text: 'Spend less time chasing multiple parties and more time running your business.',
      },
      {
        title: 'Visibility you can plan around',
        text: 'Timely updates help your production, sales and finance teams plan with confidence.',
      },
    ],
    card: warehousePallets,
    cardAlt: 'Palletised cargo arranged inside a logistics warehouse',
    hero: warehousePallets,
    heroAlt: 'Wide view of a modern distribution warehouse with palletised goods',
    detail: documentsDesk,
    detailAlt: 'Shipping documents being reviewed at a desk alongside a laptop',
    seoTitle: 'Import & Export Logistics Services India',
    seoDescription:
      'Import and export logistics coordination in India — shipment planning, documentation assistance, customs clearance coordination and milestone updates.',
  },
  {
    slug: 'project-cargo',
    title: 'Project & Special Cargo',
    shortTitle: 'Project & Special Cargo',
    icon: 'crane',
    eyebrow: 'Oversized & Heavy Cargo',
    summary:
      'Tailored transportation planning for oversized, heavy and special-handling cargo that falls outside standard container shipping.',
    description: [
      'Some shipments do not fit neatly into a standard container: machinery, plant equipment, oversized components and cargo with special handling requirements. Quality Shipping Services coordinates project and special cargo movements with a planning-first approach.',
      'We review dimensions, weights and handling needs, evaluate suitable equipment and routings with our service partners, and build a transportation plan around the specific requirements of your cargo.',
    ],
    highlights: [
      'Oversized and heavy cargo coordination',
      'Special handling requirements',
      'Tailored transportation planning',
    ],
    capabilities: [
      {
        title: 'Oversized & Heavy Cargo',
        text: 'Coordination of out-of-gauge and heavy-lift cargo using open-top, flat-rack and break-bulk options where appropriate.',
      },
      {
        title: 'Special Handling',
        text: 'Planning for cargo with specific lifting, securing, protection or handling requirements.',
      },
      {
        title: 'Tailored Transportation Planning',
        text: 'Route, equipment and schedule planning developed around your cargo and project timeline.',
      },
    ],
    benefits: [
      {
        title: 'Planning reduces risk',
        text: 'Early review of dimensions, weights and handling needs helps avoid surprises at loading and discharge.',
      },
      {
        title: 'The right equipment for the job',
        text: 'Equipment and routing options evaluated against your cargo rather than forced into a standard solution.',
      },
      {
        title: 'Coordinated execution',
        text: 'One team coordinating the service partners involved in moving your project cargo.',
      },
    ],
    card: craneContainers,
    cardAlt: 'Port crane lifting containers above trucks at a terminal',
    hero: craneContainers,
    heroAlt: 'Gantry crane handling containers at a busy port terminal',
    detail: truckHighway,
    detailAlt: 'Heavy goods vehicle travelling along a highway',
    seoTitle: 'Project & Special Cargo Forwarding India',
    seoDescription:
      'Project and special cargo forwarding from India — oversized and heavy cargo, special handling requirements and tailored transportation planning.',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
