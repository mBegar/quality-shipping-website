import type { ImageMetadata } from 'astro';
import manufacturing from '../assets/photos/ind-manufacturing.jpg';
import engineering from '../assets/photos/ind-engineering.jpg';
import automotive from '../assets/photos/ind-automotive.jpg';
import consumer from '../assets/photos/ind-consumer.jpg';
import electronics from '../assets/photos/ind-electronics.jpg';
import retail from '../assets/photos/ind-retail.jpg';

export interface Industry {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  detail: string;
  needs: string[];
  image: ImageMetadata;
  alt: string;
}

export const industries: Industry[] = [
  {
    slug: 'manufacturing',
    title: 'Manufacturing & Industrial Goods',
    icon: 'factory',
    summary:
      'Inbound raw materials and outbound finished goods coordinated to keep production lines and delivery commitments on schedule.',
    detail:
      'Manufacturers depend on predictable inbound supply and reliable outbound delivery. We coordinate FCL and LCL sea freight for materials and finished goods, and air freight when production schedules cannot wait.',
    needs: ['Raw material imports', 'Finished goods exports', 'Scheduled replenishment'],
    image: manufacturing,
    alt: 'Industrial process equipment and piping inside a manufacturing facility',
  },
  {
    slug: 'engineering',
    title: 'Engineering & Machinery',
    icon: 'cog',
    summary:
      'Machinery, equipment and spare parts moved with attention to dimensions, weight and handling requirements.',
    detail:
      'Engineering cargo often spans standard containers, out-of-gauge pieces and urgent spare parts. We plan each movement around the equipment itself, from containerised machinery to project cargo requiring special handling.',
    needs: ['Capital equipment', 'Out-of-gauge components', 'Urgent spare parts by air'],
    image: engineering,
    alt: 'Engineer welding a metal component in an industrial workshop',
  },
  {
    slug: 'automotive',
    title: 'Automotive & Components',
    icon: 'car',
    summary:
      'Component imports and exports coordinated to support assembly schedules and aftermarket supply.',
    detail:
      'Automotive supply chains run on timing. We coordinate regular sea freight for component volumes and air freight for line-stop risks, with milestone communication your planning teams can rely on.',
    needs: ['Component imports for assembly', 'Aftermarket parts export', 'Line-critical air shipments'],
    image: automotive,
    alt: 'Close-up of an automotive engine assembly and components',
  },
  {
    slug: 'consumer-goods',
    title: 'Consumer Goods',
    icon: 'box',
    summary:
      'Seasonal and recurring consumer product shipments consolidated and coordinated for cost-effective international movement.',
    detail:
      'Consumer goods businesses balance cost, seasonality and lead time. LCL consolidation suits smaller recurring orders, while FCL supports peak-season volumes — with documentation handled consistently across shipments.',
    needs: ['LCL consolidation', 'Peak-season FCL volumes', 'Consistent documentation'],
    image: consumer,
    alt: 'Neatly packed cardboard shipping boxes ready for dispatch',
  },
  {
    slug: 'electronics',
    title: 'Electronics',
    icon: 'cpu',
    summary:
      'High-value, time-sensitive electronic goods and components coordinated with care through air and sea routings.',
    detail:
      'Electronics shipments combine high value with short product cycles. We coordinate air freight for launch and replenishment shipments, and sea freight for planned volumes, with attention to documentation and handling.',
    needs: ['Air freight for launches', 'Component imports', 'High-value cargo handling'],
    image: electronics,
    alt: 'Detailed view of a printed circuit board with electronic components',
  },
  {
    slug: 'retail',
    title: 'Retail & General Merchandise',
    icon: 'shopping-bag',
    summary:
      'Mixed merchandise shipments for retailers and traders, coordinated from supplier to destination port or airport.',
    detail:
      'Retailers and general traders move a wide range of merchandise from multiple suppliers. We help consolidate, document and coordinate shipments so that goods arrive in step with your selling calendar.',
    needs: ['Multi-supplier consolidation', 'Import documentation', 'Calendar-driven arrivals'],
    image: retail,
    alt: 'Well-stocked retail store aisle with merchandise on shelves',
  },
];
