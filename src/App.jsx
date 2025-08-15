import React, { useEffect, useState } from "react";
import "./App.scss";
import MainLayout from "./Components/Common/MainLayout";
import MenuSection from "./Pages/MenuSection/MenuSection";
import About from "./Pages/About/About";
import Map from "./Components/Map/Map";
import { I18nextProvider } from "react-i18next";
import i18n from "./Languages/i18n";
import DiscountSection from "./Pages/DiscountSection/DiscountSection";
import SocialMedia from "./Pages/SocialMedia/SocialMedia";
import Header from "./Pages/Home/Header";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  const [selectedSection, setSelectedSection] = useState("cleaning");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="app-container">
      <I18nextProvider i18n={i18n}>
        <MainLayout>
          <Header onSectionChange={handleSectionChange} />
          <About />
          <MenuSection
            onSectionChange={handleSectionChange}
            selectedSection={selectedSection}
          />
          <DiscountSection />
          <Map />
          <SocialMedia />
        </MainLayout>
      </I18nextProvider>
    </div>
  );
}

export default App;