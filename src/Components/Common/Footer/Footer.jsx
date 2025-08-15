import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { IoIosArrowUp } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import {
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
} from "react-icons/fa";
import footerLogo from "../../../../public/assets/azturk.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="container">
          <div className="footerMain">
            <div className="footerInfo">
              <img src={footerLogo} alt="footerLogo" className="footerLogo" />
              <p className="footerDescription">{t("footer.description")}</p>
              <div className="footerContactItems">
                <div className="contactItem">
                  <i>
                    <FaLocationDot />
                  </i>
                  <a
                    href="https://maps.app.goo.gl/VbtWzcAhzgURZyXB7"
                    target="_blank"
                  >
                    {t("footer.adress")}
                   
                  </a>
                </div>
                <div className="contactItem">
                  <i>
                    <FaPhoneAlt />
                  </i>
                  <a href="tel:+994102505752" target="_blank">
                    +994(10) 250 57 52
                  </a>
                </div>
                <div className="contactItem">
                  <i>
                    <FaEnvelope />
                  </i>
                  <a href="mailto:corp.sales@azturkpackage.az" target="_blank">
                    corp.sales@azturkpackage.az
                  </a>
                </div>
                <div className="contactItem">
                  <i>
                    <FaClock />
                  </i>
                  <span>09:00-18:00</span>
                </div>
              </div>
            </div>

            <div className="footerConnect">
              <h4>{t("footer.connect")}</h4>
              <div className="socialIcons">
                <a
                  href="https://www.instagram.com/azturkpackage"
                  aria-label="Instagram"
                  className="socialIcon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.instagram.com/azturkpackage"
                  aria-label="Facebook"
                  className="socialIcon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </div>

          <div className="footerDivider"></div>

          <div className="footerBottom">
            <p className="copyright">
              © {currentYear}
              <a
                href="https://pmsystems.az"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span> Created by PM Systems</span>.
              </a>
              All Rights Reserved 
            </p>
          </div>
        </div>
      </div>

      <div
        className={`scrollTop ${showScrollTop ? "visible pulse" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <IoIosArrowUp fontSize={30} />
      </div>
    </footer>
  );
};

export default Footer;
