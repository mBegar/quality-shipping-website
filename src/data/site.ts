/**
 * Central site configuration.
 *
 * Everything company-specific lives here so it can be verified and updated in
 * one place. Values marked `PLACEHOLDER` have not been confirmed by the
 * company and can be filled in later (empty values are hidden by the UI).
 */

export const SITE_URL = 'https://www.qualityshipping.in';

/**
 * Enquiry delivery. Both forms post to FormSubmit's AJAX endpoint, which
 * relays the submission by email to `company.email`. No account is required,
 * but the very first submission triggers a one-time activation email to that
 * inbox — click "Activate" once and all later submissions are delivered.
 */
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@qualityshipping.in';

export const company = {
  name: 'Quality Shipping Services',
  legalName: 'Quality Shipping Services Pvt. Ltd.',
  shortName: 'Quality Shipping',
  tagline: 'Freight Forwarding & Logistics — India',
  description:
    'Quality Shipping Services is an India-based freight forwarding company providing ocean freight (FCL & LCL), air freight, import and export logistics coordination and project cargo solutions for businesses engaged in international trade.',

  // Verified contact details
  email: 'info@qualityshipping.in',
  address: {
    line1: 'No. 1206, 3rd Floor, 26th Main Road',
    line2: '9th Block, Jayanagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560041',
    country: 'India',
  },

  phone: '+91 99459 02055',
  // PLACEHOLDER — leave empty to hide. Format example: '+91 00000 00000'
  whatsapp: '',

  // `opens`/`closes` (24h) and `dayOfWeek` feed the structured data; omit them for closed days.
  businessHours: [
    {
      days: 'Monday – Friday',
      hours: '10:00 AM – 6:00 PM IST',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
    { days: 'Saturday', hours: '10:00 AM – 1:30 PM IST', dayOfWeek: ['Saturday'], opens: '10:00', closes: '13:30' },
    { days: 'Sunday & public holidays', hours: 'Closed' },
  ] as { days: string; hours: string; dayOfWeek?: string[]; opens?: string; closes?: string }[],

  // Only verified URLs should be added here. Empty entries are not rendered.
  social: {
    linkedin: 'https://in.linkedin.com/company/quality-shipping-services',
    facebook: '',
    instagram: '',
    x: '',
  },

  // Office location on Google Maps (place ID and coordinates from the
  // company's Google Business listing).
  map: {
    lat: 12.9188887,
    lng: 77.5937643,
    // Public link to the listing (opens the Google Maps place page).
    placeUrl: 'https://maps.google.com/?cid=17463623426549379130',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=12.9188887,77.5937643',
  },

  foundingYear: '2017',
  registrations: [{ label: 'CIN', value: 'U74999KA2017PTC101582' }] as { label: string; value: string }[],
};

/** Keyless Google Maps embed centred on the office. */
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  `Quality Shipping Services Pvt Ltd, 1206, 26th Main Road, 9th Block, Jayanagar, Bengaluru 560041`,
)}&ll=${company.map.lat},${company.map.lng}&z=16&output=embed`;

export const formattedAddress = [
  company.address.line1,
  company.address.line2,
  `${company.address.city} – ${company.address.postalCode}`,
  company.address.country,
];

/**
 * Normalise a pathname to its clean URL form. During a static build with
 * `build.format: 'file'`, Astro.url.pathname can be `/about.html` or
 * `/index.html`; links, canonicals and active states should use `/about`, `/`.
 */
export const cleanPath = (pathname: string) =>
  pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '') || '/';

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Global Network', href: '/global-network' },
  { label: 'Contact Us', href: '/contact' },
];

export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];
