import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { logo, menu, close } from "../../assets";
import { config } from "../../constants/config";
import cvPdf from "../../assets/reda.dev.pdf";
import navIcon1 from "../../assets/nav-icon1.svg";
import navIcon2 from "../../assets/nav-icon2.svg";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-5 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white ">
            {config.html.title}
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
    {navLinks.map((nav) => (
      <li
        key={nav.id}
        style={{ marginTop: '7px' }}
        className={`${
          active === nav.id ? "text-white" : "text-secondary"
        } cursor-pointer text-[18px] font-medium hover:text-white`}
      >
        <a href={`#${nav.id}`}>{nav.title}</a>
      </li>
    ))}

              <div className="social-icon">
                <a href='https://www.linkedin.com/in/reda-aboulouafa-993a11220/' target='_blank'><img src={navIcon1} alt="" /></a>
                <a href='https://github.com/redaabou' target='_blank' style={{ marginLeft: '15px' }}><img src={navIcon2} alt="" /></a>
              </div>
            
              <li>
      <button
        style={{
          fontWeight: '500',
          color: isHovered ? '#121212' : '#fff',
          border: '1px solid #fff',
          padding: '10px 34px',
          fontSize: '15px',
          position: 'relative',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'color 0.3s ease-in-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          window.open(cvPdf);
        }}
      >
        <span
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          Download CV
        </span>
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: isHovered ? '100%' : '0%',
            height: '100%',
            backgroundColor: '#fff',
            zIndex: -1,
            transition: 'width 0.3s ease-in-out',
          }}
        ></span>
      </button>
    </li>
            
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li onClick={() => {
          window.open(cvPdf);
        }}>Downlownd Cv</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
