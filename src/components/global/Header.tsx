import React from 'react';
import type { HeaderProps } from '../types';
import Button from './Button';
import { mainMenu } from '../../func/hoverMenu';
import type { HoverMenuItem } from '../../func/hoverMenu';
import FontAwesome from './FontAwesome';
import HoverMenu2 from './HoverMenu2';
import { Link } from 'react-router-dom';

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [openMenuIdx, setOpenMenuIdx] = React.useState<number | null>(null);
  const [activeSubIdx, setActiveSubIdx] = React.useState<number | null>(null);
  const [showConsultBanner, setShowConsultBanner] = React.useState(true);

  // Handler for menu click
  const handleMenuClick = (idx: number) => {
    if (openMenuIdx === idx) {
      setOpenMenuIdx(null);
      setActiveSubIdx(null);
    } else {
      setOpenMenuIdx(idx);
      setActiveSubIdx(0); // always show first submenu by default
    }
  };

  const buildServiceLink = (item: HoverMenuItem, parent?: HoverMenuItem): string => {
    // Build /services/:category/:id
    const category = parent ? parent.label : item.label; // top-level category or parent category
    const id = parent ? item.label : (item.children?.[0]?.label ?? item.label); // child service or fallback to category
    const catSlug = slugify(category);
    const idSlug = slugify(id);
    return `/services/${catSlug}/${idSlug}`;
  };

  const buildWhoWeAreLink = (item: HoverMenuItem): string => {
    const label = item.label.toLowerCase();
    const map: Record<string, string> = {
      'vision & mission': 'vision-mission',
      'our team': 'our-team',
      'history': 'history',
      'values': 'values',
    };
    const toId = map[label] ?? label.replace(/[^a-z0-9]+/g, '-');
    return `/about-us#${toId}`;
  };

  return (
    <>
      <FontAwesome />
      <header className={`bg-white shadow-lg sticky top-0 z-50 transition-shadow duration-200 ${className}`}
        onMouseEnter={e => e.currentTarget.classList.add('shadow-2xl')}
        onMouseLeave={e => e.currentTarget.classList.remove('shadow-2xl')}
      >
        <nav className="mx-auto" style={{ width: '90%' }}>
          <div className="grid grid-cols-[20%_auto_auto] items-center h-[6em] w-full">
            {/* Left: Logo */}
            <div className="flex items-center min-w-[10rem]">
              <Link to="/" aria-label="Go to homepage" className="inline-block">
                <img src="/img/logo-excellence-plus-indonesia.png" alt="Excellence Plus Indonesia" className="h-auto w-[10rem] cursor-pointer" />
              </Link>
            </div>
            {/* Middle: Nav Links (center column, left-aligned, wider) */}
            <div className="flex items-center justify-start">
              <div className="hidden md:flex w-full gap-4">
                <div className="flex gap-2 whitespace-nowrap w-full">
                  {mainMenu.map((item, idx) => (
                    <button
                      key={item.label}
                      className={`flex items-center px-4 py-2 text-gray-800 hover:text-blue-600 rounded-md text-sm font-medium focus:outline-none whitespace-nowrap cursor-pointer ${openMenuIdx === idx ? 'bg-gray-100' : ''}`}
                      onClick={() => handleMenuClick(idx)}
                    >
                      {item.label}
                      <span className="ml-2 transition-transform">
                        <i className={`fa ${openMenuIdx === idx ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: Button */}
            <div className="flex items-center justify-end">
              <div className="flex gap-3">
                <Button variant="filled" color="orange-main" className="hidden md:block cursor-pointer">
                  Reserve Program
                </Button>
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <button
                  type="button"
                  className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        {/* Stacked nav for Book consultation! */}
        {showConsultBanner && (
          <div className="relative w-full py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="mx-auto" style={{ width: '90%' }}>
              <div className="w-full flex justify-center items-center text-center bg-transparent">
                <span className="text-white mr-2">Have a specific request?</span>
                <a href="/services" className="text-white underline cursor-pointer px-3 py-1 rounded">
                  Book consultation!
                </a>
              </div>
              <button
                aria-label="Close banner"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white"
                onClick={() => setShowConsultBanner(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Collapsible Canvas */}
      {openMenuIdx !== null && (
        (
          ['Who We Are', 'Consultation Program', 'Resources'].includes(mainMenu[openMenuIdx]?.label)
            ? (
                // One-row canvas with different background color and not full height
                <div className="fixed left-0 top-[6rem] w-full bg-gray-50/90 backdrop-blur-sm z-50 shadow-lg">
                  <div className="mx-auto" style={{ width: '90%' }}>
                    <HoverMenu2
                      items={mainMenu[openMenuIdx].children!}
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4"
                      linkBuilder={(item) => (
                        mainMenu[openMenuIdx]?.label === 'Who We Are'
                          ? buildWhoWeAreLink(item)
                          : item.href ?? '#'
                      )}
                    />
                  </div>
                </div>
              )
            : (
                <div className="fixed left-0 top-16 w-full h-[calc(100vh-4rem)] bg-white z-50 shadow-lg flex">
                  {/* Submenu on left */}
                  <div className="w-1/4 h-full border-r border-gray-200 flex flex-col items-start p-8 bg-gray-50">
                    <div className="flex items-center mb-6">
                      <i className="fa fa-bars mr-3 text-xl" aria-hidden="true"></i>
                      <span className="font-bold text-lg">{mainMenu[openMenuIdx].label}</span>
                    </div>
                    {mainMenu[openMenuIdx].children?.map((sub, subIdx) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className={`flex items-center px-4 py-2 w-full text-gray-800 hover:text-blue-600 cursor-pointer rounded-md ${activeSubIdx === subIdx ? 'bg-orange-100 font-semibold' : ''}`}
                        onClick={() => setActiveSubIdx(subIdx)}
                      >
                        <i className="fa fa-chevron-right mr-2" aria-hidden="true"></i>
                        {sub.label}
                      </a>
                    ))}
                  </div>
                  {/* Canvas right side */}
                  <div className="flex-1 h-full">
                    {/* Show level 3 menu cards for any submenu with children */}
                    {openMenuIdx !== null && activeSubIdx !== null && mainMenu[openMenuIdx].children?.[activeSubIdx]?.children && (
                      <HoverMenu2 items={mainMenu[openMenuIdx].children[activeSubIdx].children!} linkBuilder={(item, parent) => buildServiceLink(item, parent)} />
                    )}
                    {/* Show cards for leaf menu items */}
                    {openMenuIdx !== null && activeSubIdx !== null &&
                      mainMenu[openMenuIdx].children?.[activeSubIdx] &&
                      !mainMenu[openMenuIdx].children?.[activeSubIdx]?.children && (
                        <HoverMenu2 items={[mainMenu[openMenuIdx].children![activeSubIdx]]} linkBuilder={(item, parent) => buildServiceLink(item, parent)} />
                    )}
                  </div>
                </div>
              )
        )
      )}
    </>
  );
};

export default Header;
