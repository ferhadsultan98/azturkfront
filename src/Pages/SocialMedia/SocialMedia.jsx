import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

import "./SocialMedia.scss";

const SocialMedia = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSocialMedia = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`socialMediaContainer ${isOpen ? "active" : ""}`}
      onClick={toggleSocialMedia}
    >
      <span className="socialMediatext">
        <i>
          <IoShareSocialOutline size={30} />
        </i>
      </span>
      <div className="socialMediaWrapper">
        <a
          className="socialMedia1"
          href="https://www.facebook.com/people/Azturk-Pack/61577099849409/"
          target="_blank"
        >
          <i>
            <FaFacebookF size={30} />
          </i>
        </a>

        <a
          href="https://wa.me/994102505752?text=Salam! Təmizlik və qablaşdırma xidmətləri ilə bağlı vebsaytınız üzərindən sizə yazırıq. Ətraflı məlumat almaq istərdik!"
          target="_blank"
          className="socialMedia2"
        >
          <i>
            <FaWhatsapp size={30} />
          </i>
        </a>
        <a
          href="https://www.instagram.com/azturkpackage"
          target="_blank"
          className="socialMedia3"
        >
          <i>
            <FaInstagram size={30} />
          </i>
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;