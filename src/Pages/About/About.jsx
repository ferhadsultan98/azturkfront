import React from "react";
import { motion } from "framer-motion";
import "./About.scss";
import { useTranslation } from "react-i18next";
import AboutLogo from '../../../public/assets/minilogo.png'

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-content">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="image-frame" data-aos="zoom-in">
              <img
                src={AboutLogo}
                alt="Logo"
                className="logo-image"
              />
              <div className="image-overlay" data-aos="fade" />
            </div>
            <div
              className="decorative-shape decorative-shape-1"
              data-aos="fade-up"
              data-aos-delay="400"
            />
            <div
              className="decorative-shape decorative-shape-2"
              data-aos="fade-up"
              data-aos-delay="500"
            />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h3 data-aos="fade-up" data-aos-delay="300">
              {t("about.mission_title")}
            </h3>
            <p data-aos="fade-up" data-aos-delay="400">
              {t("about.mission_description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;