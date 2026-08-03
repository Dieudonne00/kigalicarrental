"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

const NAV: NavItem[] = [
  { label: "Fleet", href: "/fleet" },
  {
    label: "Services",
    children: [
      { label: "Self-Drive Rwanda", href: "/self-drive-rwanda" },
      { label: "Airport Transfer Kigali", href: "/airport-transfer-kigali" },
      { label: "4x4 Car Hire Rwanda", href: "/4x4-car-hire-rwanda" },
      { label: "Luxury Car Hire Kigali", href: "/luxury-car-hire-kigali" },
      { label: "Long Term Car Hire", href: "/long-term-car-hire-kigali" },
      { label: "Corporate Car Hire", href: "/corporate-car-hire-kigali" },
      { label: "NGO Car Hire Kigali", href: "/ngo-car-hire-kigali" },
      { label: "Wedding Car Hire Kigali", href: "/wedding-car-hire-kigali" },
    ],
  },
  {
    label: "Tours & Destinations",
    children: [
      { label: "All Tours & Itineraries", href: "/tours" },
      { label: "Akagera Safari", href: "/akagera-game-drive" },
      { label: "Gorilla Trekking — Volcanoes NP", href: "/gorilla-trekking-car-hire" },
      { label: "Nyungwe Forest", href: "/nyungwe-forest-car-hire" },
      { label: "Lake Kivu", href: "/lake-kivu-car-hire" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Pricing", href: "/pricing" },
      { label: "Car Hire Kigali 2026 Guide", href: "/car-hire-kigali-2026" },
      { label: "Pay Online", href: "/pay" },
      { label: "Site Map", href: "/site-map" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      <style>{`
        .kch-header{position:fixed;top:0;left:0;right:0;z-index:999;background:#fff;border-bottom:1px solid #e8e8e8;transition:box-shadow .25s}
        .kch-header.kch-scrolled{box-shadow:0 2px 24px rgba(0,0,0,.07)}
        .kch-inner{max-width:1280px;margin:0 auto;padding:0 32px;height:70px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .kch-logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none}
        .kch-nav{display:none;align-items:center;gap:0;position:relative}
        @media(min-width:1024px){.kch-nav{display:flex}.kch-hamburger{display:none!important}.kch-cta{display:flex!important}}
        .kch-link{display:flex;align-items:center;gap:4px;padding:8px 11px;font-size:13.5px;font-weight:600;color:#111;text-decoration:none;border-radius:5px;letter-spacing:.01em;transition:color .15s,background .15s;white-space:nowrap;background:none;border:none;cursor:pointer;font-family:inherit}
        .kch-link:hover{color:#1e3a8a;background:#f2faf2}
        .kch-link.kch-open{color:#1e3a8a;background:#f2faf2}
        .kch-chevron{transition:transform .15s}
        .kch-link.kch-open .kch-chevron{transform:rotate(180deg)}
        .kch-dropdown{position:absolute;top:calc(100% + 8px);left:0;min-width:240px;background:#fff;border:1px solid #e8e8e8;border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,.12);padding:6px;z-index:1000}
        .kch-dropdown-item{display:block;padding:10px 14px;font-size:13.5px;font-weight:600;color:#333;text-decoration:none;border-radius:6px;transition:background .12s,color .12s;white-space:nowrap}
        .kch-dropdown-item:hover{background:#f2faf2;color:#1e3a8a}
        .kch-nav-item{position:relative}
        .kch-cta{display:none;align-items:center;gap:14px;flex-shrink:0}
        .kch-phone{font-size:13px;font-weight:700;color:#111;text-decoration:none;letter-spacing:.01em;transition:color .15s;white-space:nowrap}
        .kch-phone:hover{color:#1e3a8a}
        .kch-book{display:inline-flex;align-items:center;background:#1e3a8a;color:#fff;font-size:13.5px;font-weight:700;padding:10px 22px;border-radius:5px;text-decoration:none;letter-spacing:.025em;transition:background .15s,transform .1s;white-space:nowrap}
        .kch-book:hover{background:#172554;transform:translateY(-1px)}
        .kch-book:active{transform:translateY(0)}
        .kch-hamburger{display:flex;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;padding:8px;background:none;border:none;cursor:pointer;border-radius:5px;transition:background .15s}
        .kch-hamburger:hover{background:#f5f5f5}
        .kch-hamburger span{display:block;height:2px;background:#111;border-radius:2px;transition:transform .2s,opacity .2s,width .2s}
        .kch-hamburger span:nth-child(1){width:22px}
        .kch-hamburger span:nth-child(2){width:15px}
        .kch-hamburger span:nth-child(3){width:22px}
        .kch-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);width:22px}
        .kch-hamburger.open span:nth-child(2){opacity:0}
        .kch-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);width:22px}
        .kch-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:998;animation:kchovl .2s ease}
        @keyframes kchovl{from{opacity:0}to{opacity:1}}
        .kch-drawer{position:fixed;top:0;right:0;bottom:0;width:min(340px,88vw);background:#fff;z-index:999;display:flex;flex-direction:column;overflow-y:auto;animation:kchslide .22s ease}
        @keyframes kchslide{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .kch-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid #ebebeb;flex-shrink:0}
        .kch-drawer-close{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:#f4f4f4;border:none;border-radius:50%;cursor:pointer;transition:background .15s}
        .kch-drawer-close:hover{background:#e8e8e8}
        .kch-drawer-nav{flex:1;overflow-y:auto;padding:4px 0}
        .kch-mob-link{display:block;padding:14px 24px;font-size:14px;font-weight:600;color:#111;text-decoration:none;border-bottom:1px solid #f4f4f4;transition:background .12s,color .12s}
        .kch-mob-link:hover{background:#f2faf2;color:#1e3a8a}
        .kch-mob-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;padding:14px 24px;font-size:14px;font-weight:600;color:#111;background:none;border:none;border-bottom:1px solid #f4f4f4;cursor:pointer;font-family:inherit;text-align:left}
        .kch-mob-toggle:hover{background:#f2faf2;color:#1e3a8a}
        .kch-mob-chevron{transition:transform .15s;flex-shrink:0}
        .kch-mob-toggle.open .kch-mob-chevron{transform:rotate(180deg)}
        .kch-mob-submenu{background:#fafafa;border-bottom:1px solid #f4f4f4}
        .kch-mob-sublink{display:block;padding:12px 24px 12px 40px;font-size:13.5px;font-weight:500;color:#333;text-decoration:none;border-bottom:1px solid #f0f0f0}
        .kch-mob-sublink:last-child{border-bottom:none}
        .kch-mob-sublink:hover{background:#f2faf2;color:#1e3a8a}
        .kch-drawer-foot{padding:20px 24px;border-top:1px solid #ebebeb;flex-shrink:0;display:flex;flex-direction:column;gap:10px}
        .kch-drawer-book{display:block;text-align:center;background:#1e3a8a;color:#fff;font-size:14px;font-weight:700;padding:13px;border-radius:5px;text-decoration:none;letter-spacing:.025em;transition:background .15s}
        .kch-drawer-book:hover{background:#172554}
        .kch-drawer-call{display:block;text-align:center;border:1.5px solid #ddd;color:#111;font-size:13.5px;font-weight:600;padding:12px;border-radius:5px;text-decoration:none;transition:border-color .15s,color .15s}
        .kch-drawer-call:hover{border-color:#1e3a8a;color:#1e3a8a}
        .kch-spacer{height:70px}
      `}</style>

      <header className={`kch-header${scrolled ? " kch-scrolled" : ""}`} role="banner">
        <div className="kch-inner">

          <Link href="/" className="kch-logo" aria-label="Kigali Car Rental — Home">
            <Image
              src="/logo.svg"
              alt="Kigali Car Rental — Car Hire Rwanda"
              width={148}
              height={48}
              style={{ height: "42px", width: "auto" }}
              priority
            />
          </Link>

          <nav className="kch-nav" aria-label="Main navigation" ref={navRef}>
            <Link href="/" className="kch-link">Home</Link>
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="kch-nav-item">
                  <button
                    type="button"
                    className={`kch-link${openDesktopMenu === item.label ? " kch-open" : ""}`}
                    onClick={() => setOpenDesktopMenu(openDesktopMenu === item.label ? null : item.label)}
                    aria-expanded={openDesktopMenu === item.label}
                  >
                    {item.label}
                    <svg className="kch-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {openDesktopMenu === item.label && (
                    <div className="kch-dropdown" role="menu">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="kch-dropdown-item"
                          role="menuitem"
                          onClick={() => setOpenDesktopMenu(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href!} className="kch-link">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="kch-cta">
            <a href="tel:+250787619387" className="kch-phone" aria-label="Call Kigali Car Rental">
              +250 787 619 387
            </a>
            <Link href="/book-now" className="kch-book">
              Book Now
            </Link>
          </div>

          <button
            className={`kch-hamburger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="kch-mobile-drawer"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="kch-spacer" aria-hidden="true" />

      {mobileOpen && (
        <>
          <div
            className="kch-overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            id="kch-mobile-drawer"
            className="kch-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="kch-drawer-head">
              <Image
                src="/logo.svg"
                alt="Kigali Car Rental"
                width={120}
                height={38}
                style={{ height: "34px", width: "auto" }}
              />
              <button
                className="kch-drawer-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="kch-drawer-nav" aria-label="Mobile navigation">
              <Link href="/" className="kch-mob-link" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              {NAV.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      className={`kch-mob-toggle${openMobileMenu === item.label ? " open" : ""}`}
                      onClick={() => setOpenMobileMenu(openMobileMenu === item.label ? null : item.label)}
                      aria-expanded={openMobileMenu === item.label}
                    >
                      {item.label}
                      <svg className="kch-mob-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {openMobileMenu === item.label && (
                      <div className="kch-mob-submenu">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="kch-mob-sublink"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="kch-mob-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="kch-drawer-foot">
              <Link href="/book-now" className="kch-drawer-book" onClick={() => setMobileOpen(false)}>
                Book Now
              </Link>
              <a href="tel:+250787619387" className="kch-drawer-call" aria-label="Call Kigali Car Rental">
                Call +250 787 619 387
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
