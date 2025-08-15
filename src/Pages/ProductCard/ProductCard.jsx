import React from "react";
import { useTranslation } from "react-i18next";
import "./ProductCard.scss";

const ProductCard = ({ product, openDetails }) => {
  const { t } = useTranslation();
  return (
    <div className="productCard">
      <div className="productImageWrapper">
        <img src={product.image} alt={product.name} className="productImage" />
      </div>
      <div className="productInfo">
        <h3 className="productName">{product.name}</h3>
        {product.look === "Görünən" && (
          <div className="productMeta">
            <div className="productPrice">{product.price} AZN</div>
          </div>
        )}
        <p className="productDescription">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <button className="detailsButton" onClick={() => openDetails(product)}>
          {t("menu.detailsButton") || "Ətraflı Məlumat"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;