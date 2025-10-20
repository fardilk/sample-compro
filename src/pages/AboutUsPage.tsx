import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer, FontAwesome } from '../components/global';
import OurTeam from '../components/ui/OurTeam';
import { H1, H2, H3, P, Lead } from '../utils/typography';

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
  const [activeHistory, setActiveHistory] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

	return (
		<div className="about-page">
			<FontAwesome />
			<Header />

			{/* Hero with subtle parallax */}
			<section className="text-white pt-16 pb-14 bg-gradient-to-r from-slate-900 to-slate-700" style={{ backgroundAttachment: 'fixed' }}>
				<div className="mx-auto" style={{ width: '90%' }}>
					<p className="text-yellow-400 font-semibold tracking-wide mb-2 text-center">Excellence Plus Indonesia</p>
					<H1 className="text-center text-white">Who We Are</H1>
				</div>
			</section>

			{/* Letter from BOD - single column layout */}
			<section id="letter" className="py-12 bg-white">
				<div className="mx-auto" style={{ width: '90%' }}>
					<H2 className="mb-2">WELCOME TO EXCELLENCE PLUS INDONESIA</H2>
					<P className="text-lg md:text-xl mb-1">Innovative Solutions To Move Your Business Forward.</P>
					<p className="text-slate-500 mb-6">About Excellence Plus Indonesia (EPI) Training &amp; Consultancy</p>
					<div className="space-y-3 prose max-w-none text-slate-800">
						<P>Excellence Plus Indonesia adalah sebuah institusi yang membantu memberikan kesempatan kepada perusahaan-perusahaan dan individu-induvidu pembelajar untuk mendapatkan pembelajaran yang berkualitas. EPI yang didirikan oleh coach Edi Purnomo, SE, MM, CPHRM, CHA, bertujuan tidak hanya menghadirkan pembelajaran yang menyenangkan dan penuh makna untuk para pesertanya, akan tetapi juga membantu perusahaan menemukan talenta-talenta berkelas melalui program executive search/ head hunter. EPI juga berperan aktif dalam pengembangan sustainable tourism yang saat ini berfokus di area Indonesia Timur.</P>
						<P>Excellece Plus Indonesia menyediakan program Public Training, in-house training, baik offline maupun online, head hunter, serta coaching. EPI berkomitmen memberikan program terbaik disesuaikan dengan kebutuhan masing-masing perusahaan dan individu yang tentunya beragam, sehingga masing-masing perusahaan atau individu akan mendapatkan manfaat maksimal.</P>
					</div>
				</div>
			</section>

			{/* Meet the Founder - uses same image, zebra bg close to primary with subtle parallax */}
			<section id="founder" className="py-12 bg-orange-50" style={{ backgroundAttachment: 'fixed' }}>
				<div className="mx-auto grid md:grid-cols-2 gap-8 items-center" style={{ width: '90%' }}>
					<div className="order-2 md:order-1">
						<H3 className="mb-1">Meet The Founder</H3>
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
						<div className="flex items-center gap-3">
							<span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-blue-50"><i className="fa fa-eye text-blue-600" aria-hidden="true"></i></span>
							<H2 className="m-0">Vision</H2>
						</div>
						<div className="mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5">
							<div className="flex items-start gap-3">
								<i className="fa fa-quote-left text-blue-500 mt-1" aria-hidden="true"></i>
								<Lead className="text-slate-800">A leading, trusted, and preferred business partner in achieving organisational goals</Lead>
							</div>
						</div>
					</div>

					<div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
						<div className="flex items-center gap-3 mb-3">
							<span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-amber-50"><i className="fa fa-bullseye text-amber-600" aria-hidden="true"></i></span>
							<H2 className="m-0">Mission</H2>
						</div>
						<p className="text-slate-700 mb-4">Our mission is to exceed expectations in providing excellent service, unexpected quality and outstanding value, for our client partners and employees.</p>
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

			{/* Our Team - now a reusable, rigid 3-card component without hover/swiper */}
			<OurTeam />

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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{[
						{ title: 'Hospitable', text: 'We welcome with empathy, respect, and timely help in every interaction.', icon: 'fa-solid fa-shield-alt', bg: 'bg-blue-50', textColor: 'text-blue-600' },
						{ title: 'Excellence', text: 'We pursue outstanding quality through continuous improvement and rigor.', icon: 'fa-solid fa-star', bg: 'bg-yellow-50', textColor: 'text-yellow-600' },
						{ title: 'Leading', text: 'We guide with vision, co-create with teams, and elevate shared outcomes.', icon: 'fa-solid fa-handshake', bg: 'bg-green-50', textColor: 'text-green-600' },
						{ title: 'Integrity', text: 'We act with honesty, keep our promises, and own every decision.', icon: 'fa-solid fa-bullseye', bg: 'bg-red-50', textColor: 'text-red-600' },
						{ title: 'Sincerity', text: 'We speak plainly, with good intent, and mean what we commit.', icon: 'fa-solid fa-bullseye', bg: 'bg-red-50', textColor: 'text-red-600' },

						].map((v, i) => (
							<div key={v.title} className={`rounded-lg p-5 ${v.bg} ${i % 2 === 0 ? 'shadow-sm' : 'shadow-md'}`}>
								<div className="flex items-center gap-3 mb-3">
									<div className={`w-12 h-12 flex items-center justify-center rounded-md ${v.bg}`}>
										<i className={`${v.icon} ${v.textColor}`} aria-hidden="true"></i>
									</div>
									<div className="font-semibold text-lg">{v.title}</div>
								</div>
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
