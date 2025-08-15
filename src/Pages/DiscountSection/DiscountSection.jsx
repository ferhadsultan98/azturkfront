import React, { useState, useEffect } from "react";
import "./DiscountSection.scss";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

const DiscountSection = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [error, setError] = useState(null);
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/packages/`
,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        if (
          !response.headers.get("content-type")?.includes("application/json")
        ) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Expected an array");

        const langKey =
          currentLang === "tr" ? "Tr" : currentLang === "en" ? "En" : "Az";
        const mappedProducts = data
          .filter(
            (item) =>
              item.id &&
              item.Name &&
              item.Desc &&
              item.Price &&
              item.image_url &&
              item.Visible &&
              item.Sales
          )
          .map((item) => ({
            id: item.id,
            name: item.Name[langKey] || "Unnamed",
            description: item.Desc[langKey] || "",
            originalPrice: parseFloat(item.Price) || 0,
            discountedPrice: parseFloat(item.DiscountedPrice) || 0,
            discountPercentage: parseFloat(item.Discount) || 0,
            image: item.image_url,
            features: [
              item.Spec1?.[langKey],
              item.Spec2?.[langKey],
              item.Spec3?.[langKey],
            ].filter(Boolean),
            sales: item.Sales,
          }));

        setDiscountedProducts(mappedProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching discounted products:", error.message);
        setError(error.message);
        setDiscountedProducts([]);
      }
    };

    fetchDiscountedProducts();
  }, [currentLang]);

  const saleProducts = [...discountedProducts, ...discountedProducts];

  useEffect(() => {
    if (saleProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= saleProducts.length / 2 - 1) {
          setTimeout(() => {
            setCurrentSlide(0);
          }, 500);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [saleProducts.length]);

  if (error) {
    return (
      <div className="discountSection">
        <div className="errorMessage">
          <h3>{t("discount.errorTitle") || "Xəta"}</h3>
          <p>
            {t("discount.errorDesc") ||
              "Endirimli məhsullar yüklənmədi. Yenidən cəhd edin."}
          </p>
        </div>
      </div>
    );
  }

  if (discountedProducts.length < 5) {
    return null;
  }

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="discountSection">
      <div className="discountHeader">
        <div className="discountBadge">
          <span className="discountText">
            {t("discount.badge")}
          </span>
        </div>
        <h2 className="discountTitle">
          {t("discount.title")}
        
        </h2>
       
      </div>

      <div className="discountProductsSlider">
        <div
          className="discountProductsTrack"
          style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
        >
          {saleProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="discountProductCard" data-aos="zoom-in">
              <div className="discountProductImageWrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="discountProductImage"
                />
              </div>

              <div className="discountProductInfo">
                <h3 className="discountProductName">{product.name}</h3>

                <p className="discountProductDescription">
                  {product.description}
                </p>
                <span className="discountProductPrice">
                  {product.originalPrice}
                </span>

                <div className="discountProductActions">
                  <button
                    className="discountDetailsButton"
                    onClick={() => openModal(product)}
                  >
                    {t("menu.detailsButton") || "Ətraflı Məlumat"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="discountModalOverlay" onClick={closeModal}>
          <div
            className="discountModalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="discountCloseButton" onClick={closeModal}>
              <i>
                <IoClose />
              </i>
            </button>

            <div className="discountModalHeader">
              <h2 className="discountModalTitle">{selectedProduct.name}</h2>
            </div>

            <div className="discountModalBody">
              <div className="discountModalImageWrapper">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="discountModalInfo">
                <p className="discountModalDescription">
                  {selectedProduct.description}
                </p>

                <div className="discountModalFeatures">
                  <h4>{t("menu.featuresTitle")}</h4>
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="discountModalPrice">
                  <div className="discountModalSavings">
                    {selectedProduct.originalPrice}AZN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountSection;
