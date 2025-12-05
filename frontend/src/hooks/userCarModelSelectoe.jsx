import { useState, useEffect } from "react";
import models from "car-models";

const useCarModels = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    const carModelsData = models.all(); // Fetch all car models data

    if (!carModelsData || carModelsData.length === 0) return;

    // Create a Set to store unique brands
    const brandsSet = new Set();
    const modelsArray = [];

    carModelsData.forEach((item) => {
      const [brand, ...modelParts] = item.split(" ");
      const model = modelParts.join(" ");

      brandsSet.add(brand);
      modelsArray.push({ brand, model });
    });

    // Update state with unique brands and all models
    setBrands(Array.from(brandsSet));
    setCarModels(modelsArray);
  }, []);

  // Function to handle brand selection and filter car models based on the selected brand
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  // Filter car models based on the selected brand
  const filteredCarModels = carModels.filter(
    (car) => car.brand === selectedBrand
  );

  return {
    brands,
    selectedBrand,
    carModels: filteredCarModels,
    handleBrandSelect,
  };
};

export default useCarModels;
