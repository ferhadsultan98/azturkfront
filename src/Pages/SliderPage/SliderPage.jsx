// SliderPage.jsx
import React, { useState, useEffect } from "react";
import "./SliderPage.scss";

function SliderPage({ background, direction = "right-to-left", selectedSection = "cleaning" }) {
  const [images, setImages] = useState([]);
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages/`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        if (!response.headers.get("content-type")?.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Expected an array");

        const filteredProducts = data
          .filter(
            (item) =>
              item.id &&
              item.image_url &&
              item.Visible &&
              item.MainCategory === selectedSection
          )
          .map((item) => item.image_url);

        const shuffledImages = filteredProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);

        setImages(shuffledImages.length ? shuffledImages : [
          "https://via.placeholder.com/600x600.png?text=No+Image"
        ]);
      } catch (error) {
        console.error("Error fetching images:", error.message);
        setImages(["https://via.placeholder.com/600x600.png?text=Error"]);
      }
    };

    fetchProducts();
  }, [selectedSection]);

  const doubledImages = [...images, ...images];

  return (
    <section className={`partner-section ${direction}`} style={{ background }}>
      <div className="carousel">
        <div className="carousel-track">
          {doubledImages.map((src, index) => (
            <div className="carousel-item" key={`image-${index}`}>
              <img src={src} alt={`Carousel image ${index % images.length + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SliderPage;