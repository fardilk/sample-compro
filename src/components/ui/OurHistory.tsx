import React from 'react';

export interface HistoryBlock {
  year: string;
  title?: string;
  text: string;
}

interface OurHistoryProps {
  blocks: HistoryBlock[];
  imageSrc?: string;
  id?: string;
}

const OurHistory: React.FC<OurHistoryProps> = ({ blocks, imageSrc = '/img/excellence-plus-1.png', id = 'history' }) => {
  const [activeHistory, setActiveHistory] = React.useState(0);

  return (
    <section id={id} className="py-12 bg-white" style={{ backgroundAttachment: 'fixed' }}>
      <div className="mx-auto" style={{ width: '90%' }}>
        <h2 className="text-2xl font-bold text-center mb-8">Our History</h2>
        <div className="grid grid-cols-[12rem_1fr] gap-6 items-start">
          {/* Vertical year bar */}
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-200"></div>
                <div className="flex flex-col gap-6 relative py-2">
                  {blocks.map((h, idx) => (
                    <button
                      key={h.year}
                      onClick={() => setActiveHistory(idx)}
                      className="relative pl-12 text-left cursor-pointer"
                    >
                      <span
                        className={`absolute left-4 top-1.5 w-4 h-4 rounded-full ${
                          idx === activeHistory ? 'bg-orange-500' : 'bg-slate-300'
                        }`}
                      ></span>
                      <span
                        className={`font-semibold ${
                          idx === activeHistory ? 'text-orange-600' : 'text-slate-600'
                        }`}
                      >
                        {h.year}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active block with image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {blocks.map((h, idx) =>
              idx === activeHistory ? (
                <React.Fragment key={h.year}>
                  <div className={`rounded-lg p-6 bg-white ${idx % 2 === 0 ? 'shadow-sm' : 'shadow-md'}`}>
                    <div className="text-sm text-slate-500 mb-1">{h.year}</div>
                    <div className="font-semibold mb-2">{h.title ?? 'Milestone'}</div>
                    <p className="text-slate-700">{h.text}</p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md justify-self-center md:justify-self-start max-w-[600px] w-full">
                    <img
                      src={imageSrc}
                      alt="Our history milestone"
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                </React.Fragment>
              ) : null
            )}
            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer"
                onClick={() => setActiveHistory((p) => (p - 1 + blocks.length) % blocks.length)}
              >
                Prev
              </button>
              <button
                className="px-3 py-1 rounded-md border border-slate-300 cursor-pointer"
                onClick={() => setActiveHistory((p) => (p + 1) % blocks.length)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHistory;
