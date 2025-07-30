export interface HoverMenuItem {
  label: string;
  href?: string;
  children?: HoverMenuItem[];
  description?: string;
  icon?: string;
}

export const mainMenu: HoverMenuItem[] = [
  {
    label: 'Who We Are',
    children: [
      {
        label: 'Vision & Mission',
        description: 'Our vision and mission for excellence.',
        icon: 'fa-eye',
        href: '#vision',
      },
      {
        label: 'Our Team',
        description: 'Meet our dedicated team members.',
        icon: 'fa-users',
        href: '#team',
      },
      {
        label: 'History',
        description: 'Our journey and milestones.',
        icon: 'fa-history',
        href: '#history',
      },
      {
        label: 'Values',
        description: 'Core values that drive our company.',
        icon: 'fa-heart',
        href: '#values',
      },
    ],
  },
  {
    label: 'Our Services',
    children: [
      {
        label: 'Training',
        children: [
          {
            label: 'Leadership',
            description: 'Build high performing teams with half the work.',
            icon: 'fa-user-tie',
            href: '#leadership',
          },
          {
            label: 'Sales',
            description: 'Master the art of selling and boost retention.',
            icon: 'fa-chart-line',
            href: '#sales',
          },
          {
            label: 'Motivation',
            description: 'Techniques to boost personal and team motivation.',
            icon: 'fa-bolt',
            href: '#motivation',
          },
          {
            label: 'Service Excellence',
            description: 'Deliver outstanding service experiences.',
            icon: 'fa-star',
            href: '#service-excellence',
          },
          {
            label: 'Entrepreneurship',
            description: 'Kickstart your entrepreneurial journey.',
            icon: 'fa-lightbulb',
            href: '#entrepreneurship',
          },
          {
            label: 'Public Speaking',
            description: 'Become a confident and impactful speaker.',
            icon: 'fa-comments',
            href: '#public-speaking',
          },
          {
            label: 'Train The Trainer',
            description: 'Equip yourself with training skills.',
            icon: 'fa-chalkboard-teacher',
            href: '#train-the-trainer',
          },
          {
            label: 'Butler Training',
            description: 'Learn the art of butler service.',
            icon: 'fa-concierge-bell',
            href: '#butler-training',
          },
        ],
      },
      {
        label: 'Consultancy',
        description: 'Hotel Management, Setting Up HR System, Restaurant & Café Management. Get expert advice to move your business forward.',
        icon: 'fa-user-tie',
        href: '#consultancy',
        children: [
          {
            label: 'Hotel Management',
            description: 'Professional hotel management solutions.',
            icon: 'fa-hotel',
            href: '#hotel-management',
          },
          {
            label: 'HR System',
            description: 'Set up and optimize your HR system.',
            icon: 'fa-users-cog',
            href: '#hr-system',
          },
          {
            label: 'Restaurant & Café',
            description: 'Management for restaurants and cafés.',
            icon: 'fa-utensils',
            href: '#restaurant-cafe',
          },
        ],
      },
      {
        label: 'Coaching',
        description: 'Coaching sustains great organizations. Helps people get unstuck and move beyond barriers.',
        icon: 'fa-hands-helping',
        href: '#coaching',
        children: [
          {
            label: 'Executive Coaching',
            description: 'Coaching for leaders and executives.',
            icon: 'fa-user-tie',
            href: '#executive-coaching',
          },
          {
            label: 'Team Coaching',
            description: 'Build and sustain high-performing teams.',
            icon: 'fa-users',
            href: '#team-coaching',
          },
        ],
      },
      {
        label: 'Executive Search & Recruitment',
        description: 'Best fit for specialist/senior positions. Strong network and sourcing for your company’s needs.',
        icon: 'fa-search',
        href: '#executive-search',
        children: [
          {
            label: 'Specialist Recruitment',
            description: 'Find the best specialist talent.',
            icon: 'fa-user-check',
            href: '#specialist-recruitment',
          },
          {
            label: 'Senior Positions',
            description: 'Recruitment for senior roles.',
            icon: 'fa-user-tie',
            href: '#senior-positions',
          },
        ],
      },
      {
        label: 'Employer of Record (EOR)',
        description: 'Simplify global expansion with direct EOR services. Fast market entry, lower costs, no third-parties.',
        icon: 'fa-briefcase',
        href: '#eor',
        children: [
          {
            label: 'Global Expansion',
            description: 'Expand your business globally with ease.',
            icon: 'fa-globe',
            href: '#global-expansion',
          },
          {
            label: 'Entity Management',
            description: 'Direct management of business entities.',
            icon: 'fa-building',
            href: '#entity-management',
          },
        ],
      },
    ],
  },
  {
    label: 'Consultation Program',
    children: [
      {
        label: 'Schedule',
        description: 'View available consultation schedules.',
        icon: 'fa-calendar-alt',
        href: '#schedule',
      },
      {
        label: 'Reserve',
        description: 'Reserve your spot for a consultation.',
        icon: 'fa-bookmark',
        href: '#reserve',
      },
      {
        label: 'Contact Us',
        description: 'Get in touch for more information.',
        icon: 'fa-envelope',
        href: '#contact',
      },
    ],
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Blog',
        description: 'Read our latest articles and updates.',
        icon: 'fa-blog',
        href: '#blog',
      },
      {
        label: 'FAQ',
        description: 'Frequently asked questions.',
        icon: 'fa-question-circle',
        href: '#faq',
      },
      {
        label: 'Downloads',
        description: 'Download resources and materials.',
        icon: 'fa-download',
        href: '#downloads',
      },
      {
        label: 'Events',
        description: 'Upcoming events and webinars.',
        icon: 'fa-calendar',
        href: '#events',
      },
    ],
  },
];
