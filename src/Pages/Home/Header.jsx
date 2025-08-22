import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Header.scss";
import { useTranslation } from "react-i18next";

// English images
import D1_az from "../../image/Desktop/cleaning1.png";
import D2_az from "../../image/Desktop/packing1.png";

import M1_az from "../../image/Mobile/cleaning1.png";
import M2_az from "../../image/Mobile/packing1.png";


// Azerbaijani images
import D1_en from "../../image/Desktop/cleaning2.png";
import D2_en from "../../image/Desktop/packing2.png";

import M1_en from "../../image/Mobile/cleaning2.png";
import M2_en from "../../image/Mobile/packing2.png";


// Turkish images
import D1_tr from "../../image/Desktop/cleaning3.png";
import D2_tr from "../../image/Desktop/packing3.png";

import M1_tr from "../../image/Mobile/cleaning3.png";
import M2_tr from "../../image/Mobile/packing3.png";


const Header = () => {
  const { t, i18n } = useTranslation();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Define slides for each language
  const slidesByLanguage = {
    en: [
      { desktop: D1_en, mobile: M1_en },
      // { desktop: D5_en, mobile: M5_en },
      { desktop: D2_en, mobile: M2_en },
      // { desktop: D4_en, mobile: M4_en },
      // { desktop: D3_en, mobile: M3_en },
      // { desktop: D6_en, mobile: M6_en },
    ],
    az: [
      { desktop: D1_az, mobile: M1_az },
      // { desktop: D5_az, mobile: M5_az },
      { desktop: D2_az, mobile: M2_az },
      // { desktop: D4_az, mobile: M4_az },
      // { desktop: D3_az, mobile: M3_az },
      // { desktop: D6_az, mobile: M6_az },
    ],
    tr: [
      { desktop: D1_tr, mobile: M1_tr },
      // { desktop: D5_tr, mobile: M5_tr },
      { desktop: D2_tr, mobile: M2_tr },
      // { desktop: D4_tr, mobile: M4_tr },
      // { desktop: D3_tr, mobile: M3_tr },
      // { desktop: D6_tr, mobile: M6_tr },
    ],
  };

  // Get slides for current language, default to English if language not found
  const currentSlides = slidesByLanguage[i18n.language] || slidesByLanguage.en;

  return (
    <header className="slider-container">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {currentSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-image-wrapper">
              <img
                src={slide.desktop}
                alt={`Slide ${index + 1}`}
                className="slider-image desktop-image"
              />
              <img
                src={slide.mobile}
                alt={`Slide ${index + 1}`}
                className="slider-image mobile-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => scrollToSection("products")}
        className="scroll-button"
      >
        {t("header.products")}
      </button>
    </header>
  );
};

export default Header;