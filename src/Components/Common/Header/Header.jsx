import { useState, useEffect } from "react";
import "./Header.scss";
import EcovitaLogo from "../../../../public/assets/azturk.png";
import { MdCleaningServices } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <a onClick={scrollToTop} className="logo">
          <img src={EcovitaLogo} alt="Ecovita_logo" />
        </a>
        <div className="header-right">
          <div className="language-selector">
            <button
              className={`language-option ${i18n.language === "az" ? "active" : ""} ${scrolled ? "scrolled" : ""}`}
              onClick={() => changeLanguage("az")}
            >
              AZ
            </button>
            <button
              className={`language-option ${i18n.language === "en" ? "active" : ""} ${scrolled ? "scrolled" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={`language-option ${i18n.language === "tr" ? "active" : ""} ${scrolled ? "scrolled" : ""}`}
              onClick={() => changeLanguage("tr")}
            >
              TR
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;  