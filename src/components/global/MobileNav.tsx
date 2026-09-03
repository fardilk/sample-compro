import React from 'react';
import { mainMenu } from '../../utils/hoverMenu';
import type { HoverMenuItem } from '../../utils/hoverMenu';
import { menuHref, isPlaceholder } from '../../utils/menuLinks';
import Icon from './Icon';

type Props = {
  open: boolean;
  onClose: () => void;
};

const WHATSAPP =
  'https://wa.me/6281292934488?text=Halo%20Excellence%20Plus%20Indonesia%2C%20saya%20tertarik%20dengan%20program%20training%20dan%20coaching.';

/** One row in the drawer: a link, or a disclosure button when it has children. */
const Row: React.FC<{
  label: string;
  description?: string;
  icon?: string;
  href?: string;
  expanded?: boolean;
  onToggle?: () => void;
  depth?: number;
  onNavigate?: () => void;
}> = ({ label, description, icon, href, expanded, onToggle, depth = 0, onNavigate }) => {
  const padding = depth === 0 ? 'px-5' : depth === 1 ? 'pl-9 pr-5' : 'pl-14 pr-5';
  const weight = depth === 0 ? 'font-semibold text-base' : 'font-medium text-[0.95rem]';

  if (onToggle) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between gap-3 py-3.5 text-left text-gray-900 ${padding} ${weight}`}
      >
        <span className="flex min-w-0 items-center gap-3">
          {icon && <Icon name={icon} className="w-4 text-center text-orange-main" />}
          <span className="truncate">{label}</span>
        </span>
        <Icon
          name="fa-chevron-down"
          size={12}
          className={`shrink-0 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={onNavigate}
      className={`block py-3 text-gray-700 active:bg-gray-100 ${padding} ${weight}`}
    >
      <span className="flex min-w-0 items-center gap-3">
        {icon && <Icon name={icon} className="w-4 text-center text-orange-main" />}
        <span className="min-w-0">
          <span className="block truncate">{label}</span>
          {description && (
            <span className="mt-0.5 block truncate text-xs font-normal text-gray-500">{description}</span>
          )}
        </span>
      </span>
    </a>
  );
};

/**
 * Slide-in navigation for small screens. The header's hamburger had no handler
 * at all and the desktop nav is `hidden md:flex`, so phones had no way to reach
 * any page on the site.
 */
const MobileNav: React.FC<Props> = ({ open, onClose }) => {
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);
  const [openSub, setOpenSub] = React.useState<string | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Escape closes, and the page behind must not scroll while the drawer is up.
  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  // Growing past the mobile breakpoint while the drawer is open would otherwise
  // leave it stuck over the desktop layout.
  React.useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) onClose();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open, onClose]);

  const toggleGroup = (label: string) => {
    setOpenGroup((cur) => (cur === label ? null : label));
    setOpenSub(null);
  };

  const renderLeaf = (
    group: string,
    item: HoverMenuItem,
    parent: HoverMenuItem | undefined,
    depth: number,
  ) => {
    const href = menuHref(group, item, parent);

    // Entries with no destination yet are shown as plain text rather than as
    // links that jump to the top of the page and look broken.
    if (isPlaceholder(href)) {
      return (
        <div
          key={item.label}
          className={`py-3 text-[0.95rem] text-gray-400 ${depth === 1 ? 'pl-9 pr-5' : 'pl-14 pr-5'}`}
        >
          {item.label}
          <span className="ml-2 text-xs">(segera)</span>
        </div>
      );
    }

    return (
      <Row
        key={item.label}
        label={item.label}
        description={item.description}
        icon={item.icon}
        href={href}
        depth={depth}
        onNavigate={onClose}
      />
    );
  };

  return (
    <div className={`md:hidden ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu utama"
        className={`fixed right-0 top-0 z-[70] flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-200 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <img
            src="/img/logo-excellence-plus-indonesia.png"
            alt="Excellence Plus Indonesia"
            className="h-9 w-auto"
            width={160}
            height={36}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Icon name="fa-xmark" size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain py-1">
          <a href="/" onClick={onClose} className="block px-5 py-3.5 text-base font-semibold text-gray-900">
            Beranda
          </a>

          {mainMenu.map((group) => {
            const groupOpen = openGroup === group.label;
            return (
              <div key={group.label} className="border-t border-gray-100">
                <Row label={group.label} expanded={groupOpen} onToggle={() => toggleGroup(group.label)} />
                {groupOpen && (
                  <div className="pb-2">
                    {(group.children ?? []).map((child) => {
                      const hasChildren = (child.children?.length ?? 0) > 0;
                      if (!hasChildren) return renderLeaf(group.label, child, undefined, 1);

                      const subOpen = openSub === child.label;
                      return (
                        <div key={child.label}>
                          <Row
                            label={child.label}
                            icon={child.icon}
                            depth={1}
                            expanded={subOpen}
                            onToggle={() => setOpenSub((cur) => (cur === child.label ? null : child.label))}
                          />
                          {subOpen && (
                            <div className="bg-gray-50 py-1">
                              {(child.children ?? []).map((leaf) => renderLeaf(group.label, leaf, child, 2))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-gray-200 p-4">
          <a
            href="/reserve-program"
            onClick={onClose}
            className="block rounded-lg bg-orange-main px-4 py-3 text-center font-semibold text-white"
          >
            Reserve Program
          </a>
          <a
            href="/book-consultation"
            onClick={onClose}
            className="block rounded-lg border border-orange-main px-4 py-3 text-center font-semibold text-orange-main"
          >
            Book Consultation
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800"
          >
            <Icon name="fa-comments" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
