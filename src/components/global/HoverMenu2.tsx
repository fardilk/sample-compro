import React from 'react';
import { Link } from 'react-router-dom';
import type { HoverMenuItem } from '../../func/hoverMenu';

interface HoverMenu2Props {
  items: HoverMenuItem[];
  // Optional: allow parent to override container classes (grid, padding, etc.)
  className?: string;
  linkBuilder?: (item: HoverMenuItem, parent?: HoverMenuItem) => string;
}

const HoverMenu2: React.FC<HoverMenu2Props> = ({ items, className, linkBuilder }) => {
  const containerClasses = className ?? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8';
  return (
    <div className={containerClasses}>
      {items.map((item) => {
        const topTo = linkBuilder ? linkBuilder(item) : (item.href ?? '#');
        return (
          <React.Fragment key={item.label}>
            <Link
              to={topTo}
              className="relative flex items-start bg-white border border-gray-200 rounded-lg shadow-md px-6 py-5 hover:shadow-xl transition-shadow duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-md bg-gradient-to-r from-blue-100 to-blue-50 mr-5">
                <i className={`fa ${item.icon} text-2xl text-blue-600`} aria-hidden="true"></i>
              </div>
              <div className="flex-1 flex flex-col justify-start">
                <span className="font-bold text-base mb-1 truncate" style={{ maxWidth: '16em' }}>{item.label.slice(0, 30)}</span>
                <span className="text-gray-600 text-sm" style={{ maxWidth: '22em' }}>{item.description?.slice(0, 60)}</span>
              </div>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <i className="fa fa-chevron-right text-xl text-blue-600" aria-hidden="true"></i>
              </span>
            </Link>
            {/* Render children as cards if present */}
            {item.children && item.children.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {item.children.map((child) => {
                  const childTo = linkBuilder ? linkBuilder(child, item) : (child.href ?? '#');
                  return (
                    <Link
                      key={child.label}
                      to={childTo}
                      className="relative flex items-start bg-white border border-gray-100 rounded-lg shadow px-5 py-4 hover:shadow-lg transition-shadow duration-200 group cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-r from-green-100 to-green-50 mr-4">
                        <i className={`fa ${child.icon} text-xl text-green-600`} aria-hidden="true"></i>
                      </div>
                      <div className="flex-1 flex flex-col justify-start">
                        <span className="font-semibold text-sm mb-1 truncate" style={{ maxWidth: '12em' }}>{child.label.slice(0, 30)}</span>
                        <span className="text-gray-500 text-xs" style={{ maxWidth: '18em' }}>{child.description?.slice(0, 60)}</span>
                      </div>
                      <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <i className="fa fa-chevron-right text-lg text-green-600" aria-hidden="true"></i>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default HoverMenu2;
