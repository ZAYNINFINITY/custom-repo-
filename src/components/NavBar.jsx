import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.link.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a
          href="#hero"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
        >
          Adrian JSM
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => {
              const sectionId = link.substring(1);
              return (
                <li key={name} className="group">
                  <a
                    href={link}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sectionId);
                    }}
                    className={activeSection === sectionId ? "active" : ""}
                  >
                    <span>{name}</span>
                    <span className="underline" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <a
          href="#contact"
          className="contact-btn group hidden md:block"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
        >
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <ul>
          {navLinks.map(({ link, name }) => {
            const sectionId = link.substring(1);
            return (
              <li key={name}>
                <a
                  href={link}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  className={activeSection === sectionId ? "active" : ""}
                >
                  {name}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className={activeSection === "contact" ? "active" : ""}
            >
              Contact me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
