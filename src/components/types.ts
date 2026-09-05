// Global component types and interfaces

export interface HeaderProps {
  className?: string;
  /**
   * Where the banner's enrolment button books a seat. Set only on a programme
   * page; the layout works it out from the URL so the button is in the served
   * HTML rather than appearing a moment after hydration.
   */
  enrolHref?: string;
}

export interface FooterProps {
  className?: string;
}

export interface BannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
}
