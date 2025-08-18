import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslation } from "react-i18next";
import "./MenuSection.scss";
import { IoClose } from "react-icons/io5";

const MenuSection = ({
  onSectionChange,
  selectedSection: propSelectedSection,
}) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSection, setSelectedSection] = useState(
    propSelectedSection || "cleaning"
  );
  const [categories, setCategories] = useState([]);
  const [cleaningProducts, setCleaningProducts] = useState([]);
  const [packagingProducts, setPackagingProducts] = useState([]);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState({});
  const productsPerPage = 6;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const products =
    selectedSection === "cleaning" ? cleaningProducts : packagingProducts;

  useEffect(() => {
    setSelectedSection(propSelectedSection);
    setSelectedCategory("all");
  }, [propSelectedSection]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/packages/`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
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
              item.Type &&
              item.Desc &&
              item.Price &&
              item.image_url &&
              item.Visible
          )
          .map((item) => ({
            id: item.id,
            category: item.Type[langKey] || "Unknown",
            name: item.Name[langKey] || "Unnamed",
            description: item.Desc[langKey] || "",
            image: item.image_url,
            price: parseFloat(item.Price) || 0,
            features: [
              item.Spec1?.[langKey],
              item.Spec2?.[langKey],
              item.Spec3?.[langKey],
            ].filter(Boolean),
            mainCategory:
              item.MainCategory === "cleaning" ? "cleaning" : "packaging",
            typeAz: item.Type?.Az,
            typeTr: item.Type?.Tr,
            typeEn: item.Type?.En,
            descAz: item.Desc?.Az,
            descTr: item.Desc?.Tr,
            descEn: item.Desc?.En,
            spec1Az: item.Spec1?.Az,
            spec1Tr: item.Spec1?.Tr,
            spec1En: item.Spec1?.En,
            spec2Az: item.Spec2?.Az,
            spec2Tr: item.Spec2?.Tr,
            spec2En: item.Spec2?.En,
            spec3Az: item.Spec3?.Az,
            spec3Tr: item.Spec3?.Tr,
            spec3En: item.Spec3?.En,
            look: item.Look ? "Görünən" : "Görünməyən",
            visible: item.Visible ? "Görünən" : "Görünməyən",
          }));

        setCleaningProducts(
          mappedProducts.filter((p) => p.mainCategory === "cleaning")
        );
        setPackagingProducts(
          mappedProducts.filter((p) => p.mainCategory === "packaging")
        );

        const sectionProducts =
          selectedSection === "cleaning"
            ? mappedProducts.filter((p) => p.mainCategory === "cleaning")
            : mappedProducts.filter((p) => p.mainCategory === "packaging");
        const uniqueCategories = [
          ...new Set(sectionProducts.map((p) => p.category)),
        ].map((type) => ({
          id: type.toLowerCase().replace(/\s+/g, "-"),
          name: type,
        }));

        setCategories([
          { id: "all", name: t("menu.allCategories") || "Bütün Kateqoriyalar" },
          ...uniqueCategories,
        ]);

        const initialVisible = uniqueCategories.reduce(
          (acc, category) => ({
            ...acc,
            [category.id]: productsPerPage,
          }),
          { all: productsPerPage }
        );
        setVisibleProducts(initialVisible);

        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError(error.message);
        setCategories([
          { id: "all", name: t("menu.allCategories") || "Bütün Kateqoriyalar" },
        ]);
        setCleaningProducts([]);
        setPackagingProducts([]);
      }
    };

    fetchProducts();
  }, [selectedSection, currentLang, t]);

  useEffect(() => {
    let results = products;
    if (selectedCategory !== "all") {
      results = results.filter(
        (product) =>
          product.category ===
          categories.find((c) => c.id === selectedCategory)?.name
      );
    }
    if (searchQuery) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, products, categories]);

  const handleShowMore = (categoryId) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || productsPerPage) + productsPerPage,
    }));
  };

  const renderProductsByCategory = () => {
    const visibleCount = visibleProducts[selectedCategory] || productsPerPage;
    const allCategoryProducts = filteredProducts.slice(0, visibleCount);

    if (selectedCategory !== "all") {
      const categoryProducts = allCategoryProducts.filter(
        (product) =>
          product.category ===
          categories.find((c) => c.id === selectedCategory)?.name
      );
      return (
        <div className="categorySection">
          <h3 className="categoryTitle">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h3>
          <div className="productsGrid">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                openDetails={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
          {filteredProducts.filter(
            (p) =>
              p.category ===
              categories.find((c) => c.id === selectedCategory)?.name
          ).length > visibleCount && (
            <div className="showMoreWrapper">
              <button
                className="showMoreButton"
                onClick={() => handleShowMore(selectedCategory)}
              >
                {t("menu.showMore") || "Daha Çox Göstər"}
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="categorySection">
        <h3 className="categoryTitle">
          {t("menu.allCategories") || "Bütün Kateqoriyalar"}
        </h3>
        <div className="productsGrid">
          {allCategoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openDetails={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
        {filteredProducts.length > visibleCount && (
          <div className="showMoreWrapper">
            <button
              className="showMoreButton"
              onClick={() => handleShowMore("all")}
            >
              {t("menu.showMore") || "Daha Çox Göstər"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cleaningServiceContainer" id="products">
      <div className="sectionToggle">
        <button
          className={`sectionButton ${
            selectedSection === "cleaning" ? "active" : ""
          }`}
          onClick={() => {
            setSelectedSection("cleaning");
            setSelectedCategory("all");
            onSectionChange("cleaning");
          }}
        >
          {t("menu.cleaningTitle")}
        </button>
        <button
          className={`sectionButton ${
            selectedSection === "packaging" ? "active" : ""
          }`}
          onClick={() => {
            setSelectedSection("packaging");
            setSelectedCategory("all");
            onSectionChange("packaging");
          }}
        >
          {t("menu.packagingTitle")}
        </button>
      </div>

      <div className="headerSection">
        <h1 className="mainTitle">
          {selectedSection === "cleaning"
            ? t("menu.cleaningTitle")
            : t("menu.packagingTitle")}
        </h1>
        <p className="subTitle">
          {selectedSection === "cleaning"
            ? t("menu.cleaningSubtitle")
            : t("menu.packagingSubtitle")}
        </p>
        <div className="searchControlsWrapper">
          <div className="searchInputWrapper">
            <input
              type="text"
              className="searchInput"
              placeholder={t("menu.searchPlaceholder") || "Məhsul axtar..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="searchIcon"></span>
          </div>
          <div className="categorySliderContainer">
            <button
              className="sliderArrow sliderArrowLeft"
              onClick={() =>
                (document.getElementById("categorySlider").scrollLeft -= 200)
              }
            >
              <IoIosArrowBack />
            </button>
            <div className="categoryFilters" id="categorySlider">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`categoryButton ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button
              className="sliderArrow sliderArrowRight"
              onClick={() =>
                (document.getElementById("categorySlider").scrollLeft += 200)
              }
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>

      <div className="productsSection">
        {error ? (
          <div className="errorMessage">
            <h3>{t("menu.errorTitle") || "Xəta"}</h3>
            <p>
              {t("menu.errorDesc") ||
                "Məhsullar yüklənmədi. Yenidən cəhd edin."}
            </p>
          </div>
        ) : filteredProducts.length ? (
          renderProductsByCategory()
        ) : (
          <div className="noResults">
            <h3>{t("menu.noResultsTitle") || "Məhsul tapılmadı"}</h3>
            <p>
              {t("menu.noResultsDesc") ||
                "Axtarışı dəyişdirin və ya başqa kateqoriya seçin."}
            </p>
          </div>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="closeButton"
              onClick={() => setIsModalOpen(false)}
            >
              <i>
                <IoClose />
              </i>
            </button>
            <div className="modalHeader">
              <h2 className="modalTitle">{selectedProduct.name}</h2>
              <h3 className="modalCategory">{selectedProduct.category}</h3>
            </div>
            <div className="modalBody">
              <div className="modalImageWrapper">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="modalImage"
                />
              </div>
              <div className="modalInfo">
                <p className="modalDescription">{selectedProduct.description}</p>
                <div className="modalFeatures">
                  <h4>{t("menu.featuresTitle") || "Xüsusiyyətlər:"}</h4>
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {selectedProduct.look === "Görünən" && (
                  <div className="modalPrice">
                    <span className="priceLabel">
                      {t("menu.priceLabel") || "Qiymət:"}
                    </span>
                    <span className="priceValue">{selectedProduct.price} AZN</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSection;