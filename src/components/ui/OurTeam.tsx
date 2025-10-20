import React from 'react';
import { H4, P } from '../../utils/typography';

type TeamCard = {
	img: string;
	name: string;
	role: string;
	text: string;
};

const MAX_CHARS = 260;

const defaultCards: TeamCard[] = [
	{
		img: '/img/our-team/team-3.png',
		name: 'ADH. Bea Erlina Tj, S.Psi, MM',
		role: 'Managing Partner',
		text:
			'Jose\'s core expertise includes Human Resources & Hotel Management. With over 10 years experi- ence in handling industrial relation. Jose was worked as Corporate Human Resources Man- ager,in largest hotel management in Indonesia. Jose was awarded professional qualifications of CPHRM (Certified Professional Human Resources Management), Certified Lawyer. He holds Bache- lor Degree from Sriwijaya University, and Master Degree from Pancasila University & Tridinanti University.',
	},
	{
		img: '/img/our-team/team-1.png',
		name: 'Jose Desman, SH, MM, MH, CPHRM',
		role: 'Managing Partner',
		text:
			'We believe in continuous growth through hands-on learning, coaching, and tailored consulting. From hospitality to manufacturing, our practitioners bring field-tested frameworks to help leaders and teams perform with clarity and confidence. We translate strategy into action—making excellence not just a goal, but a habit embedded into daily operations.',
	},
	{
		img: '/img/our-team/team-2.png',
		name: 'Faruq Anton Cahyono, S.Sos, MM',
		role: 'Managing Partner',
		text:
			'Faruq\'s core expertise includes Researcher on many survey, HRStrategic & Organization Development: Competency Mapping(Hard & Soft Competency), Engagement survey, Job Evaluation,Work Load Analysis, Recruitment, Training & Development, Perfor-mance Management, Talent Management, HR Personnel & Ad-ministration: HR Information System, Salary Structure. More Than11 years in Corporates focus on HR Strategic & People Devel-opment on Toyota Motor Manufacturing Indonesia, LG ElectronicsIndonesia, Schott Igar Glass Faruq was awarded professionalqualifications of Instructional System Design Training Certifica-tion-Korea, DISC Trainer International Certification – WILEY Inter-national, Leadership Certified Trainer by Schott – Schott GlassMalaysia. He holds an Bachelor Degree in Communication, andMaster Degree from Gajah Mada University.',
	},
];

const OurTeam: React.FC<{ cards?: TeamCard[] }> = ({ cards = defaultCards }) => {
	const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

	const toggle = (idx: number) => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));

	return (
		<section id="our-team" className="py-12 bg-orange-50">
			<div className="mx-auto" style={{ width: '90%' }}>
				<div className="mb-8">
					<h2 className="text-2xl font-bold">Our Team</h2>
					<p className="text-slate-600">Three snapshots of how we work and what we believe.</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.map((card, idx) => {
						const isLong = card.text.length > MAX_CHARS;
						const showAll = !!expanded[idx];
						const shownText = showAll || !isLong ? card.text : card.text.slice(0, MAX_CHARS) + '…';

						return (
							<div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-left h-full flex flex-col">
								{/* Image - no hover overlay */}
								<div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 flex-shrink-0">
									<img src={card.img} alt={`Team ${idx + 1}`} className="w-full h-full object-cover" />
								</div>

								{/* Name, role, and text container with truncation and See more/less */}
								<div className="text-slate-700 text-sm flex-1">
									<H4 className="text-lg font-semibold mb-1">{card.name}</H4>
									<P className="text-base md:text-sm text-orange-main font-medium mb-2">{card.role}</P>
									<P className="mb-4">{shownText}</P>
								</div>

								{/* Footer area for actions - keeps buttons aligned */}
								<div className="flex-shrink-0">
									{isLong && (
										<button
											type="button"
											onClick={() => toggle(idx)}
											className="text-blue-600 hover:text-blue-700 underline cursor-pointer"
											aria-expanded={showAll}
											aria-controls={`team-text-${idx}`}
										>
											{showAll ? 'See less' : 'See more'}
										</button>
									)}
									{/* Collapsible full text for accessibility (controls id) */}
									<div id={`team-text-${idx}`} className="sr-only">
										{card.text}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default OurTeam;

