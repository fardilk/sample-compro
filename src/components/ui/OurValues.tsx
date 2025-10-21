import React from 'react';

type ValueItem = {
  title: string;
  text: string;
  icon: string;
  bg: string;
  textColor: string;
};

interface OurValuesProps {
  id?: string;
  items?: ValueItem[];
}

const defaultItems: ValueItem[] = [
  { title: 'Hospitable', text: 'We welcome with empathy, respect, and timely help in every interaction.', icon: 'fa-solid fa-shield-alt', bg: 'bg-blue-50', textColor: 'text-blue-600' },
  { title: 'Excellence', text: 'We pursue outstanding quality through continuous improvement and rigor.', icon: 'fa-solid fa-star', bg: 'bg-yellow-50', textColor: 'text-yellow-600' },
  { title: 'Leading', text: 'We guide with vision, co-create with teams, and elevate shared outcomes.', icon: 'fa-solid fa-handshake', bg: 'bg-green-50', textColor: 'text-green-600' },
  { title: 'Integrity', text: 'We act with honesty, keep our promises, and own every decision.', icon: 'fa-solid fa-bullseye', bg: 'bg-red-50', textColor: 'text-red-600' },
  { title: 'Sincerity', text: 'We speak plainly, with good intent, and mean what we commit.', icon: 'fa-solid fa-bullseye', bg: 'bg-red-50', textColor: 'text-red-600' },
];

const OurValues: React.FC<OurValuesProps> = ({ id = 'values', items = defaultItems }) => {
  return (
    <section id={id} className="py-12 bg-orange-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((v, i) => (
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
  );
};

export default OurValues;
