// src/components/Map.jsx
import React from 'react';
import './Map.scss';

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.778539038669!2d49.844890184600715!3d40.383294597818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da3b129a553%3A0xbbdcddb1fe0dcc2b!2sAzTurk%20Package!5e1!3m2!1sen!2saz!4v1752757442802!5m2!1sen!2saz"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Map"
      ></iframe>
    </div>
  );
};

export default Map;


