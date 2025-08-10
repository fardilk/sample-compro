import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer, FontAwesome } from '../components/global';

const team = [
	{
		name: 'ADH. Bea Erlina Tj, S.Psi, MM',
		role: 'Managing Partner',
		img: 'https://i.pravatar.cc/200?img=47',
		blurb: 'Leadership and people development advocate with deep industry insight.',
	},
	{
		name: 'Endra Prasetya',
		role: 'Digital Project Manager',
		img: 'https://i.pravatar.cc/200?img=12',
		blurb: 'Driving digital transformation and delivery excellence across projects.',
	},
	{
		name: 'Edi Purnomo, SE. MM. CPHRM, CHA',
		role: 'Founder & Managing Director',
		img: 'https://i.pravatar.cc/200?img=5',
		blurb: 'Championing service excellence and human capital growth for real impact.',
	},
	{
		name: 'Faruq Anton Cahyono, S.Sos, MM',
		role: 'Managing Partner',
		img: 'https://i.pravatar.cc/200?img=66',
		blurb: 'Strategic advisor focused on performance, culture, and operational wins.',
	},
	{
		name: 'Guest Advisor',
		role: 'Senior Advisor',
		img: 'https://i.pravatar.cc/200?img=15',
		blurb: 'Experienced advisor supporting clients across sectors and challenges.',
	},
];

const historyBlocks = [
	{
		year: '2018',
		text: 'Founded with a mission to elevate organizations through people and service excellence.',
	},
	{
		year: '2019',
		text: 'Launched signature training programs across leadership, sales, and service.',
	},
	{
		year: '2020',
		text: 'Expanded consulting practice into HR systems and hospitality management.',
	},
	{
		year: '2022',
		text: 'Introduced executive coaching and recruitment solutions for senior roles.',
	},
	{
		year: '2024',
		text: 'Scaled Employer of Record (EOR) offering to support rapid market entry.',
	},
];

