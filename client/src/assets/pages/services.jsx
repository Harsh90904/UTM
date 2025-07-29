import React, { useState } from "react";
import Sidebar from "./sidebar";
import AddProduct from "./services/addProduct";
import TDSClauter from "./services/TDSClauter";
import Return from "./services/Return";
import RTO from "./services/RTO";
import HighRTOSKU from "./services/highrtosku";

const sectionComponents = {
  "Add Product": AddProduct,
  "TDS Calculator": TDSClauter,
  Return: Return,
  RTO: RTO,
  "High-RTO SKU": HighRTOSKU,
};

function Services() {
  const [activeSection, setActiveSection] = useState("Add Product");
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-8">
        {ActiveComponent ? <ActiveComponent /> : <div>Select a section</div>}
      </main>
    </div>
  );
}

export default Services;
