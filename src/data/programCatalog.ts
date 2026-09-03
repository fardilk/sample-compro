import { mainMenu } from '../utils/hoverMenu';
import { categorySlug, slugify } from '../utils/serviceLinks';

/**
 * The programme picker on /reserve-program and /book-consultation.
 *
 * Parents and children come from the navigation tree, the same source the
 * /services/* routes are generated from, so the picker can never offer a
 * programme that has no page. Only the "who is this for" line lives here: it is
 * the one thing the menu does not carry, and it is what turns a list of names
 * into something a visitor can choose from.
 */
export interface CatalogItem {
  slug: string;
  title: string;
  /** One line on what it is. */
  blurb: string;
  /** One line on who it fits, shown as a hint under the choice. */
  audience: string;
  /** Open batches, already formatted for display. Filled in at build time from
   *  the CMS, so the picker only ever offers dates that are still open. */
  batches?: string[];
}

export interface CatalogCategory {
  slug: string;
  label: string;
  items: CatalogItem[];
}

/** Keyed by "Category label|Item label" so a slug rule change cannot orphan a line. */
const audiences: Record<string, string> = {
  'Training|Leadership': 'Supervisor, manajer baru, dan calon pemimpin tim.',
  'Training|Sales': 'Tim sales, account executive, dan sales manager.',
  'Training|Motivation': 'Tim yang sedang turun performa atau baru melewati perubahan besar.',
  'Training|Service Excellence':
    'Frontliner, customer service, dan tim operasional yang bertemu pelanggan.',
  'Training|Entrepreneurship': 'Pemilik usaha rintisan dan tim yang membangun lini bisnis baru.',
  'Training|Public Speaking':
    'Siapa pun yang harus presentasi, memimpin rapat, atau tampil di depan publik.',
  'Training|Train The Trainer': 'Trainer internal dan ahli materi yang mulai mengajar.',
  'Training|Butler Training': 'Tim hospitality, private household, dan layanan tamu VIP.',

  'Consultancy|Hotel Management':
    'Pemilik dan manajemen hotel yang ingin membenahi operasional dan standar layanan.',
  'Consultancy|HR System':
    'Perusahaan yang menata sistem SDM dari nol atau merapikan yang sudah berjalan.',
  'Consultancy|Restaurant & Café':
    'Pemilik dan manajer restoran atau kafe yang ingin menaikkan konsistensi dan margin.',
  'Consultancy|Digital Enablement':
    'Organisasi yang mendigitalkan proses kerja dan perlu adopsinya benar-benar jalan.',
  'Consultancy|Technology Solutions':
    'Tim teknologi yang butuh arsitektur, integrasi, dan platform yang siap skala.',

  'Coaching|Executive Coaching': 'Direksi, kepala divisi, dan pemimpin senior.',
  'Coaching|Team Coaching': 'Tim inti yang sedang menghadapi target berat atau konflik internal.',

  'Executive Search & Recruitment|Specialist Recruitment':
    'Perusahaan yang mencari kandidat spesialis yang sulit ditemukan lewat jalur biasa.',
  'Executive Search & Recruitment|Senior Positions':
    'Perusahaan yang mengisi posisi kepala divisi ke atas.',

  'Employer of Record (EOR)|Global Expansion':
    'Perusahaan yang masuk pasar baru tanpa ingin mendirikan badan usaha lebih dulu.',
  'Employer of Record (EOR)|Entity Management':
    'Perusahaan yang sudah punya entitas dan ingin pengelolaannya diambil alih.',
};

const servicesRoot = mainMenu.find((m) => m.label === 'Our Services');

export const programCatalog: CatalogCategory[] = (servicesRoot?.children ?? [])
  .map((category) => ({
    slug: categorySlug(category.label),
    label: category.label,
    items: (category.children ?? []).map((item) => ({
      slug: slugify(item.label),
      title: item.label,
      blurb: item.description ?? '',
      audience: audiences[`${category.label}|${item.label}`] ?? '',
    })),
  }))
  .filter((category) => category.items.length > 0);

export default programCatalog;
