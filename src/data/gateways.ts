/**
 * Indian trade gateways through which shipments are commonly routed.
 * These are public ports and facilities — not company offices.
 */

export interface Seaport {
  name: string;
  region: string;
  text: string;
}

export const seaports: Seaport[] = [
  {
    name: 'Nhava Sheva (JNPT)',
    region: 'Maharashtra — West Coast',
    text: 'India’s largest container port, serving the Mumbai region and a wide industrial hinterland in western and northern India.',
  },
  {
    name: 'Mundra',
    region: 'Gujarat — West Coast',
    text: 'A major deep-water container and multipurpose port with strong rail connectivity to northern India.',
  },
  {
    name: 'Pipavav',
    region: 'Gujarat — West Coast',
    text: 'A deep-water port on the Saurashtra coast with dedicated rail links to the north-western hinterland.',
  },
  {
    name: 'Hazira',
    region: 'Gujarat — West Coast',
    text: 'A multi-cargo port near Surat serving the industrial belt of south Gujarat and northern Maharashtra.',
  },
  {
    name: 'Chennai',
    region: 'Tamil Nadu — East Coast',
    text: 'A key gateway for southern India, with strong links to automotive, engineering and electronics manufacturing clusters.',
  },
  {
    name: 'Tuticorin',
    region: 'Tamil Nadu — South-East Coast',
    text: 'A container gateway for southern Tamil Nadu, serving textile, engineering and agricultural export clusters.',
  },
  {
    name: 'Visakhapatnam',
    region: 'Andhra Pradesh — East Coast',
    text: 'A deep-water port serving eastern and central India for containerised and bulk cargo.',
  },
  {
    name: 'Kolkata',
    region: 'West Bengal — East Coast',
    text: 'The gateway for eastern and north-eastern India, including the Haldia dock complex on the Hooghly.',
  },
  {
    name: 'Cochin',
    region: 'Kerala — South-West Coast',
    text: 'A container transhipment and gateway port for southern India on the Arabian Sea.',
  },
  {
    name: 'Mangalore',
    region: 'Karnataka — West Coast',
    text: 'A west-coast port serving Karnataka and neighbouring regions, including cargo from the Bengaluru hinterland.',
  },
];

/** International airports used for air cargo, with IATA codes. */
export const airports = [
  { name: 'Mumbai', code: 'BOM' },
  { name: 'Bengaluru', code: 'BLR' },
  { name: 'Hyderabad', code: 'HYD' },
  { name: 'Chennai', code: 'MAA' },
  { name: 'New Delhi', code: 'DEL' },
];

/** Inland Container Depots (ICDs) for inland customs clearance and rail-linked container movement. */
export const inlandDepots = ['Bengaluru', 'Jaipur', 'Delhi (TKD)', 'Hyderabad', 'Nashik', 'Ahmedabad', 'Pune'];

/** Short labels for compact lists. */
export const seaportNames = seaports.map((p) => (p.name === 'Nhava Sheva (JNPT)' ? 'Nhava Sheva / JNPT' : p.name));