const AboutUsPage: React.FC = () => {
	const [slideIdx, setSlideIdx] = React.useState(0);
	const [activeHistory, setActiveHistory] = React.useState(0);
	const location = useLocation();

	// Auto-advance team slider every 3 seconds
	React.useEffect(() => {
		const t = setInterval(() => {
			setSlideIdx((prev) => (prev + 1) % team.length);
		}, 3000);
		return () => clearInterval(t);
	}, []);

	// Scroll to section when hash present
	React.useEffect(() => {
		if (location.hash) {
			const id = location.hash.replace('#', '');
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}, [location.hash]);

	// Compute 4 visible team members starting at slideIdx
	const visibleTeam = Array.from({ length: 4 }).map((_, i) => team[(slideIdx + i) % team.length]);

	return (
		<div className="about-page">
			<FontAwesome />
			<Header />

			{/* Hero with subtle parallax */}
			<section className="text-white pt-16 pb-14 bg-gradient-to-r from-slate-900 to-slate-700" style={{ backgroundAttachment: 'fixed' }}>
				<div className="mx-auto" style={{ width: '90%' }}>
					<p className="text-yellow-400 font-semibold tracking-wide mb-2 text-center">Excellence Plus Indonesia</p>
					<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-center">Who We Are</h1>
				</div>
			</section>

			{/* Letter from BOD - single column layout */}
			<section id="letter" className="py-12 bg-white">
				<div className="mx-auto" style={{ width: '90%' }}>
					<h2 className="text-2xl md:text-3xl font-bold mb-2">WELCOME TO EXCELLENCE PLUS INDONESIA</h2>
					<p className="text-lg md:text-xl text-slate-700 mb-1">Innovative Solutions To Move Your Business Forward.</p>
					<p className="text-slate-500 mb-6">About Excellence Plus Indonesia (EPI) Training &amp; Consultancy</p>
					<div className="prose max-w-none text-slate-800">
						<p>Excellence Plus Indonesia adalah sebuah institusi yang membantu memberikan kesempatan kepada perusahaan-perusahaan dan individu-induvidu pembelajar untuk mendapatkan pembelajaran yang berkualitas. EPI yang didirikan oleh coach Edi Purnomo, SE, MM, CPHRM, CHA, bertujuan tidak hanya menghadirkan pembelajaran yang menyenangkan dan penuh makna untuk para pesertanya, akan tetapi juga membantu perusahaan menemukan talenta-talenta berkelas melalui program executive search/ head hunter. EPI juga berperan aktif dalam pengembangan sustainable tourism yang saat ini berfokus di area Indonesia Timur.</p>
						<p>Excellece Plus Indonesia menyediakan program Public Training, in-house training, baik offline maupun online, head hunter, serta coaching. EPI berkomitmen memberikan program terbaik disesuaikan dengan kebutuhan masing-masing perusahaan dan individu yang tentunya beragam, sehingga masing-masing perusahaan atau individu akan mendapatkan manfaat maksimal.</p>
					</div>
				</div>
			</section>

			{/* Meet the Founder - uses same image, zebra bg close to primary with subtle parallax */}
			<section id="founder" className="py-12 bg-orange-50" style={{ backgroundAttachment: 'fixed' }}>
				<div className="mx-auto grid md:grid-cols-2 gap-8 items-center" style={{ width: '90%' }}>
					<div className="order-2 md:order-1">
						<h3 className="text-2xl font-bold mb-1">Meet The Founder</h3>
						<p className="font-semibold">Edi Purnomo, SE. MM. CPHRM, CHA</p>
						<p className="text-slate-600 mb-4">Founder &amp; Managing Director</p>
						<div className="space-y-3 text-slate-800">
							<p>Edi's core expertise includes Human Resources, Sales &amp; Marketing, Food &amp; Beverage Management, Hotel Management &amp; Small Medium Enterprises., both local and abroad, with over 20 years in Hospitality, NGO, Retail, and Manufacturing sectors.</p>
							<p>Edi was worked as Corporate Human Resources Director, Corporate Training Manager, Director of Sales &amp; General Manager. Edi also did 2 years Management Training in Cornwall, England.</p>
							<p>Edi was awarded professional qualifications of CPHRM (Certified Professional Human Resources Management), CHA (Certified Hotel Administrator - American Hotel &amp; Lodging Educational Institute), Certified Coach (as International ICF Standard) and Certified Trainer By BNSP (Badan Nasional Sertifikasi Profesi). He holds Bachelor Degree from Bandar Lampung University, and Master Degree from Kalbis Institute of Kalbe Farma By Bina Nusantara. Now Edi is Founder &amp; Managing Director of Excellence Plus Indonesia.</p>
						</div>
					</div>
					<div className="order-1 md:order-2 flex justify-center md:justify-end">
						<img src="/img/mr-edi.png" alt="Edi Purnomo - Founder & Managing Director" className="w-full max-w-md rounded-xl shadow-xl object-cover" />
					</div>
				</div>
			</section>

			{/* Vision & Mission as single column with icons - set bg to white for zebra */}
			<section id="vision-mission" className="py-12 bg-white">
				<div className="mx-auto space-y-8" style={{ width: '90%' }}>
					<div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
						<div className="flex items-center gap-3 mb-2">
							<span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-blue-50"><i className="fa fa-eye text-blue-600" aria-hidden="true"></i></span>
							<h2 className="text-2xl font-bold">Vision</h2>
						</div>
						<p className="text-slate-700">To elevate people and organizations through practical excellence, shaping sustainable growth and meaningful impact.</p>
					</div>

					<div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
						<div className="flex items-center gap-3 mb-4">
							<span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-amber-50"><i className="fa fa-bullseye text-amber-600" aria-hidden="true"></i></span>
							<h2 className="text-2xl font-bold">Mission</h2>
						</div>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
							<div className="bg-gray-50 border border-slate-200 rounded-lg p-4">
								<h3 className="font-semibold mb-1">Empower</h3>
								<p className="text-slate-700 text-sm">Equip leaders and teams with skills to perform with confidence and clarity.</p>
							</div>
							<div className="bg-gray-50 border border-slate-200 rounded-lg p-4">
								<h3 className="font-semibold mb-1">Transform</h3>
								<p className="text-slate-700 text-sm">Drive measurable results through tailored programs and hands-on guidance.</p>
							</div>
							<div className="bg-gray-50 border border-slate-200 rounded-lg p-4">
								<h3 className="font-semibold mb-1">Sustain</h3>
								<p className="text-slate-700 text-sm">Build systems and mindsets that sustain excellence over the long term.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Team - set bg to brand-light zebra */}
			<section id="our-team" className="py-12 bg-orange-50">
				<div className="mx-auto" style={{ width: '90%' }}>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold">Our Team</h2>
						<div className="flex gap-2">
							<button className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setSlideIdx((p) => (p - 1 + team.length) % team.length)}>&larr;</button>
							<button className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setSlideIdx((p) => (p + 1) % team.length)}>&rarr;</button>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{visibleTeam.map((member) => (
							<div key={member.name} className="group bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center relative overflow-hidden cursor-pointer">
								<div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-slate-200">
									<img src={member.img} alt={member.name} className="w-full h-full object-cover" />
								</div>
								<div className="font-semibold mb-1">{member.name}</div>
								<div className="text-orange-main text-sm">{member.role}</div>
								{/* Hover overlay */}
								<div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center px-6 text-center">
									<p className="text-white text-sm mb-2">{member.blurb.slice(0, 70)}</p>
									<a href="/services" className="text-white underline">book consultation</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* History - switch zebra to white, keep parallax and shadows */}
			<section id="history" className="py-12 bg-white" style={{ backgroundAttachment: 'fixed' }}>
				<div className="mx-auto" style={{ width: '90%' }}>
					<h2 className="text-2xl font-bold text-center mb-8">Our History</h2>
					<div className="grid grid-cols-[12rem_1fr] gap-6 items-start">
						{/* Vertical year bar */}
						<div className="relative">
							<div className="sticky top-28">
								<div className="relative">
									<div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-200"></div>
									<div className="flex flex-col gap-6 relative py-2">
										{historyBlocks.map((h, idx) => (
											<button key={h.year} onClick={() => setActiveHistory(idx)} className="relative pl-12 text-left cursor-pointer">
												<span className={`absolute left-4 top-1.5 w-4 h-4 rounded-full ${idx === activeHistory ? 'bg-orange-500' : 'bg-slate-300'}`}></span>
												<span className={`font-semibold ${idx === activeHistory ? 'text-orange-600' : 'text-slate-600'}`}>{h.year}</span>
											</button>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Single active block - no border, solid fill with shadow */}
						<div className="grid grid-cols-1 gap-6">
							{historyBlocks.map((h, idx) => (
								idx === activeHistory ? (
									<div key={h.year} className={`rounded-lg p-6 bg-white ${idx % 2 === 0 ? 'shadow-sm' : 'shadow-md'}`}>
										<div className="text-sm text-slate-500 mb-1">{h.year}</div>
										<div className="font-semibold mb-2">Milestone</div>
										<p className="text-slate-700">{h.text}</p>
									</div>
								) : null
							))}
							<div className="flex justify-end gap-2">
								<button className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setActiveHistory((p) => (p - 1 + historyBlocks.length) % historyBlocks.length)}>Prev</button>
								<button className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer" onClick={() => setActiveHistory((p) => (p + 1) % historyBlocks.length)}>Next</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values - zebra to brand-light; cards are solid fill with shadow */}
			<section id="values" className="py-12 bg-orange-50">
				<div className="mx-auto" style={{ width: '90%' }}>
					<h2 className="text-2xl font-bold mb-6">Our Values</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ title: 'Integrity', text: 'We uphold honesty and accountability in every commitment and decision.' },
							{ title: 'Excellence', text: 'We pursue outstanding quality through continuous improvement and rigor.' },
							{ title: 'Collaboration', text: 'We co-create with clients and teams to amplify results and learning.' },
							{ title: 'Impact', text: 'We focus on tangible outcomes that move people and businesses forward.' },
						].map((v, i) => (
							<div key={v.title} className={`rounded-lg p-5 bg-white ${i % 2 === 0 ? 'shadow-sm' : 'shadow-md'}`}>
								<div className="font-semibold mb-1">{v.title}</div>
								<p className="text-slate-700 text-sm">{v.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default AboutUsPage;
