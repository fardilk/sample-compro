import type { VariantContent } from '../../../types';

const leadership: VariantContent = {
  hero: {
    eyebrow: 'Training • Excellence Plus Indonesia',
    title: 'Leadership Training Program',
    subtitle: 'A structured program to develop confident, people‑first leaders who communicate with impact and deliver measurable results.',
    imageSrc: '/img/excellence-plus-1.png',
  },
  features: {
    items: [
      { title: 'Lead with clarity', text: 'Set direction, align goals (OKR/KPI), and drive accountability.' },
      { title: 'Communicate with influence', text: 'Give/receive feedback, handle conflict, present with confidence.' },
      { title: 'Decide smarter', text: 'Structure problems, weigh risks, and make timely, ethical decisions.' },
      { title: 'Coach and develop others', text: 'Motivate, delegate, and run effective 1:1s.' },
      { title: 'Manage change', text: 'Guide teams through uncertainty and resistance.' },
      { title: 'Build high-trust culture', text: 'Psychological safety, inclusion, and team norms that last.' },
    ],
  },
  tabs: {
    title: 'Why This Matters',
    tabs: [
      { title: 'Performance', content: 'Strong leadership drives higher productivity, quality, and speed.' },
      { title: 'Retention', content: 'Great managers reduce turnover and grow internal successors.' },
      { title: 'Clarity', content: 'Clear priorities and metrics prevent rework and busy-without-impact.' },
      { title: 'Readiness', content: 'Prepare first-time and mid-level managers for larger scopes.' },
      { title: 'Customer Impact', content: 'Better collaboration → faster problem‑solving for customers.' },
    ],
  },
  iconLists: [
    {
      title: 'Focus Skills You Will Develop',
      items: [
        { title: 'Communication & storytelling', icon: 'fa-comments' },
        { title: 'Strategic thinking & prioritization', icon: 'fa-chess' },
        { title: 'Decision-making under uncertainty', icon: 'fa-scale-balanced' },
        { title: 'Coaching, delegation, and motivation', icon: 'fa-people-group' },
        { title: 'Conflict resolution & negotiation', icon: 'fa-handshake' },
        { title: 'Change management & alignment', icon: 'fa-diagram-project' },
        { title: 'Emotional intelligence', icon: 'fa-heart' },
        { title: 'Presentation & facilitation', icon: 'fa-person-chalkboard' },
      ],
      columns: 2,
    },
  ],
  medias: [
    {
      eyebrow: 'Program Description',
      title: 'Lead with clarity, communicate with impact, decide smarter',
      text: 'Participants learn to align teams around clear objectives, communicate with influence, and make sound decisions under pressure. Delivery formats include on‑site, virtual, and blended options.',
      imageSrc: '/img/excellence-plus-1.png',
      imageSide: 'left',
      stats: [
        { label: 'of graduates advance to leadership roles', value: '40%' },
        { label: 'successfully lead divisional growth', value: '80%' },
      ],
      shapeBehind: true,
      imageClip: 'angled',
    },
    {
      eyebrow: 'Facilitator',
      title: 'Lead Facilitator',
      text: '15+ years leading teams across growth environments. Executive‑coaching trained with certifications in DISC/MBTI/Strengths. Proven outcomes include higher engagement, lower attrition, and stronger succession pipelines. Delivery is experiential, feedback‑driven, and business‑grounded.',
      imageSrc: '/img/excellence-plus-1.png',
      imageSide: 'right',
      shapeBehind: true,
      imageClip: 'angled',
    },
  ],
  timeline: {
    title: 'Curriculum (Mock-Up)',
    items: [
      { period: 'Format Options', title: 'Intensive / Cohort / Blended', text: 'Intensive: 2 days (8 modules). Cohort: 4 weeks, 2×/week (live 2 hrs) + assignments. Blended: Self-paced videos + 3 live labs + capstone.' },
      { period: 'Week 1 – Lead Self', title: 'Mindset, Values, and Priorities', text: 'Leader role shift (IC → Manager), EQ and energy management, time/prioritization, OKR/KPI alignment.' },
      { period: 'Week 2 – Lead Others', title: 'Communication, Coaching, Conflict', text: 'SBI/DESC feedback frameworks, GROW coaching, delegation, difficult conversations.' },
      { period: 'Week 3 – Lead the Work', title: 'Decisions and Meetings', text: 'Decision-making (issue trees, 80/20, risk maps), effective meetings & presentations.' },
      { period: 'Week 4 – Lead Change', title: 'Change & Culture', text: 'ADKAR, stakeholder mapping, norms, psychological safety, inclusion, capstone simulation, personal leadership plan (30/60/90).'},
    ],
  },
  statsGrid: {
    title: 'Program Benefits',
    items: [
      { label: 'Skill Uplift', value: 'Measured' },
      { label: 'Engagement', value: '+10–20 pts' },
      { label: 'Attrition', value: 'Down' },
      { label: 'Readiness', value: 'Faster' },
    ],
  },
  accordion: {
    title: 'Measurement & Deliverables',
    items: [
      { title: 'Assessments', content: 'Pre/post self-assessment + 180° pulse (manager/peer).' },
      { title: 'Action Plan', content: 'OKR-linked commitments (30/60/90) and facilitator feedback.' },
      { title: 'Reporting', content: 'Attendance & engagement report; skills uplift summary.' },
      { title: 'Follow-up', content: 'Optional coaching (3×45-min) and on-the-job projects.' },
    ],
  },
  caseStudies: {
    items: [
      { title: 'Team Engagement Up', result: 'Engagement improved 15 pts within 3 months after coaching cadence and 1:1s redesign.', image: '/img/excellence-plus-1.png' },
      { title: 'Fewer Escalations', result: 'Clear priorities and decision forums reduced escalations by 30%.', image: '/img/excellence-plus-1.png' },
    ],
  },
  testimonialsCarousel: {
    items: [
      { name: 'Rina, Operations Manager', role: 'Manufacturing', text: 'The program was practical and rigorous. Our team now operates with clear priorities and stronger accountability.' },
      { name: 'Dimas, Sales Lead', role: 'Technology', text: 'Coaching tools and feedback frameworks made an immediate difference in 1:1s and pipeline reviews.' },
      { name: 'Ayu, HRBP', role: 'Financial Services', text: 'We saw measurable gains in engagement and a healthier promotion pipeline within one quarter.' },
    ],
  },
  faq: {
    items: [
      { q: 'Audience & Prerequisites', a: 'First-time managers, team leads, project owners; aspiring managers. No prerequisites—bring 1–2 live challenges to apply in class.' },
      { q: 'Class Information', a: 'Class size: 16–24. Language: English or Bahasa Indonesia. Materials: workbook, templates (1:1s, feedback, delegation, meeting agendas, decision matrix), slide deck.' },
      { q: 'Between Sessions', a: 'Micro-assignments (15–30 min), peer coaching circles, and manager check-ins. Optional assessments: DISC/Strengths; 180° pulse pre/post.' },
    ],
  },
  contactCta: { title: 'Level up your leaders', subtitle: 'Let’s design your leadership program.' },
};

export default leadership;
