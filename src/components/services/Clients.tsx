import React from 'react';

interface Client { name: string; logo: string; }
interface ClientsProps { items: Client[]; }

const Clients: React.FC<ClientsProps> = ({ items }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto" style={{ width: '90%' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {items.map((c) => (
            <img key={c.name} src={c.logo} alt={c.name} className="h-10 w-auto mx-auto opacity-80" />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Clients;
